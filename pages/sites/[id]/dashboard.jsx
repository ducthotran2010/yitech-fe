import { Typography, Layout } from 'antd';
import { InstallAppView } from '../../../component/sites/install-app-view';
import { SideBar, SideBarDefault } from '../../../component/sites/side-bar';

const contentStyle = {
  width: 960,
};

const Dashboard = ({ id }) => {
  const verified = false;
  return (
    <Layout className="h-screen flex flex-row">
      <SideBar id={id} sideBarActive={SideBarDefault.DASH_BOARD} />
      <Layout className="h-full flex-1 p-8">
        <Layout.Content
          className="bg-white m-auto py-8 px-16"
          style={contentStyle}
        >
          <Typography.Title>Dashboard</Typography.Title>
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
