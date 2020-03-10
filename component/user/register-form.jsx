import React, { useState } from 'react';
import { Form, Input, Button, Layout, Typography } from 'antd';

import { register } from '../../common/query-lib/register';
import { useAccountContext } from '../profile/profile-context';

const items = [
  { key: 'email', display: 'email' },
  { key: 'full_name', display: 'full name' },
  { key: 'web_url', display: 'web url' },
  { key: 'username', display: 'username' },
  { key: 'password', display: 'password', isPassword: true },
];

export const RegisterForm = () => {
  const { setProfile } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async data => {
    setLoading(true);
    setError('');

    try {
      const response = await register(data);
      if (response.status === 200 || response.status === 304) {
        const { token, profile } = response.data;
        localStorage.setItem('token', token);
        setProfile(profile);
        return;
      }

      setProfile(null);
      setError('Login failed');
    } catch (error) {
      setProfile(null);
      setError('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout.Content className="rounded bg-white p-8 shadow">
      <Typography.Title level={4} className="text-center">
        Register
      </Typography.Title>
      <Form name="basic" onFinish={handleSubmit}>
        {items.map(({ key, display, isPassword }, index) => (
          <Form.Item
            key={key}
            name={key}
            rules={[
              { required: true, message: `Please input your ${display}!` },
            ]}
          >
            {isPassword ? (
              <Input.Password
                placeholder={`Enter your ${display}`}
                size="large"
              />
            ) : (
              <Input placeholder={`Enter your ${display}`} size="large" />
            )}
          </Form.Item>
        ))}

        {error && (
          <span className="block mb-4 text-red-600 text-center">{error}</span>
        )}

        <Form.Item>
          <Button
            loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
};
