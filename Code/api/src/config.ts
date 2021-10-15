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
        user: process.env.AWS_USER,
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        storageBucket: process.env.AWS_S3_BUCKET,
        region: process.env.AWS_S3_REGION,
        bucketURL: process.env.AWS_S3_BUCKET_URL,
    }
}
