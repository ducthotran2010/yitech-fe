import { Button, Modal, Input, message, Select } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { FooterModal } from '../../footer-modal';
import { getAccessToken } from '../../../utils/account-utils';
import { ROLE } from '../../../common/role';
import { useAccountContext } from '../../profile/profile-context';

export const AddMemberWrapper = () => {
  const { setting } = useAccountContext();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domainURL, setDomainURL] = useState('');
  const [error, setError] = useState('');

  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const userRole = activeOrganization ? activeOrganization.userRole : undefined;

  const handleAddTracking = async () => {
    const token = getAccessToken();
    setLoading(true);
    setError('');
    message.info('Nothing happen');
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Add Member"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <FooterModal
            onCancel={() => setVisible(false)}
            onSubmit={handleAddTracking}
            loading={loading}
          />
        }
      >
        <Input
          size="large"
          placeholder="Enter email"
          value={domainURL}
          onChange={(event) => setDomainURL(event.target.value)}
        />

        <Select className="w-full mt-4" size="large" placeholder="Select role">
          {ROLE.slice(1).map(({ display, value }) => (
            <Select.Option key={`${value}-${display}`} value={value}>
              {display}
            </Select.Option>
          ))}
        </Select>
        {error && (
          <span className="block mb-4 text-red-600 text-center">{error}</span>
        )}
      </Modal>

      {userRole == ROLE[0].value && (
        <div className="relative z-10">
          <Button
            type="primary"
            className="absolute"
            style={{ bottom: -50 }}
            onClick={() => setVisible(true)}
          >
            <div className="flex items-center">
              <PlusOutlined className="pr-2" />
              Invite Member
            </div>
          </Button>
        </div>
      )}
    </>
  );
};
