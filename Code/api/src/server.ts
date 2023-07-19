import express from 'express';
import cors from 'cors';
import { appConfig } from './config';
import { router } from './router';
import { db } from './helpers/db';

// initialize the express app
const app = express();

// add middleware
app
    .use(cors())
    .use('/public', express.static(__dirname + '/public'))
    .use(async (req, res, next) => {
        // initialize the db
        res.locals.db = db;
        next()
      })
    .use(express.json())
    .use('/v1', router);


// start the server
app.listen(
    appConfig.port,
    () => console.log(`Resume API is running on PORT ${appConfig.port}`),
    );
