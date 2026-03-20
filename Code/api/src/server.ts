import express from 'express';
import cors from 'cors';
import { appConfig } from './config';
import { router } from './router';
import { getMongoClient } from './helpers/db';

// initialize the express app
const app = express();

// add middleware
app
    .use(cors())
    .use('/public', express.static(__dirname + '/public'))
    .use(async (req, res, next) => {
        try {
          res.locals.db = await getMongoClient();
          next();
        } catch (e) {
          next(e);
        }
      })
    .use(express.json())
    .use('/v1', router);


// start the server
app.listen(
    appConfig.port,
    () => console.log(`Resume API is running on PORT ${appConfig.port}`),
    );
