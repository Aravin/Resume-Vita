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

// In Auth0 v4, the middleware (proxy) handles all auth routes
// This route handler exists because Next.js requires it for dynamic routes
// The middleware will intercept and handle these requests before they reach here
// But if a request reaches here, handle it explicitly
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname;
  
  // Handle login
  if (pathname.includes('/login')) {
    const returnTo = url.searchParams.get('returnTo') || '/resume';
    return auth0.startInteractiveLogin({ returnTo });
  }
  
  // For logout and other routes, the middleware should have handled them
  // If we reach here, it means the middleware didn't handle it
  // Return 404 as fallback
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function POST(req: NextRequest) {
  // POST requests are handled by middleware
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

