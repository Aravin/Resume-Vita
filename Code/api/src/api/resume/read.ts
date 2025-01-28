// Testing deployment with new RSA key
import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { calculateATSScore } from '../../helpers/atsScoring';

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

        // Calculate ATS score using the resume data from the response
        const atsScore = calculateATSScore(response.resume);

        // Add ATS score to response
        res.send({
            ...response,
            atsScore
        });
    }
    catch (err) {
        console.error('Error reading resume:', err);
        res.sendStatus(500);
    }
}
