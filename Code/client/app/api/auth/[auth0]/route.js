import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

const authHandler = handleAuth({
    login: handleLogin({
        returnTo: "/resume",
    }),
});

export const GET = async (request, context) => {
    // Await params to make them synchronous for Auth0 v3
    const params = await context.params;
    return authHandler(request, { params });
};
