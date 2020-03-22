import { useState, useRef } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { FooterModal } from '../../footer-modal';

export const AddOrganizationModal = () => {
  const formRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  return (
    <>
      <Modal
        title="Add Organization Tracking"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={
          <FooterModal
            onCancel={() => setVisible(false)}
            onSubmit={() => {}}
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
                message: 'Please input your click tracking name!',
              },
            ]}
          >
            <Input
              size="large"
              value={name}
              onChange={event => setName(event.currentTarget.value)}
              type="basic"
              placeholder="Enter your organization name"
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
            Organization
          </div>
        </Button>
      </div>
    </>
  );
};
