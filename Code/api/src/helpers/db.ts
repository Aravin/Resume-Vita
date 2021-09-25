import { appConfig } from "../config";
import { Mongoose } from "mongoose";

export const db = new Mongoose();
const uri = `mongodb+srv://aravin:${appConfig.db.password}@resumetree-cluster-1.cwfik.mongodb.net/${appConfig.db.name}?retryWrites=true&w=majority`;

async function main() {
    await db.connect(uri);
}


main()
    .then(() => console.log('DB Connection Successful.'))
    .catch(err => console.log(err));

