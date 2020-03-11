import { Breadcrumb, Typography, Layout } from 'antd';
import { InstallAppView } from '../../../component/sites/install-app-view';
import { SideBar, SideBarDefault } from '../../../component/sites/side-bar';

const Dashboard = ({ id }) => {
  const verified = false;
  return (
    <Layout className="h-screen flex flex-row">
      <SideBar id={id} sideBarActive={SideBarDefault.DASH_BOARD} />
      <Layout className="h-full flex-1 p-8 pt-16 overflow-y-auto relative">
        <div className="absolute left-0 top-0 w-full shadow bg-white" style={{ height: 50}}></div>
        <Breadcrumb>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item>Install application</Breadcrumb.Item>
        </Breadcrumb>

        <Typography.Title level={2}>Dashboard</Typography.Title>

        <div className="bg-white py-4 px-8">
          {verified ? <InstallAppView /> : <InstallAppView />}
        </div>
      </Layout>
    </Layout>
  );
};

Dashboard.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Dashboard;
