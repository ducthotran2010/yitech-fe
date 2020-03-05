import { Typography, Layout } from 'antd';
import { InstallAppView } from '../../../component/install-app-view';
import { SideBar, SideBarDefault } from '../../../component/sites/side-bar';
import { useState } from 'react';

const contentStyle = {
  width: 960,
};

const Dashboard = ({ id }) => {
  const [collapsed, setCollapsed] = useState(true);
  const verified = false;
  return (
    <Layout className="min-h-screen flex flex-row">
      <SideBar
        id={id}
        collapsed={collapsed}
        sideBarActive={SideBarDefault.DASH_BOARD}
      />
      <Layout className="h-full flex-1 p-8">
        <Layout.Content
          className="bg-white m-auto py-8 px-16"
          style={contentStyle}
        >
          <Typography.Title>Dashboard</Typography.Title>
          <button onClick={()=> setCollapsed(!collapsed)}>ok</button>
          {verified ? <InstallAppView /> : <InstallAppView />}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

Dashboard.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Dashboard;
