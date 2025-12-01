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

// Next.js 16: middleware.ts is deprecated, use proxy.ts instead
// The proxy function runs in nodejs runtime
export async function proxy(request: Request): Promise<Response> {
  // Convert Request to NextRequest for Auth0 compatibility
  const req = new NextRequest(request);
  
  return handleRequest(req);
}

async function handleRequest(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  
  // Handle Auth0 routes first (login, logout, callback, etc.)
  // The middleware automatically handles all configured Auth0 routes
  const authResponse = await auth0.middleware(req);
  
  // If middleware returns a response, check if it's a valid response to return
  if (authResponse) {
    // Check if it's a redirect (3xx status) - logout, login, callback all redirect
    if (authResponse.status >= 300 && authResponse.status < 400) {
      return authResponse;
    }
    
    // Check if response has a Location header (redirect)
    const location = authResponse.headers.get('location');
    if (location) {
      return authResponse;
    }
    
    // Check if response has content-type (API response)
    const contentType = authResponse.headers.get('content-type');
    if (contentType) {
      return authResponse;
    }
    
    // For Auth0 routes (login, logout, callback), if middleware returned something,
    // it should be a valid response - return it
    if (pathname.startsWith('/api/auth/') || pathname.startsWith('/auth/')) {
      // If it's an Auth0 route and middleware returned a response, return it
      // This handles cases where logout might return a response that doesn't match above checks
      return authResponse;
    }
  }

  // Check if route requires authentication
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

