import { Typography, Layout } from 'antd';

import { SideBar, SideBarDefault } from '../../../../component/sites/side-bar';
import { useState, useEffect } from 'react';
import { SkeletonPage } from '../../../../component/sites/skeleton-page';
import { FunnelTabs } from '../../../../component/sites/funnel-tabs/funnel-tabs';

const ConversionRate = ({ id, funnelID }) => {
  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.CONVERSION_RATE}>
      <Typography.Title level={2}>Funnel {funnelID}</Typography.Title>
      <div className="bg-white">
        <FunnelTabs />
      </div>
    </SkeletonPage>
  );
};

ConversionRate.getInitialProps = ({ query: { id, funnelID } }) => {
  return { id, funnelID };
};

export default ConversionRate;
