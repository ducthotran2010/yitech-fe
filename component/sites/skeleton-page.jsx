import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout, Popover, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { SideBar } from './side-bar';
import { useAccountContext } from '../profile/profile-context';
import { useEffect } from 'react';

export const SkeletonPage = ({ id, sideBarActive, children }) => {
  const { profile, setting, setSetting, route, setRoute } = useAccountContext();
  const router = useRouter();

  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const websites =
    profile && activeOrganization ? activeOrganization.websites : undefined;
  const webUrl = activeWebsite ? activeWebsite.webUrl : undefined;

  useEffect(() => {
    setRoute({ webID: id });
  }, [id]);

  const handleClickWebsite = website => {
    const { webID } = website;
    setSetting({
      ...setting,
      activeWebsite: website,
    });
    const pathname = window.location.pathname;
    const restPosition =
      pathname.slice('/sites/'.length).indexOf('/') + '/sites/'.length + 1;
    const restPath = pathname.slice(restPosition);
    const nextQueryPosition = restPath.indexOf('/');
    if (nextQueryPosition == -1) {
      router.push(`/sites/[id]/${restPath}`, `/sites/${webID}/${restPath}`);
      return;
    }

    const nextQuery = restPath.slice(0, nextQueryPosition);
    router.push(`/sites/[id]/${nextQuery}`, `/sites/${webID}/${nextQuery}`);
  };

  const renderWebsiteContentPopover = () => (
    <Menu
      theme="light"
      mode="vertical"
      className="border-r-0"
      style={{ minWidth: 250 }}
    >
      {websites &&
        websites.map(website => (
          <Menu.Item
            key={website.webID}
            onClick={() => handleClickWebsite(website)}
          >
            {website.webUrl}
          </Menu.Item>
        ))}
      <Menu.Item>
        <div className="flex items-center">
          <PlusOutlined />
          <span>Add website</span>
        </div>
      </Menu.Item>
    </Menu>
  );

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
          <div
            className="hover:underline cursor-pointer bg-gray-700 relative h-full flex items-center px-8 text-gray-400"
            style={{
              fontSize: 16,
              backgroundColor: '#1890ff',
            }}
          >
            <Popover
              content={renderWebsiteContentPopover()}
              placement="bottomLeft"
              overlayClassName="custom-popover"
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
              {webUrl}
            </Popover>
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
