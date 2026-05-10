import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure AWS S3
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_S3_REGION || 'ap-south-2',
});

function isMissingObjectError(error: unknown) {
  if (!error || typeof error !== 'object') {
    return false;
  }

  const maybeError = error as {
    name?: string;
    Code?: string;
    $metadata?: { httpStatusCode?: number };
  };

  return (
    maybeError.name === 'NotFound' ||
    maybeError.name === 'NoSuchKey' ||
    maybeError.Code === 'NoSuchKey' ||
    maybeError.$metadata?.httpStatusCode === 404
  );
}

async function ensureObjectExists(bucketName: string, fileKey: string) {
  await s3Client.send(
    new HeadObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    })
  );
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const bucketName = process.env.AWS_S3_BUCKET || 'resume-vita-bucket';
    const fileKey = `${userId}/${userId}.pdf`;

    await ensureObjectExists(bucketName, fileKey);
    
    // Create the command
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });
    
    // Generate signed URL (expires in 1 hour)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return NextResponse.json({ 
      signedUrl,
      expiresIn: 3600,
      fileType: 'pdf'
    });

  } catch (error) {
    console.error('Error generating signed URL:', error);
    
    if (isMissingObjectError(error)) {
      return NextResponse.json({ error: 'PDF not found' }, { status: 404 });
    }
    
    return NextResponse.json(
      { error: 'Failed to generate signed URL' }, 
      { status: 500 }
    );
  }
}

// Generate signed URL for WebP preview images
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  let fileType = 'pdf';

  try {
    const { userId } = await params;
    const requestBody = await request.json().catch(() => ({}));
    fileType = requestBody?.fileType || 'pdf';
    const bucketName = process.env.AWS_S3_BUCKET || 'resume-vita-bucket';
    const fileKey = `${userId}/${userId}.${fileType}`;

    await ensureObjectExists(bucketName, fileKey);
    
    // Create the command
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });
    
    // Generate signed URL (expires in 1 hour)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    return NextResponse.json({ 
      signedUrl,
      expiresIn: 3600,
      fileType
    });

  } catch (error) {
    console.error('Error generating signed URL:', error);

    if (isMissingObjectError(error)) {
      return NextResponse.json(
        { error: `${fileType.toUpperCase()} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate signed URL' }, 
      { status: 500 }
    );
  }
}