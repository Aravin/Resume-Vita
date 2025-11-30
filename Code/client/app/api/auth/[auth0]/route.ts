import { NextRequest, NextResponse } from 'next/server';
import { Auth0Client } from '@auth0/nextjs-auth0/server';

const auth0 = new Auth0Client({
  signInReturnToPath: '/resume',
  routes: {
    callback: '/auth/callback',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
  },
});

// In Auth0 v4, the middleware handles all auth routes
// This route handler exists because Next.js requires it for dynamic routes
// The middleware will intercept and handle these requests before they reach here
export async function GET(req: NextRequest) {
  // This should rarely be called as middleware handles auth routes
  // But if it is, handle login specifically
  const url = new URL(req.url);
  if (url.pathname.includes('/login')) {
    const returnTo = url.searchParams.get('returnTo') || '/resume';
    return auth0.startInteractiveLogin({ returnTo });
  }
  
  // For other routes, return 404 (middleware should have handled them)
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function POST(req: NextRequest) {
  // POST requests are handled by middleware
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

