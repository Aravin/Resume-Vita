import { handleAuth, handleLogin, handleLogout, handleCallback, handleProfile } from '@auth0/nextjs-auth0';

const authHandler = handleAuth({
    login: handleLogin({
        returnTo: "/resume",
    }),
    logout: handleLogout({
        returnTo: process.env.AUTH0_BASE_URL || "http://localhost:3000",
    }),
    callback: handleCallback(),
    profile: handleProfile(),
});

export const GET = authHandler;
export const POST = authHandler;
