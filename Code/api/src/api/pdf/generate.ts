import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs';
import { s3Client } from "../../helpers/s3";
import { appConfig } from '../../config';
import { PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

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

        // fs.writeFileSync(`${process.cwd()}/dist/public/${user}.html`, fullPdf);

        // s3 params
        const HTMLparams = {
            Bucket: appConfig.aws.storageBucket,
            Key: `${user}/${user}.html`, // The name of the object. For example, 'sample_upload.txt'.
            Body: fullPdf,
        };

        // save HTML
        await saveToAWS(HTMLparams);

        // create a new page
        const page = await browser.newPage();
        await page.setViewport({ width: 800, height: 1000 })

        // const html = await fs.readFileSync(`${appConfig.aws.bucketURL}/${user}/${user}.html`, 'utf8');

        await page.setContent(fullPdf, {
            waitUntil: 'networkidle2'
        });

        // save PDF
        const pdfBuffer = await page.pdf({
            format: 'A4' as any,
            // path: `${process.cwd()}/dist/public/${user}.pdf`
        });

        const PdfParams = {
            Bucket: appConfig.aws.storageBucket,
            Key: `${user}/${user}.pdf`, // The name of the object. For example, 'sample_upload.txt'.
            Body: pdfBuffer,
        }; 

        await saveToAWS(PdfParams);

        // save PNG
        const imgBuffer = await page.screenshot(
            { type: 'webp' }
            // { path: `${process.cwd()}/dist/public/${user}.png` }
        );

        const ImgParams = {
            Bucket: appConfig.aws.storageBucket,
            Key: `${user}/${user}.webp`, // The name of the object. For example, 'sample_upload.txt'.
            Body: imgBuffer,
        };
        await saveToAWS(ImgParams);

        res.send({ pdf: `${user}.pdf` });
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
        const results = await s3Client.send(new PutObjectCommand(params));
        console.log(
            "Successfully created " +
            params.Key +
            " and uploaded it to " +
            params.Bucket +
            "/" +
            params.Key
        );
        return results; // For unit tests.
    } catch (err) {
        console.log({err});
    }
};


// generate styles
const header = `
    <html>
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" media="all" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/base.min.css" />
    <link rel="stylesheet" media="all" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/components.min.css" />
    <link rel="stylesheet" media="all" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/utilities.min.css" />
    <style>

    </style>
    </head>
    <body>
    `;

const footer = `</body></html>`