import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

export async function readResume(req: Request, res: Response) {

    try {

        const params = req.params;

        // basic validation
        if (!params.userId) {
            return res.sendStatus(400);
        }

        // collections
        const collection = (res.locals.db as MongoClient).db("resumeTree").collection("resumes");

        const query = { user: params.userId };

        const response = await collection.findOne(query);

        if (!response) {
            return res.sendStatus(404);
        }

        res.send(response);
    }
    catch (err) {
        res.sendStatus(500);
    }

}
