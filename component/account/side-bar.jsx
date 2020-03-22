import { Layout, Menu, Card, Popover, Button, Select, Divider } from 'antd';
import { useRouter } from 'next/router';
import {
  AppstoreOutlined,
  PlusOutlined,
  AreaChartOutlined,
  FireOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { useAccountContext } from '../profile/profile-context';

export const SideBarDefault = {
  PROFILE: 'PROFILE',
  ORGANIZATION: 'ORGANIZATION',
};

const menus = [
  {
    key: SideBarDefault.PROFILE,
    icon: <AreaChartOutlined />,
    name: 'Profile',
  },
  {
    key: SideBarDefault.ORGANIZATION,
    icon: <AreaChartOutlined />,
    name: 'Organization',
  },
];

export const SideBar = ({ sideBarActive }) => {
  const { profile, route, setting, setSetting } = useAccountContext();
  const router = useRouter();

  const handleOnClick = selection => {
    switch (selection) {
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
          <Menu.Item>
            <div className="flex items-center">
              <AreaChartOutlined />
              <span>Logout</span>
            </div>
          </Menu.Item>
        </Menu>
      </div>
    </Layout.Sider>
  );
};
