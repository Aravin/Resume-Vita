import { Request, Response } from 'express';
import { MongoClient } from 'mongodb';
import { calculateATSScore } from '../../helpers/atsScoring';

interface ResumeContent {
  personal?: {
    email?: string;
    phone?: string;
    summary?: string;
    name?: string;
    role?: string;
    location?: string;
  };
  employments?: Array<{
    title?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    summary?: string;
  }>;
  skills?: Array<{
    name?: string;
    level?: string;
  }>;
  educations?: Array<{
    institution?: string;
    subject?: string;
    startDate?: string;
    endDate?: string;
    summary?: string;
  }>;
}

export async function getATSScore(req: Request, res: Response) {
    try {
        const params = req.params;

        // basic validation
        if (!params.userId) {
            return res.sendStatus(400);
        }

        // collections
        const collection = (res.locals.db as MongoClient).db("resumevita").collection("resumes");

        const query = { user: params.userId };

        const doc = await collection.findOne(query);

        if (!doc) {
            return res.sendStatus(404);
        }

        const resumePayload = (doc as { resume?: ResumeContent }).resume ?? {};

        const atsScore = calculateATSScore(resumePayload);

        res.send({ atsScore });
    }
    catch (err) {
        console.error('Error calculating ATS score:', err);
        res.sendStatus(500);
    }
}
