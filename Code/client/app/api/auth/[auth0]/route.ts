import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

const authHandler = handleAuth({
    login: handleLogin({
        returnTo: "/resume",
    }),
    logout: handleLogout({
        returnTo: process.env.AUTH0_BASE_URL || "http://localhost:3000",
    }),
});

export const GET = authHandler;
export const POST = authHandler;

// Add runtime configuration to prevent build-time issues
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
