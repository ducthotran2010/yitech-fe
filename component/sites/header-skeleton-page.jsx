import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout, Popover, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { SideBar } from './side-bar';
import { useAccountContext } from '../profile/profile-context';
import { useEffect } from 'react';

export const HeaderSkeletonPage = ({ sectionName, sideBarActive, children }) => {
  const { setting } = useAccountContext();
  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const webID = activeWebsite ? activeWebsite.webID : undefined;

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
        <title>Yitech | The fast & visual way to understand your users!</title>
      </Head>
      <SideBar id={webID} sideBarActive={sideBarActive} />
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
          <div
            className="cursor-pointer bg-gray-700 relative h-full flex items-center px-8 text-gray-400"
            style={{
              fontSize: 16,
              backgroundColor: '#1890ff',
            }}
          >
            <div
              className="absolute bg-gray-700 rotate-45 transform"
              style={{
                color: '#666e7b',
                backgroundColor: '#1890ff',
                width: 40,
                height: 40,
                top: 3,
                right: -20,
              }}
            ></div>
            {sectionName}
          </div>
          <div className="cursor-pointer flex h-full items-center px-8 text-gray-400 hover:text-white transition ease-in-out duration-300 item">
            Duc Tho Tran
          </div>
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
