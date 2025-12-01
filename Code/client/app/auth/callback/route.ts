import { NextRequest, NextResponse } from 'next/server';
import { Auth0Client } from '@auth0/nextjs-auth0/server';

const auth0 = new Auth0Client({
  signInReturnToPath: '/resume',
  logoutStrategy: 'v2', // Use v2 logout endpoint (suppresses RP-initiated logout warning)
  routes: {
    callback: '/auth/callback',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
  },
});

// Handle Auth0 callback
export async function GET(req: NextRequest) {
  // The middleware should handle this, but if it reaches here, handle it
  const response = await auth0.middleware(req);
  if (response) {
    return response;
  }
  return NextResponse.json({ error: 'Callback failed' }, { status: 500 });
}

export async function POST(req: NextRequest) {
  const response = await auth0.middleware(req);
  if (response) {
    return response;
  }
  return NextResponse.json({ error: 'Callback failed' }, { status: 500 });
}

