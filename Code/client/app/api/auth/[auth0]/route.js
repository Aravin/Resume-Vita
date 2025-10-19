import { handleAuth, handleLogin, handleLogout } from '@auth0/nextjs-auth0';

const authHandler = handleAuth({
    login: handleLogin({
        returnTo: "/resume",
    }),
    logout: handleLogout({
        returnTo: process.env.AUTH0_BASE_URL || "http://localhost:3000",
    }),
});

export const GET = async (request, context) => {
    // Await params to make them synchronous for Auth0 v3
    const params = await context.params;
    return authHandler(request, { params });
};
