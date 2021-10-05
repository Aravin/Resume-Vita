import { Request, Response } from 'express';
import puppeteer from 'puppeteer';
import fs from 'fs';

export async function generatePDF(req: Request, res: Response) {

    let pdfBody = req.body?.html;
    let user = req.body?.user;

    // basic validation
    if (!pdfBody || !user) {
        return res.sendStatus(400);
    }

    // open the browser
    const browser = await puppeteer.launch();

    try {

        const fullPdf = header + pdfBody + footer;

        fs.writeFileSync(`${process.cwd()}/dist/public/${user}.html`, fullPdf);

        // create a new page
        const page = await browser.newPage();

        // set your html as the pages content
        const html = fs.readFileSync(`${process.cwd()}/dist/public/${user}.html`, 'utf8');

        await page.setContent(html, {
            waitUntil: 'networkidle2'
        });

        // or a .pdf file
        await page.pdf({
            format: 'A4' as any,
            path: `${process.cwd()}/dist/public/${user}.pdf`
        })

        res.send({ pdf: `${user}.pdf` });
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
    finally
    {
        await browser.close();
    }
}


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