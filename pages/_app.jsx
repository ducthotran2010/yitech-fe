import React from 'react';
import Head from 'next/head';
import App from 'next/app';

import '../css/tailwind.css';
import { AccountProvider } from '../component/profile/profile-provider';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>
            Yitech | The fast & visual way to understand your users!
          </title>
        </Head>
        <AccountProvider>
          <Component {...pageProps} />
        </AccountProvider>
      </>
    );
  }
}

export default MyApp;
