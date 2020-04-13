import { Button, Modal, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import classNames from 'classnames';

import { FooterModal } from '../../footer-modal';
import { getAccessToken } from '../../../utils/account-utils';
import { createWebsite } from '../../../common/query-lib/website/create-website';
import { useAccountContext } from '../../profile/profile-context';
import { ROLE } from '../../../common/role';

export const AddWebsiteWrapper = ({ organizationID, addWebsite }) => {
  const { setting, setSetting } = useAccountContext();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domainURL, setDomainURL] = useState('');
  const [error, setError] = useState('');

  const addWebsiteIntent = setting ? setting.addWebsite : undefined;
  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const userRole = activeOrganization ? activeOrganization.userRole : undefined;

  useEffect(() => {
    if (addWebsiteIntent) {
      setVisible(true);
      setSetting({ ...setting, addWebsite: false });
    }
  }, [addWebsiteIntent]);

  const handleAddTracking = async () => {
    setLoading(true);
    setError('');
    try {
      const token = getAccessToken();
      const response = await createWebsite({
        organizationID,
        domainUrl: domainURL,
        token,
      });
      if (
        response.status == 200 ||
        response.status === 304 ||
        response.status == 201
      ) {
        addWebsite(response.data);
        setVisible(false);
        message.success('Add new website success!');
      }
    } catch (error) {
      setError('Could not add new website');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Add Website"
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
          placeholder="Enter domain URL"
          value={domainURL}
          onChange={(event) => setDomainURL(event.target.value)}
        />

        {error && (
          <span className="block mt-4 text-red-600 text-center">{error}</span>
        )}
      </Modal>

      {userRole == ROLE[0].value && (
        <div className={classNames('relative', 'z-10')}>
          <Button
            type="primary"
            className="absolute"
            style={{ bottom: -50 }}
            onClick={() => setVisible(true)}
          >
            <div className="flex items-center">
              <PlusOutlined className="pr-2" />
              Website
            </div>
          </Button>
        </div>
      )}
    </>
  );
};
