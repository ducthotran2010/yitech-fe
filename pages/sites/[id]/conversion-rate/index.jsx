<<<<<<< HEAD
import { Typography, Breadcrumb } from 'antd';

import { SideBarDefault } from '../../../../component/sites/side-bar';
import { FunnelList } from '../../../../component/sites/funnel-list';
import { SkeletonPage } from '../../../../component/sites/skeleton-page';

const Funnel = ({ id }) => (
  <SkeletonPage id={id} sideBarActive={SideBarDefault.CONVERSION_RATE}>
    <Breadcrumb>
      <Breadcrumb.Item>Analytics</Breadcrumb.Item>
      <Breadcrumb.Item>Funnel Tracking</Breadcrumb.Item>
      <Breadcrumb.Item>All</Breadcrumb.Item>
    </Breadcrumb>

    <Typography.Title level={2}>Funnel Tracking</Typography.Title>
    <FunnelList />
  </SkeletonPage>
);

Funnel.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Funnel;
=======
import {
    Typography,
    Breadcrumb
  } from "antd";
  import { useState,useEffect } from "react";
  
  import { SideBar, SideBarDefault } from "../../../../component/sites/side-bar";
  import { FunnelList  } from "../../../../component/sites/funnel-list";
  import { SkeletonPage } from "../../../../component/sites/skeleton-page";
  
  
  const Funnel = ({ id } ) => {
    //========================================================
  
    return (
      <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
        <Breadcrumb>
          <Breadcrumb.Item>Analytics</Breadcrumb.Item>
          <Breadcrumb.Item>Funnel Tracking</Breadcrumb.Item>
          <Breadcrumb.Item>All</Breadcrumb.Item>
        </Breadcrumb>
  
        <Typography.Title level={2}>Funnel Tracking</Typography.Title>
  
        
        <FunnelList />
      </SkeletonPage>
    );
  };
  
  Funnel.getInitialProps = ({ query: { id } }) => {
    return { id };
  };
  
  export default Funnel;
  
>>>>>>> 3876d11b375b46595dcc65f16651b5d44db97719
