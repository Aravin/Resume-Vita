import "../styles/globals.css";
import Layout from "../components/Layout";
import ClientProvidersWrapper from "../components/ClientProvidersWrapper";
import Script from "next/script";
import { Suspense } from "react";
import GoogleAnalytics from "../components/GoogleAnalytics";

// Prevent static generation to avoid SSR issues with Auth0
export const dynamic = 'force-dynamic';

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
              id="google-analytics-dataLayer"
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  window.gtag = function(){window.dataLayer.push(Array.prototype.slice.call(arguments));}
                  window.gtag('js', new Date());
                  window.gtag('config', '${gaId}', {
                    page_path: window.location.pathname + (window.location.search || ''),
                  });
                `,
              }}
            />
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
          </>
        )}
      </head>
      <body>
        <ClientProvidersWrapper>
          {gaId && (
            <Suspense fallback={null}>
              <GoogleAnalytics gaId={gaId} />
            </Suspense>
          )}
          <Layout>{children}</Layout>
        </ClientProvidersWrapper>
      </body>
    </html>
  );
}
