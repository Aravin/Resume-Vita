import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import * as ga from '../helpers/gtag';
import { useEffect } from 'react';
import React from 'react';

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.remove());

function MyApp({ Component, pageProps, ...appProps }: AppProps) {

  const ignoreLayout = [`/public/[id]`].includes(appProps.router.pathname);
  const LayoutComponent = ignoreLayout ? React.Fragment : Layout; 

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url)
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
    <UserProvider>
      <Head>
        <title>Resume Vita - Free and Open Source Resume Generator</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />
      </Head>
      <LayoutComponent>

        <Component {...pageProps} />

      </LayoutComponent>
    </UserProvider>
    </>
  )
}
export default MyApp
