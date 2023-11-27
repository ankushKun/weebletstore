import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import NextNProgress from 'nextjs-progressbar';
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: { Component: any, pageProps: any }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Weeblet Store</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          components: {
            Button: {
              defaultProps: {
                variant: "subtle",
                color: "gray",
              },
            },
            MenuItem: {},
          },
        }}
      >
        <NextNProgress color="#cd7b80" />
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
}
