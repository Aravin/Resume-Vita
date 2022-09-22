import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { s3Client } from "../../helpers/s3";
import { appConfig } from '../../config';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { MongoClient } from 'mongodb';

export async function generatePDF(req: Request, res: Response) {

    let pdfBody = req.body?.html;
    let user = req.body?.user;

    // basic validation
    if (!pdfBody || !user) {
        return res.sendStatus(400);
    }

    // open the browser
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

    try {

        const fullPdf = header + pdfBody + footer;

        // s3 params
        const HTMLparams = {
            Bucket: appConfig.aws.storageBucket,
            Key: `${user}/${user}.html`, // The name of the object. For example, 'sample_upload.txt'.
            Body: fullPdf,
        };

        // save HTML
        saveToAWS(HTMLparams);

        // create a new page
        const page = await browser.newPage();
        await page.setViewport({ width: 800, height: 1000 });

        await page.setContent(fullPdf, {
            waitUntil: 'networkidle2',
        });

        // save PDF
        const pdfBuffer = await page.pdf({
            format: 'A4' as any,
            printBackground: true,
        });

        const PdfParams = {
            Bucket: appConfig.aws.storageBucket,
            Key: `${user}/${user}.pdf`, // The name of the object. For example, 'sample_upload.txt'.
            Body: pdfBuffer,
        }; 

        saveToAWS(PdfParams);

        // save PNG
        const imgBuffer = await page.screenshot(
            { type: 'webp' }
        );

        const ImgParams = {
            Bucket: appConfig.aws.storageBucket,
            Key: `${user}/${user}.webp`, // The name of the object. For example, 'sample_upload.txt'.
            Body: imgBuffer,
        };

        saveToAWS(ImgParams);

        // update to DB as PDF generated
        const collection = (res.locals.db as MongoClient).db("resumeTree").collection("resumes");

        const query = { user: user };
        const update = { $set: { isPDFGenerated: true  } };

        collection.findOneAndUpdate(query, update);

        res.sendStatus(200);
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
    finally {
        await browser.close();
    }
}

const saveToAWS = async (params: any) => {
    // Create an object and upload it to the Amazon S3 bucket.
    try {
        await s3Client.send(new PutObjectCommand(params));
        console.log(params.Key + " uploaded it to " + params.Bucket);
    } catch (err) {
        console.log({err});
    }
};


// generate styles
const header = `
    <html data-theme="emerald">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://cdn.jsdelivr.net/npm/daisyui@2.31.0/dist/full.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>

    </style>
    </head>
    <body>
    `;

const footer = `</body></html>`