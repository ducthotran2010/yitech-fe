import { Typography, Layout, Breadcrumb } from 'antd';

import { SideBarDefault } from '../../../../component/sites/side-bar';
import { SkeletonPage } from '../../../../component/sites/skeleton-page/skeleton-page';
import { FunnelTabs } from '../../../../component/sites/funnel-tabs/funnel-tabs';
import { useState } from 'react';

const ConversionRate = ({ id, funnelID }) => {
  const [name, setName] = useState('Funnel');
  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.CONVERSION_RATE}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Funnel Tracking</Breadcrumb.Item>
        <Breadcrumb.Item>Funnel Detail</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2} style={{ marginBottom: 4 }}>
        {name}
      </Typography.Title>
      <div className="bg-white">
        <FunnelTabs id={id} trackID={funnelID} setName={setName} />
      </div>
    </SkeletonPage>
  );
};

ConversionRate.getInitialProps = ({ query: { id, funnelID } }) => {
  return { id, funnelID };
};

export default ConversionRate;
