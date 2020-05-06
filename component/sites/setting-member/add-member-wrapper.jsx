import moment from 'moment';
import { Button, Modal, Input, message, Select } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { FooterModal } from '../../footer-modal';
import { getAccessToken } from '../../../utils/account-utils';
import { ROLE } from '../../../common/role';
import { useAccountContext } from '../../profile/profile-context';
import { invited } from '../../../common/query-lib/member/invite';

export const AddMemberWrapper = ({ members, setMembers }) => {
  const { setting } = useAccountContext();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domainURL, setDomainURL] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState(0);

  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const userRole = activeOrganization ? activeOrganization.userRole : undefined;
  const ValidateEmail = mail => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  };

  const handleAddTracking = async () => {
    const token = getAccessToken();
    setLoading(true);
    setError('');
    try {
      if (domainURL == '') {
        setError('Please enter member email');
        setVisible(false);
        setLoading(false);
      } else if (!ValidateEmail(domainURL)) {
        setError('Email is wrong format');
        return;
      } else if (role == 0) {
        setError('Please select role for new member');
        return;
      }

      const response = await invited({
        email: domainURL,
        organizationID: activeOrganization.organizationID,
        roleID: role,
        token,
      });

      if (response.status === 200 || response.status === 304) {
        message.success(`Invite successfully`);
        const data = response.data;
        const member = {
          key: data.userID,
          fullName: data.fullName,
          email: data.email,
          joinAt: moment(data.dayJoin * 1000).format('DD/MM/YYYY'),
          role: data.role,
        };
        setMembers([...members, member]);
        setVisible(false);
        message.success(`Invited`);
      }
    } catch (error) {
      if (error.message.includes('404')) {
        message.info(
          'Member is not a user. sending invite email successfully.'
        );
        setVisible(false);
      } else message.error(`Could not invite`);
    } finally {
      setLoading(false);
    }
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
          onChange={event => setDomainURL(event.target.value)}
        />

        <Select
          className="w-full mt-4"
          size="large"
          placeholder="Select role"
          onChange={event => setRole(event)}
        >
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
