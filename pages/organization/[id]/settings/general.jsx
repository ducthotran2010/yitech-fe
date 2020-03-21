import React, { useEffect } from 'react';

import { Table, Button, Popover, Menu, Typography, Breadcrumb } from 'antd';
import moment from 'moment';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';

import { HeaderSkeletonPage } from '../../../../component/sites/header-skeleton-page';
import { SideBarDefault } from '../../../../component/sites/side-bar';
import { useAccountContext } from '../../../../component/profile/profile-context';

const { Title } = Typography;

const columns = [
  {
    title: 'Domain URL',
    dataIndex: 'webUrl',
    key: 'webUrl',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdDate',
    render: createdAt => moment(createdAt * 1000).format('DD/MM/YYYY'),
  },
  {
    title: 'Created By',
    dataIndex: 'authorName',
    key: 'authorName',
  },
  {
    render: () => (
      <Popover
        overlayClassName="custom-popover"
        content={
          <Menu mode="inline" className="border-r-0">
            <Menu.Item>Remove</Menu.Item>
          </Menu>
        }
      >
        <Button
          onClick={event => event.stopPropagation()}
          type="normal"
          shape="circle"
          className="border-0"
          icon={<MoreOutlined style={{ display: 'block' }} />}
        />
      </Popover>
    ),
  },
];

const General = ({ id }) => {
  const { setting } = useAccountContext();
  const dataSource =
    setting && setting.activeOrganization
      ? setting.activeOrganization.websites
      : [];

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
      <div className="relative z-10">
        <Button type="primary" className="absolute" style={{ bottom: -50 }}>
          <div className="flex items-center">
            <PlusOutlined className="pr-2" />
            Add New Website
          </div>
        </Button>
      </div>
      <Table
        columns={columns}
        rowKey={record => record.webID}
        dataSource={dataSource}
        pagination={{ position: 'both' }}
      />
    </HeaderSkeletonPage>
  );
};

General.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default General;
