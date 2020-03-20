import { Breadcrumb, Typography, Layout, Tabs, Menu } from 'antd';

import { SideBarDefault } from '../../../../component/sites/side-bar';
import { HeatmapTabs } from '../../../../component/sites/heatmap-tabs/heatmap-tabs';
import { SkeletonPage } from '../../../../component/sites/skeleton-page';
import { getHeatmapDetail } from '../../../../common/query-lib/heatmap-data/get-heatmap-detail';
import { getAccessTokenCtx } from '../../../../utils/account-utils';
import { getNextMidnight, getMidnight } from '../../../../utils/date-utils';

const Statistic = ({ id, trackID, detail: initDetail }) => {
  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Click Tracking</Breadcrumb.Item>
        <Breadcrumb.Item>Product {trackID}</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2}>Product {trackID}</Typography.Title>

      <div className="bg-white">
        <HeatmapTabs id={id} trackID={trackID} />
      </div>
    </SkeletonPage>
  );
};

Statistic.getInitialProps = ({ query: { id, trackID } }) => {
  return { id, trackID };
};

export default Statistic;
