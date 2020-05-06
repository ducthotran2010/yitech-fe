import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Breadcrumb } from 'antd';
import { AcceptInviteForm } from '../component/user/accept-invite-form';
import NextLink from 'next/link';
import { getAccessToken, clearAccessToken } from '../utils/account-utils';

const { Title } = Typography;

const InvitePage = ({ token: initToken, email: initEmail }) => {
  const [token, _] = useState(initToken);
  const [email, __] = useState(initEmail);
  const router = useRouter();

  // useEffect(() => {
  //   router.push('/invite');
  // }, []);

  useEffect(() => {
    if (token.length == 0 && email.length == 0) {
      router.push('/404');
    }
  }, [token, email]);

  console.log({ token, email });

  return (
    <div
      className="h-screen flex flex-col bg-local bg-cover"
      style={{ backgroundImage: 'url(/background-banner.jpg)' }}
    >
      <div className="m-auto" style={{ width: 400 }}>
        <AcceptInviteForm token={token} email={email} />
        <NextLink href="/">
          <a className="hover:text-black text-base mt-4 text-center block">Back to Home</a>
        </NextLink>
      </div>
    </div>
  );
};

InvitePage.getInitialProps = ({ query: { token, email } }) => {
  return {
    token: (token || '').toString(),
    email: (email || '').toString(),
  };
};

export default InvitePage;
