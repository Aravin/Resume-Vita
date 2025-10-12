import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION || 'ap-south-2',
});

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const bucketName = process.env.AWS_S3_BUCKET || 'resume-vita-bucket';
    const fileKey = `${params.userId}/${params.userId}.pdf`;
    
    // Generate signed URL (expires in 1 hour)
    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: fileKey,
      Expires: 3600, // 1 hour
    });

    return NextResponse.json({ 
      signedUrl,
      expiresIn: 3600,
      fileType: 'pdf'
    });

  } catch (error) {
    console.error('Error generating signed URL:', error);
    
    if (error instanceof Error && 'code' in error && error.code === 'NoSuchKey') {
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
  { params }: { params: { userId: string } }
) {
  try {
    const { fileType = 'pdf' } = await request.json();
    const bucketName = process.env.AWS_S3_BUCKET || 'resume-vita-bucket';
    const fileKey = `${params.userId}/${params.userId}.${fileType}`;
    
    const signedUrl = s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: fileKey,
      Expires: 3600,
    });

    return NextResponse.json({ 
      signedUrl,
      expiresIn: 3600,
      fileType
    });

  } catch (error) {
    console.error('Error generating signed URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate signed URL' }, 
      { status: 500 }
    );
  }
}