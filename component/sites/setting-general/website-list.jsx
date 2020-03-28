import moment from 'moment';
import { Table, Button, Popover, Menu, Typography, Breadcrumb } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';

import { useAccountContext } from '../../profile/profile-context';
import { AddWebsiteWrapper } from './add-website-wrapper';

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

export const WebsiteList = () => {
  const { setting } = useAccountContext();
  const dataSource =
    setting && setting.activeOrganization
      ? setting.activeOrganization.websites
      : [];
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
