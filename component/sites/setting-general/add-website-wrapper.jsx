import { Button, Modal, Input, message } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { FooterModal } from '../../footer-modal';
import { getAccessToken } from '../../../utils/account-utils';
import { createWebsite } from '../../../common/query-lib/website/create-website';

export const AddWebsiteWrapper = ({ organizationID, addWebsite }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domainURL, setDomainURL] = useState('');
  const [error, setError] = useState('');

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
          onChange={event => setDomainURL(event.target.value)}
        />

        {error && (
          <span className="block mt-4 text-red-600 text-center">{error}</span>
        )}
      </Modal>

      <div className="relative z-10">
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
    </>
  );
};
