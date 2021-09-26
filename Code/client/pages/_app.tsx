import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }: AppProps) {

  const { user } = pageProps;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
      <UserProvider user={user}>
      <Component {...pageProps} />
    </UserProvider>
      </Layout>
    </>
  )
}
export default MyApp
