import { handleAuth } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';

// Create a wrapper function to handle the request properly
async function authHandler(request: NextRequest) {
  try {
    return await handleAuth()(request);
  } catch (error) {
    console.error('Auth0 handler error:', error);
    return new Response('Authentication error', { status: 500 });
  }
}

export const GET = authHandler;
export const POST = authHandler;

// Add runtime configuration to prevent build-time issues
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
