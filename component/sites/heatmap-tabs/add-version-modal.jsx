import { useState, useRef } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { createTrackingInfo } from '../../../common/query-lib/heatmap-data/create-tracking-info';
import { getAccessToken } from '../../../utils/account-utils';
import { useAccountContext } from '../../profile/profile-context';
import { SelectTypeURL } from '../select-type-url';
import { FooterModal } from '../../footer-modal';
import { TYPE_URL } from '../../../common/type-url';
import { createVersion } from '../../../common/query-lib/heatmap-data/create-version';

export const AddVersionModal = ({ trackID, visible, setVisible, addVersion, typeUrl, trackingUrl }) => {
  const formRef = useRef(null);

  const [captureUrl, setCaptureURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddVersion = async () => {
    const token = getAccessToken();
    setLoading(true);
    setError('');

    try {
      formRef.current.submit();
      if (captureUrl == '') {
        return;
      }
      const response = await createVersion(trackID, captureUrl, token);

      if (response.status === 200 || response.status === 304) {
        message.success('Add version success!');
        addTracking(response.data);
        setVisible(false);
        return;
      }

      setError('Add version failed!');
    } catch (error) {
      setError('Sorry, you can not create now, please try again later!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        title="Add Version"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <FooterModal
            onCancel={() => setVisible(false)}
            onSubmit={handleAddVersion}
            loading={loading}
          />
        }
      >
        {TYPE_URL.MATCH.key !== typeUrl && (
          <Form name="basic" ref={formRef}>
            <Form.Item
              name="captureUrl"
              rules={[
                { required: true, message: 'Please input URL to capture!' },
              ]}
            >
              <Input
                size="large"
                value={captureUrl}
                placeholder="Enter capture URL"
                onChange={event => setCaptureURL(event.currentTarget.value)}
              />
            </Form.Item>


            {error && (
              <span className="block mb-4 text-red-600 text-center">{error}</span>
            )}
          </Form>
        )}
      </Modal>
    </>
  );
};
