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
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
            key="viewport"
          />
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
