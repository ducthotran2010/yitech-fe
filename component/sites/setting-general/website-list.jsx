import moment from 'moment';
import { Table, Button, Popover, Menu, Typography, Breadcrumb } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import { useAccountContext } from '../../profile/profile-context';
import { AddWebsiteWrapper } from './add-website-wrapper';

export const WebsiteList = () => {
  const router = useRouter();
  const { setting } = useAccountContext();
  const dataSource =
    setting && setting.activeOrganization
      ? setting.activeOrganization.websites
      : [];

  const columns = [
    {
      title: 'Domain URL',
      dataIndex: 'webUrl',
      key: 'webUrl',
      render: (text, { webID }) => (
        <span
          className="hover:underline cursor-pointer"
          onClick={() =>
            router.push('/sites/[id]/dashboard', `/sites/${webID}/dashboard`)
          }
        >
          {text}
        </span>
      ),
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

  return (
    <>
      <AddWebsiteWrapper />
      <Table
        columns={columns}
        rowKey={record => record.webID}
        dataSource={dataSource}
        pagination={{ position: 'both' }}
      />
    </>
  );
};
