import { appConfig } from "../config";
import { MongoClient } from 'mongodb';
// import { Mongoose } from "mongoose";
// export const db = new Mongoose();
const uri = `mongodb+srv://aravin:${appConfig.db.password}@resumetree-cluster-1.cwfik.mongodb.net/${appConfig.db.name}?retryWrites=true&w=majority`;

export const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true } as any);

// async function main() {
//     await db.connect(uri);
// }


db.connect()
    .then(() => console.log('DB Connection Successful.'))
    .catch(err => console.log(err));

