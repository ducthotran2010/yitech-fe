import { Layout, Menu } from 'antd';
import { useRouter } from 'next/router';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

export const SideBarDefault = {
  DASH_BOARD: 'DASH_BOARD',
  CLICK_EVENT: 'CLICK_EVENT',
  HOVER_EVENT: 'HOVER_EVENT',
  CONTENT_READING: 'CONTENT_READING',
  CONVERSION_RATE: 'CONVERSION_RATE',
};

export const SideBar = ({ id, collapsed, sideBarActive }) => {
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
    <Layout.Sider
      width={300}
      collapsed={collapsed}
      collapsible
      theme="dark"
      breakpoint="md"
    >
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={[sideBarActive]}
        className="h-full border-r-0"
      >
        <Menu.Item
          key={SideBarDefault.DASH_BOARD}
          onClick={() => handleOnClick(SideBarDefault.DASH_BOARD)}
        >
          <DesktopOutlined />
          <span>Dashboard</span>
        </Menu.Item>
        <Menu.ItemGroup title="Tracking Data">
          <Menu.Item
            key={SideBarDefault.CLICK_EVENT}
            onClick={() => handleOnClick(SideBarDefault.CLICK_EVENT)}
          >
            <DesktopOutlined />
            <span>Click Event</span>
          </Menu.Item>
          <Menu.Item
            key={SideBarDefault.HOVER_EVENT}
            onClick={() => handleOnClick(SideBarDefault.HOVER_EVENT)}
          >
            <DesktopOutlined />
            <span>Hover Event</span>
          </Menu.Item>
          <Menu.Item
            key={SideBarDefault.CONTENT_READING}
            onClick={() => handleOnClick(SideBarDefault.CONTENT_READING)}
          >
            <DesktopOutlined />

            <span>Content Reading</span>
          </Menu.Item>
          <Menu.Item
            key={SideBarDefault.CONVERSION_RATE}
            onClick={() => handleOnClick(SideBarDefault.CONVERSION_RATE)}
          >
            Conversion Rate
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Layout.Sider>
  );
};
