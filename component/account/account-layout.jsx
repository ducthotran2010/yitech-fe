import Head from 'next/head';
import { Layout } from 'antd';

import { SideBar } from './side-bar';
import { UserSection } from '../user/user-section/user-section';

export const AccountLayout = ({ sectionName, sideBarActive, children }) => {
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
            background: #00000010;
          }
        `}</style>
      </Head>
      <SideBar sideBarActive={sideBarActive} />
      <div className="w-full">
        <div
          className="flex flex-row bg-white items-center justify-between overflow-hidden shadow z-20"
          style={{
            height: 45,
            background: 'rgb(34,17,41)',
            background:
              'linear-gradient(0deg, rgba(38,29,23,1) 0%, rgba(34,17,41,1) 100%)',
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
