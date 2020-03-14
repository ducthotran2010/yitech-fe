import { Breadcrumb, Typography, Layout, Tabs, Menu } from 'antd';
import { useRouter } from 'next/router';

import { SideBarDefault } from '../../../../component/sites/side-bar';
import { HeatmapTabs } from '../../../../component/sites/heatmap-tabs/heatmap-tabs';
import { SkeletonPage } from '../../../../component/sites/skeleton-page';
import { getHeatmapDetail } from '../../../../common/query-lib/heatmap-data/get-heatmap-detail';
import { getAccessTokenCtx } from '../../../../utils/account-utils';

const ClickStatistic = ({ id, trackID, detail }) => {
  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Click Tracking</Breadcrumb.Item>
        <Breadcrumb.Item>Product {trackID}</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2}>Product {trackID}</Typography.Title>

      {detail && (
        <div className="bg-white">
          <HeatmapTabs detail={detail} />
        </div>
      )}
    </SkeletonPage>
  );
};

ClickStatistic.getInitialProps = async ctx => {
  const {
    query: { id, trackID },
  } = ctx;

  try {
    const token = getAccessTokenCtx(ctx);
    const response = await getHeatmapDetail(id, trackID, token);
    if (response.status === 200 || response.status === 304) {
      return { id, trackID, detail: response.data };
    }
    return { id, trackID };
  } catch (_) {
    return { id, trackID };
  }
};

export default ClickStatistic;
