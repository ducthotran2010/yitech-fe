import { Typography, Breadcrumb } from 'antd';

import { SideBarDefault } from '../../../../component/sites/side-bar';
import { HeatmapList } from '../../../../component/sites/heatmap-list/heatmap-list';
import { SkeletonPage } from '../../../../component/sites/skeleton-page/skeleton-page';
import { withAuth } from '../../../../component/user/with-auth';

const Click = ({ id }) => {
  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Heatmap Tracking</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2}>Heatmap Tracking</Typography.Title>
      <HeatmapList />
    </SkeletonPage>
  );
};

Click.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default withAuth(Click);
