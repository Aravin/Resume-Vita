"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      {children}
      <ProgressBar />
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      )}
    </UserProvider>
  );
}
