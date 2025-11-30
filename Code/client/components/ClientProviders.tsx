"use client";

import { Auth0Provider } from "@auth0/nextjs-auth0/client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  // Auth0Provider handles SSR automatically in v4
  // Always render it to ensure context is available
  return (
    <Auth0Provider>
      {children}
      <ProgressBar />
    </Auth0Provider>
  );
}
