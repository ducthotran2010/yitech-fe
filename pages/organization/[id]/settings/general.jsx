import React, { useEffect } from 'react';

import { Typography, Breadcrumb } from 'antd';

import { HeaderSkeletonPage } from '../../../../component/sites/header-skeleton-page';
import { SideBarDefault } from '../../../../component/sites/side-bar';
import { WebsiteList } from '../../../../component/sites/setting-general/website-list';

const { Title } = Typography;

const General = ({ id }) => {
  return (
    <HeaderSkeletonPage
      id={id}
      sectionName="Setting General"
      sideBarActive={SideBarDefault.SETTING_GENERAL}
    >
      <Breadcrumb>
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
        <Breadcrumb.Item>General</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>General</Title>
      <WebsiteList />
    </HeaderSkeletonPage>
  );
};

General.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default General;
