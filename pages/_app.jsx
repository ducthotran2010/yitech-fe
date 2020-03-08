import React from 'react';
import App from 'next/app';
import '../css/tailwind.css';
import { AccountProvider } from '../component/profile/profile-provider';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <AccountProvider>
        <Component {...pageProps} />
      </AccountProvider>
    );
  }
}

export default MyApp;
