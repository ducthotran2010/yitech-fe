import React from 'react';
import App from 'next/app';
import '../node_modules/antd/dist/antd.css';
import '../css/tailwind.css';

class MyApp extends App {
  render() {
    console.log('hi');
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
