import { Breadcrumb, Typography, Layout, Tabs, Menu } from 'antd';

import { SideBarDefault } from '../../../../component/sites/side-bar';
import { HeatmapTabs } from '../../../../component/sites/heatmap-tabs/heatmap-tabs';
import { SkeletonPage } from '../../../../component/sites/skeleton-page';
import { getHeatmapDetail } from '../../../../common/query-lib/heatmap-data/get-heatmap-detail';
import { getAccessTokenCtx } from '../../../../utils/account-utils';
import { getNextMidnight, getMidnight } from '../../../../utils/date-utils';

const dummyData = {
  imageUrl:
    'https://cloudsub.blob.core.windows.net/images/webIDDhihi/trackingID.png',
  click: '[]',
  hover: '[]',
};

const Statistic = ({ id, trackID, detail }) => {
  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Click Tracking</Breadcrumb.Item>
        <Breadcrumb.Item>Product {trackID}</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2}>Product {trackID}</Typography.Title>

      {detail ? (
        <div className="bg-white">
          <HeatmapTabs detail={detail} />
        </div>
      ) : (
        <div className="bg-white">
          <HeatmapTabs detail={dummyData} />
        </div>
      )}
    </SkeletonPage>
  );
};

Statistic.getInitialProps = async ctx => {
  const {
    query: { id, trackID },
  } = ctx;

  try {
    const now = new Date();
    const toMidNight = getNextMidnight();
    const from = new Date().setYear(now.getYear() - 1 + 1900);
    const fromMidnight = getMidnight(from);

    const token = getAccessTokenCtx(ctx);
    const response = await getHeatmapDetail(
      id,
      trackID,
      fromMidnight.getTime() / 1000,
      toMidNight.getTime() / 1000,
      token,
    );
    if (response.status === 200 || response.status === 304) {
      return { id, trackID, detail: response.data };
    }
    return { id, trackID };
  } catch (e) {
    console.log(e);
    return { id, trackID };
  }
};

export default Statistic;
