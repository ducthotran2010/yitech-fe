import { Breadcrumb, Typography, Layout, Button, Menu } from 'antd';
import { useRouter } from 'next/router';

import { SideBar, SideBarDefault } from '../../../../component/sites/side-bar';

const ClickStatistic = ({ id, trackID }) => {
  const router = useRouter();
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push(i);
  }

  return (
    <Layout className="h-screen flex flex-row">
      <SideBar id={id} sideBarActive={SideBarDefault.CLICK_EVENT} />
      <Layout.Sider
        collapsible
        collapsedWidth={0}
        zeroWidthTriggerStyle={{ bottom: 0, top: 'auto' }}
        defaultCollapsed={true}
        width={150}
        theme="dark"
      >
        <Menu
          mode="inline"
          theme="light"
          className="h-screen overflow-y-auto border-r-0"
          defaultSelectedKeys={[trackID]}
        >
          {data.map(trackID => (
            <Menu.Item
              key={trackID}
              onClick={() =>
                router.push(
                  '/sites/[id]/click/[trackID]',
                  `/sites/${id}/click/${trackID}`,
                )
              }
            >
              Product {trackID}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout className="h-full flex-1 p-8 overflow-y-auto ">
        <Breadcrumb>
          <Breadcrumb.Item>Analytics</Breadcrumb.Item>
          <Breadcrumb.Item>Click Tracking</Breadcrumb.Item>
          <Breadcrumb.Item>Product {trackID}</Breadcrumb.Item>
        </Breadcrumb>

        <Typography.Title level={2}>Product {trackID}</Typography.Title>
      </Layout>
    </Layout>
  );
};

ClickStatistic.getInitialProps = ({ query: { id, trackID } }) => {
  return { id, trackID };
};

export default ClickStatistic;
