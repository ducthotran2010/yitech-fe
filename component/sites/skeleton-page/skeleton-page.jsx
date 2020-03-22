import React, { useEffect } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';

import { SideBar } from '../side-bar';
import { useAccountContext } from '../../profile/profile-context';
import { WebsiteSection } from './website-section';
import { UserSection } from '../../user/user-section/user-section';

export const SkeletonPage = ({ id, sideBarActive, children }) => {
  const { setRoute } = useAccountContext();

  useEffect(() => {
    setRoute({ webID: id });
  }, [id]);

  return (
    <Layout className="h-screen flex flex-row">
      <Head>
        <style>{`
          .custom-popover {
            padding: 100px;
          }
          .custom-popover .ant-popover-inner-content {
            padding: 0px;
          }
          .custom-popover .ant-popover-arrow {
            display: none;
          }
          .item:hover {
            background: #00000030;
          }
        `}</style>
      </Head>
      <SideBar sideBarActive={sideBarActive} />
      <div className="w-full">
        <div
          className="flex flex-row items-center justify-between overflow-hidden shadow z-20"
          style={{
            height: 45,
            background: 'rgb(38,29,23)',
            background:
              'linear-gradient(90deg, rgba(38,29,23,1) 0%, rgba(34,17,41,1) 100%)',
          }}
        >
          <WebsiteSection />
          <UserSection />
        </div>
        <Layout
          className="w-full p-8 pt-4 overflow-y-auto"
          style={{ height: 'calc(100vh - 45px)' }}
        >
          {children}
        </Layout>
      </div>
    </Layout>
  );
};
