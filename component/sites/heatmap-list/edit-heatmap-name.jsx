import { Modal, message, Form, Input } from 'antd';
import { useRef, useState } from 'react';

import { FooterModal } from '../../footer-modal';

export const EditHeatmapModal = ({ visible, setVisible, name, setName }) => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEditName = () => {
    setLoading(true);
    setError('');
    try {
      formRef.current.submit();
      if (name == '') {
        return;
      }
      message.success('Ok');

      setError('Could not edit Heatmap name');
    } catch (error) {
      setError('Could not edit Heatmap name');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Heatmap Tracking"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={
        <FooterModal
          onCancel={() => setVisible(false)}
          onSubmit={handleEditName}
          loading={loading}
        />
      }
    >
      <Form name="basic" ref={formRef}>
        {visible && (
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Heatmap name!',
              },
            ]}
          >
            <Input
              size="large"
              value={name}
              defaultValue={name}
              onChange={event => setName(event.target.value)}
              type="basic"
              placeholder="Enter your Heatmap name"
            />
          </Form.Item>
        )}

        {error && (
          <span className="block mb-4 text-red-600 text-center">{error}</span>
        )}
      </Form>
    </Modal>
  );
};
