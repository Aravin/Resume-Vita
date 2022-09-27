import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

export async function reports(req: Request, res: Response) {

    try {

        const body = req.body;

        // collections
        const collection = (res.locals.db as MongoClient).db("resumeTree").collection("resumes");

        const savedResumes = await collection.estimatedDocumentCount();
        const generatedResumes = await collection.countDocuments({ 'isPDFGenerated': true });

        res.send({
            savedResumes,
            generatedResumes,
        });
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
