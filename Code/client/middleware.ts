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

export default async function middleware(req: NextRequest) {
  // Handle Auth0 routes first
  const authResponse = await auth0.middleware(req);
  if (authResponse) {
    // Check if it's a valid response (not NextResponse.next())
    // If it's a redirect or has content, it's valid
    if (authResponse.status >= 300 && authResponse.status < 400) {
      return authResponse; // Valid redirect
    }
    // If it has a body or content-type, it's valid
    const contentType = authResponse.headers.get('content-type');
    if (contentType || authResponse.body) {
      return authResponse;
    }
    // Otherwise, it might be next(), continue to route protection
  }

  // Check if route requires authentication
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ['/account', '/resume'];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath) {
    const session = await auth0.getSession(req);
    if (!session) {
      const loginUrl = new URL('/api/auth/login', req.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*", 
    "/resume/:path*",
    "/api/auth/:path*",
    "/auth/:path*"
  ],
};
