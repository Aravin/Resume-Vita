import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0';
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress

//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());  

function MyApp({ Component, pageProps }: AppProps) {

  const { user } = pageProps;

  return (
    <><UserProvider>
      <Head>
        <title>Resume Tree - Free and Open Source Resume Generator</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" key="viewport" />
      </Head>
      <Layout>

        <Component {...pageProps} />

      </Layout>
    </UserProvider>
    </>
  )
}
export default MyApp
