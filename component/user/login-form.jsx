import React, { useState } from 'react';
import { Form, Input, Button, Layout } from 'antd';

import { login } from '../../common/query-lib/login';
import { useAccountContext } from '../profile/profile-context';
import { setAccessToken } from '../../utils/account-utils';

export const LoginForm = () => {
  const { setProfile } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async data => {
    setLoading(true);
    setError('');

    try {
      const response = await login(data);
      if (response.status === 200 || response.status === 304) {
        const token = response.data.token;
        setAccessToken(token);
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
    <Layout.Content className="rounded bg-white p-8">
      <Form name="basic" onFinish={handleSubmit}>
        <img
          className="m-auto mb-8"
          src="/login.svg"
          width="85%"
          alt="Login Banner"
        />

        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input autoFocus size="large" placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" placeholder="Enter your password" />
        </Form.Item>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <Form.Item>
          <Button
            loading={loading}
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
};
