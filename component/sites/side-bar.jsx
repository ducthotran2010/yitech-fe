import { Layout, Menu, Card, Popover, Button, Select, Divider } from 'antd';
import { useRouter } from 'next/router';
import {
  DesktopOutlined,
  AppstoreOutlined,
  DoubleRightOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import Head from 'next/head';

export const SideBarDefault = {
  DASH_BOARD: 'DASH_BOARD',
  HEATMAPS: 'HEATMAPS',
  CONVERSION_RATE: 'CONVERSION_RATE',
  INCOMING_FEEDBACK: 'INCOMING_FEEDBACK',
};

const menus = [
  {
    key: SideBarDefault.HEATMAPS,
    icon: <DesktopOutlined />,
    name: 'Heatmaps',
  },
  {
    key: SideBarDefault.CONVERSION_RATE,
    icon: <DesktopOutlined />,
    name: 'Conversion Rate',
  },
  {
    key: SideBarDefault.INCOMING_FEEDBACK,
    icon: <DesktopOutlined />,
    name: 'Incoming Feedback',
  },
];

export const SideBar = ({ id, sideBarActive }) => {
  const router = useRouter();

  const handleOnClick = selection => {
    switch (selection) {
      case SideBarDefault.DASH_BOARD:
        router.push('/sites/[id]/dashboard', `/sites/${id}/dashboard`);
        break;
      case SideBarDefault.HEATMAPS:
        router.push('/sites/[id]/heatmaps', `/sites/${id}/heatmaps`);
        break;
      case SideBarDefault.CONVERSION_RATE:
        router.push(
          '/sites/[id]/conversion-rate',
          `/sites/${id}/conversion-rate`,
        );
        break;
      case SideBarDefault.INCOMING_FEEDBACK:
        router.push(
          '/sites/[id]/incoming-feedback',
          `/sites/${id}/incoming-feedback`,
        );
        break;
    }
  };

  return (
    <Layout.Sider width={200} theme="dark" breakpoint="md">
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
        `}</style>
      </Head>
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

        <Menu.Item>
          <Popover
            placement="bottomRight"
            content={
              <Menu theme="light" mode="vertical" style={{ minWidth: 250 }}>
                <Menu.Item>Loathai</Menu.Item>
                <Menu.Divider />
                <Menu.Item>Maytinh</Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                  <div className="flex items-center">
                    <PlusOutlined />
                    <span>Add more</span>
                  </div>
                </Menu.Item>
              </Menu>
            }
            overlayClassName="custom-popover"
            trigger="click"
          >
            <div className="flex items-center">
              <DoubleRightOutlined />
              <span>Loathai</span>
            </div>
          </Popover>
        </Menu.Item>
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
