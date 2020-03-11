import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}
          <title>
            Yitech | The fast & visual way to understand your users!
          </title>
          <script src="/canvasjs.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
