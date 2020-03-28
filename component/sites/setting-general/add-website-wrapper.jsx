import { Button, Modal, Input, message } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { FooterModal } from '../../footer-modal';
import { getAccessToken } from '../../../utils/account-utils';

export const AddWebsiteWrapper = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domainURL, setDomainURL] = useState('');
  const [error, setError] = useState('');

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
