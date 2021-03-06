import { useState, useRef } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { createTrackingInfo } from '../../../common/query-lib/heatmap-data/create-tracking-info';
import { getAccessToken } from '../../../utils/account-utils';
import { useAccountContext } from '../../profile/profile-context';
import { SelectTypeURL } from '../select-type-url';
import { FooterModal } from '../../footer-modal';
import { TYPE_URL } from '../../../common/type-url';

export const AddHeapMap = ({ addTracking }) => {
  const { setting } = useAccountContext();

  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackingUrl, setTrackingURL] = useState('');
  const [captureUrl, setCaptureURL] = useState('');
  const [typeURL, setTypeURL] = useState(TYPE_URL.MATCH);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const webID = activeWebsite ? activeWebsite.webID : undefined;

  const handleAddTracking = async () => {
    const token = getAccessToken();
    setLoading(true);
    setError('');

    try {
      if (typeURL.key === TYPE_URL.MATCH.key) {
        setCaptureURL(trackingUrl);
      }

      formRef.current.submit();
      if (name == '' || trackingUrl == '' || captureUrl == '') {
        return;
      }

      const response = await createTrackingInfo(
        { name, trackingUrl, typeUrl: typeURL.key, captureUrl, webID },
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
        footer={
          <FooterModal
            onCancel={() => setVisible(false)}
            onSubmit={handleAddTracking}
            loading={loading}
          />
        }
      >
        <Form name="basic" ref={formRef}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your heatmap name!',
              },
            ]}
          >
            <Input
              size="large"
              value={name}
              onChange={event => setName(event.currentTarget.value)}
              type="basic"
              placeholder="Enter your Heatmap name"
            />
          </Form.Item>

          <Input.Group compact>
            <SelectTypeURL
              onChange={key => setTypeURL(TYPE_URL[key])}
              size="large"
              width="30%"
            />

            <Form.Item
              name="trackingUrl"
              className="-ml-px"
              style={{ width: '70%' }}
              rules={[
                { required: true, message: 'Please input your tracking url!' },
              ]}
            >
              <Input
                size="large"
                value={trackingUrl}
                placeholder={typeURL.suggest}
                onChange={event => setTrackingURL(event.currentTarget.value)}
              />
            </Form.Item>
          </Input.Group>

          {typeURL.key != 'match' && (
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
          )}

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
