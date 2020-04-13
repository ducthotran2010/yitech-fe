import router from 'next/router';
import React from 'react';

import { getAccessToken, getAccessTokenCtx } from '../../utils/account-utils';

export const withAuth = Page =>
  class PrivateRoute extends React.Component {
    static async getInitialProps(ctx) {
      const token = getAccessTokenCtx(ctx);

      if (ctx.res && ctx.req) {
        if ((!token || token == '') && ctx.req.url !== '/') {
          ctx.res.writeHead(302, { Location: '/' });
          ctx.res.end();
        }
      }

      let pageProps = {};

      if (typeof Page.getInitialProps === 'function') {
        pageProps = await Page.getInitialProps(ctx);
      }

      return pageProps;
    }

    componentDidMount() {
      const accessToken = getAccessToken();

      if (
        (!accessToken || accessToken == '') &&
        (router.pathname !== '/' || window.location.pathname === '/')
      ) {
        router.push('/', '/');
      }
    }

    render() {
      return <Page {...this.props} />;
    }
  };
