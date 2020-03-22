import { Breadcrumb, Typography } from 'antd';

import { InstallAppView } from '../../../component/sites/install-app-view';
import { SideBarDefault } from '../../../component/sites/side-bar';
import { SkeletonPage } from '../../../component/sites/skeleton-page/skeleton-page';

const Dashboard = ({ id }) => {
  const verified = false;
  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.DASH_BOARD}>
      <Breadcrumb>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item>Install application</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2}>Dashboard</Typography.Title>

      {verified ? <InstallAppView webID={id} /> : <InstallAppView webID={id} />}
    </SkeletonPage>
  );
};

Dashboard.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Dashboard;
