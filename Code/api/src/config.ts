import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
    port: process.env.PORT,
    db: {
        name: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
    },
    aws: {
        storageBucket: process.env.AWS_S3_BUCKET,
        region: process.env.AWS_S3_REGION,
    }
}
