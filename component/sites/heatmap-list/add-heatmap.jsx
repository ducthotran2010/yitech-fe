import { useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { createTrackingInfo } from '../../../common/query-lib/heatmap-data/create-tracking-info';
import { getAccessToken } from '../../../utils/account-utils';
import { useAccountContext } from '../../profile/profile-context';

export const AddHeapMap = ({ addTracking }) => {
  const { setting } = useAccountContext();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackingUrl, setTrackingURL] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const webID = activeWebsite ? activeWebsite.webID : undefined;

  const handleAddTracking = async () => {
    const token = getAccessToken();
    setLoading(true);
    setError('');

    try {
      const response = await createTrackingInfo(
        { name, trackingUrl, webID },
        token,
      );

      if (response.status === 200 || response.status === 304) {
        message.success('Add click tracking information success!');
        addTracking(response.data);
        setVisible(false);
        return;
      }

      setError('Add tracking Heatmap failed!');
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
        title="Add Heatmap Tracking"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handleAddTracking()}
          >
            Submit
          </Button>,
        ]}
      >
        <Form name="basic">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your click tracking name!',
              },
            ]}
          >
            <Input
              size="large"
              value={name}
              onChange={event => setName(event.currentTarget.value)}
              type="basic"
              placeholder="Enter your click tracking name"
            />
          </Form.Item>

          <Form.Item
            name="trackingUrl"
            rules={[
              { required: true, message: 'Please input your tracking url!' },
            ]}
          >
            <Input
              size="large"
              value={trackingUrl}
              onChange={event => setTrackingURL(event.currentTarget.value)}
              placeholder="Enter your tracking url"
            />
          </Form.Item>

          {error && (
            <span className="block mb-4 text-red-600 text-center">{error}</span>
          )}
        </Form>
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
            Tracking
          </div>
        </Button>
      </div>
    </>
  );
};
