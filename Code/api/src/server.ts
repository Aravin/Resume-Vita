import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { appConfig } from './config';
import { router } from './router';

// initialize the express app
const app = express();

// add middleware
app
    .use(cors())
    .use(bodyParser.json())
    .use('/v1', router);

// start the server
app.listen(
    appConfig.port,
    () => console.log(`Resume API is running on PORT ${appConfig.port}`),
    );
