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

// Simple wrapper to handle prefetch requests
async function wrappedHandler(request: NextRequest) {
    // Check if this is a prefetch request
    const isPrefetch = request.headers.get('next-router-prefetch') === '1';
    
    if (isPrefetch) {
        // Return empty response for prefetch to prevent CORS errors
        return new Response(null, { status: 200 });
    }
    
    return authHandler(request);
}

export const GET = wrappedHandler;
export const POST = wrappedHandler;
