import { useEffect } from 'react';
import { Table } from 'antd';

import { getAccessToken } from '../../../utils/account-utils';
import { getUser } from '../../../common/query-lib/user/get-user';
import { AddOrganizationModal } from './add-organization-modal';

const dataSource = [
  {
    key: '1',
    name: 'Tap Doan Huy Map',
  },
  {
    key: '2',
    name: 'Web cua Don Dai Ca',
  },
  {
    key: '3',
    name: 'Orga 3',
  },
];

const columns = [
  {
    title: 'Organization Name',
    dataIndex: 'name',
    key: 'name',
    editable: true,
    render: title => <a>{title}</a>,
  },
];

export const OrganizationList = () => {
  const fetchData = async () => {
    const token = getAccessToken();
    try {
      const response = await getUser({ token });
      if (response.status === 200 || response.status === 304) {
        console.log(response.data);
        console.log(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
