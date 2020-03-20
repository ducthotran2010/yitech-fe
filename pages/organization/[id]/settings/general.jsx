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
    dataIndex: 'domainUrl',
    key: 'domainUrl',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'createdDate',
  },
  {
    title: 'Created By',
    dataIndex: 'createdBy',
    key: 'createdBy',
  },
  {
    render: () => (
      <Popover
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
  const { setting, setRoute } = useAccountContext();

  useEffect(() => {
    setRoute({ organizationID: id });
  }, [id]);

  const dataSource =
    setting && setting.activeOrganization
      ? setting.activeOrganization.websites
      : [];

  return (
    <HeaderSkeletonPage
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
        pagination={{ position: 'both' }}
        columns={columns}
        dataSource={dataSource}
      ></Table>
    </HeaderSkeletonPage>
  );
};

General.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default General;
