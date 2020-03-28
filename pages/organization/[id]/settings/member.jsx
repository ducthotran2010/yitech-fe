import React, { useEffect, useState } from 'react';
import { Typography, Popover, Menu, Button, Table, Breadcrumb } from 'antd';

import { HeaderSkeletonPage } from '../../../../component/sites/header-skeleton-page';
import { SideBarDefault } from '../../../../component/sites/side-bar';
import { MemberList } from '../../../../component/sites/setting-member/member-list';

const { Title } = Typography;

const Member = ({ id }) => {
  return (
    <HeaderSkeletonPage
      id={id}
      sectionName="Setting Member"
      sideBarActive={SideBarDefault.SETTING_MEMBER}
    >
      <Breadcrumb>
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
        <Breadcrumb.Item>Member</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>Member</Title>
      <MemberList id={id} />
    </HeaderSkeletonPage>
  );
};

Member.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Member;
