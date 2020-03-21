import React, { useEffect, useState } from 'react';

import { Typography, Popover, Menu, Button, Table, Breadcrumb } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import moment from 'moment';

import { HeaderSkeletonPage } from '../../../../component/sites/header-skeleton-page';
import { SideBarDefault } from '../../../../component/sites/side-bar';
import { getOrganizationMembers } from '../../../../common/query-lib/organization/get-organization-members';
import { getAccessToken } from '../../../../utils/account-utils';

const { Title } = Typography;

const columns = [
  {
    title: 'Fullname',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Join At',
    dataIndex: 'joinAt',
    key: 'joinAt',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
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

const Member = ({ id }) => {
  const [members, setMembers] = useState([]);

  const fetchOrganizationMembers = async () => {
    try {
      const token = getAccessToken();
      const response = await getOrganizationMembers({
        organizationID: id,
        token,
      });

      if (response.status == 304 || response.status == 200) {
        const data = response.data;

        setMembers(
          data.map(member => ({
            key: member.userID,
            fullName: member.fullName,
            email: member.email,
            joinAt: moment(member.dayJoin * 1000).format('DD/MM/YYYY'),
            role: member.role,
          })),
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrganizationMembers();
  }, []);

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
      <div className="relative z-10">
        <Button type="primary" className="absolute" style={{ bottom: -50 }}>
          <div className="flex items-center">
            <PlusOutlined className="pr-2" />
            Invite Member
          </div>
        </Button>
      </div>
      <Table
        pagination={{ position: 'both' }}
        columns={columns}
        dataSource={members}
      ></Table>
    </HeaderSkeletonPage>
  );
};

Member.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Member;
