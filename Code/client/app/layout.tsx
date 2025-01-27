"use client";

import "../styles/globals.css";
import Layout from "../components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="emerald">
      <Head>
      <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
            key="viewport"
          />
      </Head>
      <body>
        <UserProvider>
          <Layout>{children}</Layout>
          <ProgressBar />
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          )}
        </UserProvider>
      </body>
    </html>
  );
}
