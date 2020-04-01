import moment from 'moment';
import { Table, Button, Popover, Menu, message } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import { useAccountContext } from '../../profile/profile-context';
import { AddWebsiteWrapper } from './add-website-wrapper';
import { deleteWebsite } from '../../../common/query-lib/website/delete-website';
import { getAccessToken } from '../../../utils/account-utils';

export const WebsiteList = () => {
  const router = useRouter();
  const { setting, profile, setProfile } = useAccountContext();
  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const dataSource = activeOrganization ? activeOrganization.websites : [];

  const handleDeleteWebsite = async ({ webID, webUrl }) => {
    const token = getAccessToken();
    try {
      const response = await deleteWebsite({ webID, token });
      if (response.status === 200 || response.status === 304) {
        let newProfile = profile;
        newProfile.organizations = newProfile.organizations.map(
          organization => {
            organization.websites = organization.websites.filter(
              ({ webID: currentWebID }) => currentWebID !== webID,
            );
            return organization;
          },
        );

        setProfile({ ...newProfile });
        message.success(`Remove website ${webUrl} successfully`);
      }
    } catch (error) {
      message.error(`Could not remove website ${webUrl}`);
    }
  };

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
      render: (_, { webID, webUrl }) => (
        <Popover
          overlayClassName="custom-popover"
          content={
            <Menu selectable={false} mode="inline" className="border-r-0">
              <Menu.Item onClick={() => handleDeleteWebsite({ webID, webUrl })}>
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
