import { Breadcrumb, Typography, Layout, Tabs, Menu } from 'antd';

import { SideBarDefault } from '../../../../component/sites/side-bar';
import { HeatmapTabs } from '../../../../component/sites/heatmap-tabs/heatmap-tabs';
import { SkeletonPage } from '../../../../component/sites/skeleton-page/skeleton-page';
import { useState } from 'react';
import { TYPE_URL } from '../../../../common/type-url';

const Statistic = ({ id, trackID, detail: initDetail }) => {
  const [trackingUrl, setTrackingUrl] = useState('');
  const [name, setName] = useState('');
  const [typeUrl, setTypeUrl] = useState('');
  const typeUrlKey = Object.keys(TYPE_URL).find(
    key => TYPE_URL[key].key === typeUrl,
  );
  const typeUrlDisplay = typeUrlKey ? TYPE_URL[typeUrlKey].display : typeUrl;

  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Heatmaps</Breadcrumb.Item>
        <Breadcrumb.Item>Heatmap Detail</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2} style={{ marginBottom: 4 }}>
        {name}
      </Typography.Title>

      <p className="text-gray-600 mb-4">
        URL {typeUrlDisplay.toLowerCase()}&nbsp;
        <span className="underline cursor-pointer">{trackingUrl}</span>
      </p>

      <div className="bg-white">
        <HeatmapTabs
          id={id}
          trackID={trackID}
          setName={setName}
          setTypeUrl={setTypeUrl}
          setTrackingUrl={setTrackingUrl}
        />
      </div>
    </SkeletonPage>
  );
};

Statistic.getInitialProps = ({ query: { id, trackID } }) => {
  return { id, trackID };
};

export default Statistic;
