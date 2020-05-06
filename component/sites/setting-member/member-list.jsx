import React, { useEffect, useState } from 'react';

import { Popover, Menu, Button, Table, Breadcrumb, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import moment from 'moment';

import { getOrganizationMembers } from '../../../common/query-lib/organization/get-organization-members';
import { getAccessToken } from '../../../utils/account-utils';
import { ROLE } from '../../../common/role';
import { AddMemberWrapper } from './add-member-wrapper';
import { uninvited } from '../../../common/query-lib/member/uninvite';
import { useAccountContext } from '../../profile/profile-context';
import { changeRole } from '../../../common/query-lib/member/change-role';

export const MemberList = ({ id }) => {
  const { profile, setting } = useAccountContext();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const userRole = activeOrganization ? activeOrganization.userRole : undefined;

  const handleDeleteMember = async ({ email, name }) => {
    const token = getAccessToken();
    try {
      const response = await uninvited({ email, organizationID: id, token });
      if (response.status === 200 || response.status === 304) {
        message.success(`Remove ${name} successfully`);
        setMembers(
          members.filter(({ email: currentEmail }) => currentEmail !== email),
        );
      }
    } catch (error) {
      message.error(`Could not remove ${name}`);
    }
  };

  const handleChangeRole = async ({ email, name, role }) => {
    const token = getAccessToken();
    try {
      const response = await changeRole({ email, organizationID: id, token });
      if (response.status === 200 || response.status === 304) {
      message.success(
        `${name} now is a ${
          role == ROLE[1].value ? ROLE[2].display : ROLE[1].display
        }`,
      );
      setMembers(
        members.map(member =>
          member.email !== email
            ? member
            : {
                ...member,
                role: role == ROLE[1].value ? ROLE[2].value : ROLE[1].value,
              },
        ),
      );
      }
    } catch (error) {
      message.error(
        `Could not change role ${name} to ${
          role == ROLE[1].value ? ROLE[2].display : ROLE[1].display
        }`,
      );
    }
  };

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
      title: 'Joined At',
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
  ];

  if (userRole == ROLE[0].value) {
    columns.push({
      render: (_, { role, email, fullName }) =>
        role != ROLE[0].value ? (
          <Popover
            overlayClassName="custom-popover"
            content={
              <Menu selectable={false} mode="inline" className="border-r-0">
                <Menu.Item
                  onClick={() =>
                    handleChangeRole({ email, name: fullName, role })
                  }
                >
                  Change role to be a&nbsp;
                  {role == ROLE[1].value ? ROLE[2].display : ROLE[1].display}
                </Menu.Item>
                <Menu.Item
                  onClick={() => handleDeleteMember({ email, name: fullName })}
                >
                  Remove
                </Menu.Item>
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
    });
  }

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
      <AddMemberWrapper members={members} setMembers={setMembers}/>
      <Table
        pagination={{ position: 'both' }}
        columns={columns}
        dataSource={members}
        loading={loading}
      />
    </>
  );
};
