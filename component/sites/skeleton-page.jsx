import { Layout } from 'antd';

import { SideBar } from './side-bar';
import { useAccountContext } from '../profile/profile-context';

export const SkeletonPage = ({ id, sideBarActive, children }) => {
  const { profile, setting } = useAccountContext();
  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const websites =
    profile && activeOrganization ? activeOrganization.websites : undefined;
  const webUrl = activeWebsite ? activeWebsite.webUrl : undefined;

  return (
    <Layout className="h-screen flex flex-row">
      <SideBar id={id} sideBarActive={sideBarActive} />
      <div className="flex flex-col w-full">
        <div
          className="flex flex-row items-center overflow-hidden shadow z-20"
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
            <div
              className="absolute bg-gray-700 rotate-45 transform"
              style={{
                color: '#666e7b',
                backgroundColor: '#1890ff',
                width: 40,
                height: 40,
                right: -20,
              }}
            ></div>
            {webUrl}
          </div>
        </div>
        <Layout className="flex-1 w-full p-8 overflow-y-auto">
          {children}
        </Layout>
      </div>
    </Layout>
  );
};
