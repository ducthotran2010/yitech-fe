import router from 'next/router';
import React from 'react';

import { getAccessToken } from '../../utils/account-utils';

export const withAuth = Page =>
  class PrivateRoute extends React.Component {
    static async getInitialProps(ctx) {
      let pageProps = {};

      if (typeof Page.getInitialProps === 'function') {
        pageProps = await Page.getInitialProps(ctx);
      }

      return pageProps;
    }

    componentDidMount() {
      const accessToken = getAccessToken();

      if (
        !accessToken &&
        (router.pathname !== '/' || window.location.pathname === '/')
      ) {
        router.push('/', '/');
      }
    }

    render() {
      return <Page {...this.props} />;
    }
  };
