import React, { useEffect } from 'react';

import { Table, Button, Popover, Menu, Typography } from 'antd';
import moment from 'moment';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';

import { SkeletonPageWithoutWebSection } from '../../../../component/sites/skeleton-page-without-web-section';
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
  const { profile, setProfile, setting, setSetting } = useAccountContext();

  useEffect(() => {
    if (profile) {
      let websites = [];

      profile.organizations.forEach(organization => {
        if (organization.organizationID === id) {
          organization.websites.forEach(website => {
            websites.push({
              key: website.webID,
              domainUrl: website.webUrl,
              createdDate: moment(website.createdAt).format('DD/MM/YYYY'),
              createdBy: website.authorName,
            });
          });
        }
      });

      setSetting({
        websites,
        ...setting,
      });
    }
  }, [profile]);

  const dataSource = profile && setting
    ? setting.websites
    : [];

  return (
    <SkeletonPageWithoutWebSection
      sideBarActive={SideBarDefault.SETTING_GENERAL}
    >
      General
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
    </SkeletonPageWithoutWebSection>
  );
};

General.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default General;
