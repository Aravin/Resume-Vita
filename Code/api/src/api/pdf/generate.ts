import { Request, Response } from 'express';
import pdf from 'html-pdf';
import fs from 'fs';

export async function generatePDF(req: Request, res: Response) {
    // generate styles
    const head = `
    <html>
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css" />
    <style>
    
    </style>
    </head>
    <body>`

    const footer = `</body></html>`

    try {

        let pdfContent = req.body.html;

        fs.writeFileSync('./generated/xyz.txt', head + pdfContent +footer)

        // basic validation
        if (!pdfContent) {
            return res.sendStatus(400);
        }

        const path = `./generated/${req.body.fileName || Date.now().toString()}.pdf`;

        pdf.create(head + pdfContent + footer, { format: 'A4', script = }).toFile(path, (err, resp) => {

            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }

            res.send({ pdf: resp.filename });
        });
    }
    catch (err) {
        res.sendStatus(500);
    }

}

