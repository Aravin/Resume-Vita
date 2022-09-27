import { Router, Request, Response} from 'express';
import { generatePDF } from './api/pdf/generate';
import { reports } from './api/reports';
import { addResume } from './api/resume/add';
import { readResume } from './api/resume/read';

export const router = Router(); 

router.get('/health', (req: Request, res: Response) => {
    return res.send('Resume Service is Running!');
});

router.post('/pdf', async (req: Request, res: Response) => {
    return await generatePDF(req, res);
});

router.get('/resume/:userId', async (req: Request, res: Response) => {
    return await readResume(req, res);
});

router.post('/resume', async (req: Request, res: Response) => {
    return await addResume(req, res);
});

router.get('/reports', async (req: Request, res: Response) => {
    return await reports(req, res);
});

router.get('/*', (req: Request, res: Response) => {
    return res.status(404).send('Invalid Path');
});
