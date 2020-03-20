import React, { useEffect } from 'react';

import { Typography, Popover, Menu, Button, Table } from 'antd';
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import moment from 'moment';

import { SkeletonPageWithoutWebSection } from '../../../../component/sites/skeleton-page-without-web-section';
import { SideBarDefault } from '../../../../component/sites/side-bar';
import { getOrganizationMembers } from '../../../../common/query-lib/organization/get-organization-members';
import { getAccessToken } from '../../../../utils/account-utils';
import { useAccountContext } from '../../../../component/profile/profile-context';

const { Title } = Typography;

const columns = [
  {
    title: "Fullname",
    dataIndex: "fullName",
    key: "fullName"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "Joint Date",
    dataIndex: "jointDate",
    key: "jointDate"
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role"
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
          icon={<MoreOutlined style={{ display: "block" }} />}
        />
      </Popover>
    )
  }
];

const Member = ({ organizationID }) => {
  const { setting, setSetting } = useAccountContext();

  const fetchOrganizationMembers = async () => {
    try {
      const token = getAccessToken();
      const response = await getOrganizationMembers({ organizationID, token });

      if (response.status == 304 || response.status == 200) {
        let members = response.data;

        members = members.map(member => ({
          key: member.userID,
          fullName: member.fullName,
          email: member.email,
          jointDate: moment(member.dayJoin).format('DD/MM/YYYY'),
          role: member.role,
        }));

        setSetting({
          members,
          ...setting,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrganizationMembers();
  }, []);

  const dataSource = setting && setting.members
    ? setting.members
    : [];

  return (
    <SkeletonPageWithoutWebSection sideBarActive={SideBarDefault.SETTING_MEMBER}>
      Member
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
        pagination={{ position: "both" }}
        columns={columns}
        dataSource={dataSource}
      ></Table>
    </SkeletonPageWithoutWebSection>
  );
};

Member.getInitialProps = ({ query: { id } }) => {
  return { organizationID: id };
};

export default Member;
