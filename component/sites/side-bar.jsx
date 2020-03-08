import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import {
  DesktopOutlined,
  AppstoreOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

export const SideBarDefault = {
  DASH_BOARD: 'DASH_BOARD',
  CLICK_EVENT: 'CLICK_EVENT',
  HOVER_EVENT: 'HOVER_EVENT',
  CONTENT_READING: 'CONTENT_READING',
  CONVERSION_RATE: 'CONVERSION_RATE',
};

const menus = [
  {
    key: SideBarDefault.CLICK_EVENT,
    icon: <DesktopOutlined />,
    name: 'Click Event',
  },
  {
    key: SideBarDefault.HOVER_EVENT,
    icon: <DesktopOutlined />,
    name: 'Hover Event',
  },
  {
    key: SideBarDefault.CONTENT_READING,
    icon: <DesktopOutlined />,
    name: 'Content Reading',
  },
  {
    key: SideBarDefault.CONVERSION_RATE,
    icon: <DesktopOutlined />,
    name: 'Conversion Rate',
  },
];

export const SideBar = ({ id, sideBarActive }) => {
  const router = useRouter();

  const handleOnClick = selection => {
    switch (selection) {
      case SideBarDefault.DASH_BOARD:
        router.push('/sites/[id]/dashboard', `/sites/${id}/dashboard`);
        break;
      case SideBarDefault.CLICK_EVENT:
        router.push('/sites/[id]/click', `/sites/${id}/click`);
        break;
      case SideBarDefault.HOVER_EVENT:
        router.push('/sites/[id]/hover', `/sites/${id}/hover`);
        break;
      case SideBarDefault.CONTENT_READING:
        router.push(
          '/sites/[id]/content-reading',
          `/sites/${id}/content-reading`,
        );
        break;
      case SideBarDefault.CONVERSION_RATE:
        router.push(
          '/sites/[id]/conversion-rate',
          `/sites/${id}/conversion-rate`,
        );
        break;
    }
  };
  return (
    <Layout.Sider width={200} theme="dark" breakpoint="md">
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={[sideBarActive]}
        className="h-full border-r-0"
        style={{
          background: 'rgb(38,29,23)',
          background:
            'linear-gradient(180deg, rgba(38,29,23,1) 0%, rgba(34,17,41,1) 100%)',
        }}
      >
        <div
          style={{ height: 150 }}
          className="flex justify-center items-center"
        >
          <img src="/icon.png" width="40%" />
        </div>
        <Menu.Item
          key={SideBarDefault.DASH_BOARD}
          onClick={() => handleOnClick(SideBarDefault.DASH_BOARD)}
        >
          <div className="flex items-center">
            <AppstoreOutlined />
            <span>Dashboard</span>
          </div>
        </Menu.Item>
        <Menu.ItemGroup title="Analytics">
          {menus.map(({ key, icon, name }) => (
            <Menu.Item key={key} onClick={() => handleOnClick(key)}>
              <div className="flex items-center">
                {icon}
                <span>{name}</span>
              </div>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </Menu>
    </Layout.Sider>
  );
};
