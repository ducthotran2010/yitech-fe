import React, { useEffect, useState } from 'react';

import { Popover, Menu, Button, Table, Breadcrumb } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import moment from 'moment';

import { getOrganizationMembers } from '../../../common/query-lib/organization/get-organization-members';
import { getAccessToken } from '../../../utils/account-utils';
import { ROLE } from '../../../common/role';
import { AddMemberWrapper } from './add-member-wrapper';

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
    render: role => {
      const found = ROLE.find(({ value }) => value == parseInt(role, 10));
      return found ? found.display : role;
    },
  },
  {
    render: (_, { role }) =>
      role != ROLE[0].value ? (
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
      ) : (
        <Button
          disabled
          type="normal"
          shape="circle"
          className="border-0"
          icon={<MoreOutlined style={{ display: 'block' }} />}
        />
      ),
  },
];

export const MemberList = ({ id }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrganizationMembers = async () => {
    setLoading(true);
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
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizationMembers();
  }, []);

  return (
    <>
      <AddMemberWrapper />
      <Table
        pagination={{ position: 'both' }}
        columns={columns}
        dataSource={members}
        loading={loading}
      />
    </>
  );
};
