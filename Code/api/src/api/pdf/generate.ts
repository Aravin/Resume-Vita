import { Request, Response } from 'express';
import puppeteer from 'puppeteer-core';
import { s3Client } from "../../helpers/s3";
import { appConfig } from '../../config';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { MongoClient } from 'mongodb';

export async function generatePDF(req: Request, res: Response) {
    let browser: any = null;
    let page: any = null;

    try {
        let { html: pdfBody, user, color, template } = req.body;

        // basic validation
        if (!pdfBody || !user) {
            return res.status(400).json({ error: 'Missing required fields: html and user' });
        }

        console.log(`Starting PDF generation for user: ${user}`);

        // open the browser with optimized options for serverless environment
        browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu',
                '--disable-web-security',
                '--disable-features=VizDisplayCompositor',
                '--disable-extensions',
                '--disable-plugins',
                '--disable-images',
                '--disable-javascript',
                '--memory-pressure-off',
                '--max_old_space_size=4096'
            ],
            headless: true,
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
            timeout: 30000, // 30 second timeout for browser launch
            protocolTimeout: 60000 // 60 second timeout for protocol operations
        });

        const fullPdf = header + pdfBody + footer;

        // s3 params
        const HTMLparams = {
            Bucket: appConfig.aws.storageBucket,
            Key: `${user}/${user}.html`,
            Body: fullPdf,
            ContentType: 'application/xhtml+xml',
        };

        // create a new page with timeout handling
        page = await browser.newPage();
        
        // Set page timeout
        page.setDefaultTimeout(30000);
        page.setDefaultNavigationTimeout(30000);

        // Set viewport to A4 proportions (width: 800px, height: 1131px ≈ 800 * 1.414)
        await page.setViewport({ 
            width: 800, 
            height: 1131,
            deviceScaleFactor: 2 // For higher quality image
        });

        // Set content with improved error handling
        await page.setContent(fullPdf, {
            waitUntil: 'domcontentloaded', // Changed from networkidle2 to be more reliable
            timeout: 30000
        });

        // Wait a bit for any dynamic content to load
        await page.waitForTimeout(1000);

        // Generate PDF with timeout
        const pdfBuffer = await Promise.race([
            page.pdf({
                format: 'a4',
                printBackground: true,
                margin: {
                    top: '0.5in',
                    right: '0.5in',
                    bottom: '0.5in',
                    left: '0.5in'
                }
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('PDF generation timeout')), 30000)
            )
        ]) as Buffer;

        const PdfParams = {
            Bucket: appConfig.aws.storageBucket,
            Key: `${user}/${user}.pdf`,
            Body: pdfBuffer,
            ContentType: 'application/pdf',
        };

        // Generate screenshot with timeout
        const imgBuffer = await Promise.race([
            page.screenshot({
                type: 'webp',
                fullPage: true,
                omitBackground: false
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Screenshot generation timeout')), 30000)
            )
        ]) as Buffer;

        const ImgParams = {
            Bucket: appConfig.aws.storageBucket,
            Key: `${user}/${user}.webp`,
            Body: imgBuffer,
            ContentType: 'image/webp',
        };

        // Save all files to AWS
        await Promise.all([
            saveToAWS(PdfParams), 
            saveToAWS(HTMLparams), 
            saveToAWS(ImgParams)
        ]);

        // update to DB as PDF generated
        const collection = await (res.locals.db as MongoClient).db("resumevita").collection("resumes");

        const query = { user: user };
        const update = { $set: { isPDFGenerated: true, color, template, pdf_generated_date: new Date() } };

        await collection.updateOne(query, update);

        console.log(`PDF generation completed successfully for user: ${user}`);
        res.status(200).json({ message: 'PDF generated successfully' });

    } catch (err: any) {
        console.error('PDF generation error:', err);
        
        // Handle specific Puppeteer errors
        if (err.message.includes('TargetCloseError') || err.message.includes('Session closed')) {
            console.error('Browser session was closed unexpectedly');
            res.status(500).json({ 
                error: 'PDF generation failed due to browser session issues. Please try again.',
                details: err.message 
            });
        } else if (err.message.includes('timeout')) {
            console.error('PDF generation timed out');
            res.status(500).json({ 
                error: 'PDF generation timed out. Please try again.',
                details: err.message 
            });
        } else {
            res.status(500).json({ 
                error: 'PDF generation failed',
                details: err.message 
            });
        }
    } finally {
        // Ensure proper cleanup
        try {
            if (page) {
                await page.close();
            }
        } catch (err) {
            console.error('Error closing page:', err);
        }
        
        try {
            if (browser) {
                await browser.close();
            }
        } catch (err) {
            console.error('Error closing browser:', err);
        }
    }
}

const saveToAWS = async (params: any) => {
    // Create an object and upload it to the Amazon S3 bucket.
    try {
        await s3Client.send(new PutObjectCommand(params));
        console.log(params.Key + " uploaded it to " + params.Bucket);
    } catch (err) {
        console.log({ err });
    }
};


// generate styles
const header = `
    <html data-theme="emerald">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.7.2/dist/full.min.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>

    </style>
    </head>
    <body>
    `;

const footer = `</body></html>`