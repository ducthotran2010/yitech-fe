import React, { useState } from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { useRouter } from 'next/router';

import { login } from '../../common/query-lib/login';
import { useAccountContext } from '../profile/profile-context';
import { setAccessToken } from '../../utils/account-utils';

export const LoginForm = () => {
  const router = useRouter();
  const { setProfile } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async data => {
    setLoading(true);
    setError('');

    try {
      const response = await login(data);
      console.log({ response });
      if (response.status === 200 || response.status === 304) {
        const { token, ...profile } = response.data;
        setAccessToken(token);
        setProfile(profile);
        router.push(
          '/sites/[id]/dashboard',
          `/sites/0/dashboard`,
          // `/sites/${profile.websites[0]}/dashboard`,
        );
        return;
      }

      if (response.status === 403) {
        setProfile(null);
        setError('Your account is disabled');
        return;
      }

      setProfile(null);
      setError('Could not login your account');
    } catch (error) {
      setProfile(null);
      setError('Invalid username or password');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout.Content className="rounded bg-white p-8 shadow">
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
          <Input
            size="large"
            placeholder="Enter your username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
          />
        </Form.Item>

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
            Login
          </Button>
        </Form.Item>
      </Form>
    </Layout.Content>
  );
};
