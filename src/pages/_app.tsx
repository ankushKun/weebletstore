import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Weeblet Store</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark',
          components: {
            Button: {
              defaultProps: {
                variant: "subtle",
                color: "gray"
              }
            },
            MenuItem: {
            }
          }
        }}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}