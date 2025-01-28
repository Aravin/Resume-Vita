import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { calculateATSScore } from '../../helpers/atsScoring';

export async function getATSScore(req: Request, res: Response) {
    try {
        const params = req.params;

        // basic validation
        if (!params.userId) {
            return res.sendStatus(400);
        }

        // collections
        const collection = (res.locals.db as MongoClient).db("resumeTree").collection("resumes");

        const query = { user: params.userId };

        const resume = await collection.findOne(query);

        if (!resume) {
            return res.sendStatus(404);
        }

        // Calculate ATS score
        const atsScore = calculateATSScore(resume);

        res.send({ atsScore });
    }
    catch (err) {
        console.error('Error calculating ATS score:', err);
        res.sendStatus(500);
    }
}
