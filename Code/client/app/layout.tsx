import "../styles/globals.css";
import Layout from "../components/Layout";
import ClientProviders from "../components/ClientProviders";
import Script from "next/script";
import { initGoogleAnalytics } from "../utils/gtag";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  return (
    <html lang="en" data-theme="emerald">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`(${initGoogleAnalytics.toString()})('${gaId}');`}
            </Script>
          </>
        )}
      </head>
      <body>
        <ClientProviders>
          <Layout>{children}</Layout>
        </ClientProviders>
      </body>
    </html>
  );
}
