import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure AWS S3
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_S3_REGION || 'ap-south-2',
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  let userId: string | undefined;
  try {
    const resolvedParams = await params;
    userId = resolvedParams.userId;
    const bucketName = process.env.AWS_S3_BUCKET || 'resume-vita-bucket';
    const fileKey = `${userId}/${userId}.pdf`;
    
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
    
    // Log detailed error information
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      userId: userId || 'unknown',
      timestamp: new Date().toISOString(),
      endpoint: '/api/resume/[userId]/signed-url',
      method: 'GET',
    };
    console.error('Error details:', errorDetails);
    
    // Check for NoSuchKey error - AWS SDK v3 errors can have name property or be in error object
    const isNoSuchKey = 
      (error instanceof Error && 'name' in error && error.name === 'NoSuchKey') ||
      (error && typeof error === 'object' && 'name' in error && (error as any).name === 'NoSuchKey') ||
      (error instanceof Error && error.message?.includes('NoSuchKey')) ||
      (error && typeof error === 'object' && 'Code' in error && (error as any).Code === 'NoSuchKey');
    
    if (isNoSuchKey) {
      return NextResponse.json(
        { 
          error: 'PDF not found',
          message: 'The requested PDF file does not exist.',
          statusCode: 404,
        }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to generate signed URL',
        message: 'An error occurred while generating the signed URL. Please try again later.',
        statusCode: 500,
        ...(process.env.NODE_ENV === 'development' && { details: errorDetails }),
      }, 
      { status: 500 }
    );
  }
}

// Generate signed URL for WebP preview images
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  let userId: string | undefined;
  let fileType: string = 'pdf';
  try {
    const resolvedParams = await params;
    userId = resolvedParams.userId;
    const body = await request.json();
    fileType = body.fileType || 'pdf';
    const bucketName = process.env.AWS_S3_BUCKET || 'resume-vita-bucket';
    const fileKey = `${userId}/${userId}.${fileType}`;
    
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
    
    // Log detailed error information
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      userId: userId || 'unknown',
      fileType,
      timestamp: new Date().toISOString(),
      endpoint: '/api/resume/[userId]/signed-url',
      method: 'POST',
    };
    console.error('Error details:', errorDetails);
    
    // Check for NoSuchKey error - AWS SDK v3 errors can have name property or be in error object
    const isNoSuchKey = 
      (error instanceof Error && 'name' in error && error.name === 'NoSuchKey') ||
      (error && typeof error === 'object' && 'name' in error && (error as any).name === 'NoSuchKey') ||
      (error instanceof Error && error.message?.includes('NoSuchKey')) ||
      (error && typeof error === 'object' && 'Code' in error && (error as any).Code === 'NoSuchKey');
    
    if (isNoSuchKey) {
      const fileTypeLabel = fileType === 'webp' ? 'preview image' : fileType.toUpperCase();
      return NextResponse.json(
        { 
          error: 'File not found',
          message: `The requested ${fileTypeLabel} file does not exist.`,
          statusCode: 404,
        }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to generate signed URL',
        message: 'An error occurred while generating the signed URL. Please try again later.',
        statusCode: 500,
        ...(process.env.NODE_ENV === 'development' && { details: errorDetails }),
      }, 
      { status: 500 }
    );
  }
}