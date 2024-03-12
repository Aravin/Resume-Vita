"use client";

import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-theme="emerald">
      <UserProvider>
        <Head>
          <title>Resume Vita - Free and Open Source Resume Generator</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
            key="viewport"
          />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Layout>{children}</Layout>
          <ProgressBar />
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          )}
        </body>
      </UserProvider>
    </html>
  );
}
