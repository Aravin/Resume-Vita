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
  // GA4 IDs are G-XXXXXXXXXX; legacy UA IDs are UA-XXXXXXXXX-X
  const isValidGaId = gaId && /^(G-[A-Z0-9]+|UA-\d+-\d+)$/.test(gaId.trim());

  return (
    <html lang="en" data-theme="emerald">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body>
        {/* GA4: load gtag.js first, then inline init (same order as Google / Next.js docs).
            Use the official dataLayer stub — push(arguments), not push([...]), or hits may never send. */}
        {isValidGaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  send_page_view: true,
                  page_path: window.location.pathname + (window.location.search || ''),
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
        <ClientProvidersWrapper>
          {isValidGaId && gaId && (
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
