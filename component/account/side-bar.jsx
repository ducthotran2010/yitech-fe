import { Layout, Menu, Card, Popover, Button, Select, Divider } from 'antd';
import { useRouter } from 'next/router';
import {
  SwapLeftOutlined,
  UserOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useAccountContext } from '../profile/profile-context';
import { clearAccessToken } from '../../utils/account-utils';

export const SideBarDefault = {
  BACK: 'BACK',
  PROFILE: 'PROFILE',
  ORGANIZATION: 'ORGANIZATION',
};

export const SideBar = ({ sideBarActive }) => {
  const { profile, route, setting, setSetting } = useAccountContext();
  const router = useRouter();

  let menus = [
    {
      key: SideBarDefault.PROFILE,
      icon: <UserOutlined />,
      name: 'Profile',
    },
    {
      key: SideBarDefault.ORGANIZATION,
      icon: <UnorderedListOutlined />,
      name: 'Organization',
    },
  ];

  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const activeWebsite = setting ? setting.activeWebsite : undefined;

  if (activeWebsite || activeOrganization) {
    menus = [
      {
        key: SideBarDefault.BACK,
        icon: <SwapLeftOutlined />,
        name: 'Back',
      },
      ...menus,
    ];
  }

  const handleOnClick = selection => {
    switch (selection) {
      case SideBarDefault.BACK:
        let dummyID;
        if (activeWebsite) {
          dummyID = activeWebsite.webID;
        } else if (activeOrganization) {
          dummyID = activeOrganization.websites[0].webID;
        }

        return router.push(
          '/sites/[id]/dashboard',
          `/sites/${dummyID}/dashboard`,
        );

      case SideBarDefault.PROFILE:
        return router.push('/profile');

      case SideBarDefault.ORGANIZATION:
        return router.push('/profile/organization');
    }
  };

  return (
    <Layout.Sider width={200} theme="dark" breakpoint="md">
      <div
        className="h-screen flex flex-col"
        style={{
          background: 'rgb(34,17,41)',
          background:
            'linear-gradient(0deg, rgba(38,29,23,1) 0%, rgba(34,17,41,1) 100%)',
        }}
      >
        <Menu
          selectable={false}
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[sideBarActive]}
          className="bg-transparent flex-1 border-r-0"
        >
          <div
            style={{ height: 150 }}
            className="flex justify-center items-center mb-10"
          >
            <img src="/icon.png" width="40%" />
          </div>

          {menus.map(({ key, icon, name }) => (
            <Menu.Item key={key} onClick={() => handleOnClick(key)}>
              <div className="flex items-center">
                {icon}
                <span>{name}</span>
              </div>
            </Menu.Item>
          ))}
        </Menu>

        <Menu selectable={false} theme="dark" className="mb-4 bg-transparent">
          <Menu.Item
            onClick={() => {
              router.push('/');
              clearAccessToken();
            }}
          >
            <div className="flex items-center">
              <LogoutOutlined />
              <span>Logout</span>
            </div>
          </Menu.Item>
        </Menu>
      </div>
    </Layout.Sider>
  );
};
