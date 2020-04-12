import { useEffect } from 'react';
import { Table } from 'antd';
import { useRouter } from 'next/router';

import { AddOrganizationModal } from './add-organization-modal';
import { useAccountContext } from '../../profile/profile-context';
import { ROLE } from '../../../common/role';

export const OrganizationList = () => {
  const router = useRouter();
  const { profile } = useAccountContext();
  const dataSource = profile ? profile.organizations : undefined;

  const columns = [
    {
      title: 'Organization Name',
      dataIndex: 'organizationName',
      key: 'organizationID',
      render: (name, { organizationID }) => (
        <span
          className="hover:underline cursor-pointer"
          onClick={() =>
            router.push(
              '/organization/[id]/settings/general',
              `/organization/${organizationID}/settings/general`,
            )
          }
        >
          {name}
        </span>
      ),
    },
    {
      title: 'My role',
      dataIndex: 'userRole',
      key: 'userRole',
      render: role => {
        const found = ROLE.find(({ value }) => value == parseInt(role, 10));
        return found ? found.display : role;
      },
    },
    {
      title: 'Total websites',
      render: (_, { websites }) => websites.length,
    },
  ];

  console.log(dataSource);

  return (
    <>
      <AddOrganizationModal />
      <Table
        pagination={{ position: 'both' }}
        columns={columns}
        dataSource={dataSource}
      />
    </>
  );
};
