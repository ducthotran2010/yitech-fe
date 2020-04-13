import { useState } from 'react';
import { Typography, Layout, Breadcrumb } from 'antd';

import { SideBarDefault } from '../../../../component/sites/side-bar';
import { SkeletonPage } from '../../../../component/sites/skeleton-page/skeleton-page';
import { FunnelTabs } from '../../../../component/sites/funnel-tabs/funnel-tabs';
import { withAuth } from '../../../../component/user/with-auth';

const ConversionRate = ({ id, funnelID }) => {
  const [name, setName] = useState('Funnel');
  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.CONVERSION_RATE}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Funnel Tracking</Breadcrumb.Item>
        <Breadcrumb.Item>Funnel Detail</Breadcrumb.Item>
      </Breadcrumb>
      <Typography.Title level={2} className="mb-4">
        {name}
      </Typography.Title>
      <FunnelTabs id={id} trackID={funnelID} setName={setName} />
    </SkeletonPage>
  );
};

ConversionRate.getInitialProps = ({ query: { id, funnelID } }) => {
  return { id, funnelID };
};

export default withAuth(ConversionRate);
