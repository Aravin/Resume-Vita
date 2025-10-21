import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';
import { NextRequest } from 'next/server';

const authHandler = handleAuth({
    login: handleLogin({
        returnTo: "/resume",
    }),
    logout: handleLogout({
        returnTo: process.env.AUTH0_BASE_URL || "http://localhost:3000",
    }),
});

// Wrap the handler to prevent prefetch issues
async function wrappedHandler(request: NextRequest) {
    // Handle prefetch requests by returning a simple response
    if (request.headers.get('next-router-prefetch') === '1') {
        return new Response(null, { status: 200 });
    }
    
    return authHandler(request);
}

export const GET = wrappedHandler;
export const POST = wrappedHandler;

// Add runtime configuration to prevent build-time issues
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
