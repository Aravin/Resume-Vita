import { Request, Response} from 'express';
import pdf from 'html-pdf';

export async function generatePDF(req: Request, res: Response) {

    try {
        
        const pdfContent = req.body.html;

        // basic validation
        if (!pdfContent) {
            return res.sendStatus(400);
        }

        const path = `./generated/${req.body.fileName || Date.now().toString()}.pdf`;

        pdf.create(pdfContent).toFile(path, (err, resp) => {

            if (err) {
                return res.sendStatus(500);
            }

            res.send({pdf: resp.filename});
        });
    }
    catch (err) {
        res.sendStatus(500);
    }

}
