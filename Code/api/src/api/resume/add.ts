import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

export async function addResume(req: Request, res: Response) {

    try {

        const body = req.body;

        // basic validation
        if (!body.user) {
            return res.sendStatus(400);
        }

        if (!body.resume) {
            return res.sendStatus(400);
        }

        // collections
        const collection = (res.locals.db as MongoClient).db("resumeTree").collection("resumes");

        const query = { user: body.user };
        const date = new Date();
        const update = { $set: { ...body, modified_date: date}, $setOnInsert: { created_date: date } };
        const options = { upsert: true };

        const response = await collection.findOneAndUpdate(query, update, options);

        res.send(response);
    }
    catch (err) {
        res.sendStatus(500);
    }

}
