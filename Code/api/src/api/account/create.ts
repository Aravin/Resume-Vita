import { Request, Response} from 'express';
import { MongoClient } from 'mongodb';

export async function addAccount(req: Request, res: Response) {

    try {
        
        const body = req.body;

        // basic validation
        if (!body.userId) {
            return res.sendStatus(400);
        }

        // collections
        const collection = (res.locals.db as MongoClient).db("resumeTree").collection("users");

        const response = await collection.insertOne(body);

        res.send(response);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}
