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

// Handle profile route - used by client-side useUser hook
export async function GET(req: NextRequest) {
  const session = await auth0.getSession(req);
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  return NextResponse.json(session.user);
}



