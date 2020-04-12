import React, { useState } from 'react';
import { Form, Input, Button, Layout } from 'antd';
import { useRouter } from 'next/router';

import { login } from '../../common/query-lib/login';
import { useAccountContext } from '../profile/profile-context';
import { setAccessToken } from '../../utils/account-utils';

export const LoginForm = () => {
  const router = useRouter();
  const { setProfile, setSetting } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const response = await login(data);
      if (response.status === 200 || response.status === 304) {
        const { token, ...profile } = response.data;
        setAccessToken(token);
        setProfile(profile);
        const activeOrganization = profile.organizations[0];
        const activeWebsite = activeOrganization.websites[0];
        setSetting({
          activeOrganization,
          activeWebsite,
        });

        const { webID } = activeWebsite;
        router.push(`/sites/[id]/dashboard`, `/sites/${webID}/dashboard`);
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
      setError('Invalid email or password');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout.Content
      className="rounded bg-white p-8"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 50px 5px' }}
    >
      <Form name="basic" onFinish={handleSubmit}>
        <img
          className="m-auto mb-8"
          src="/login.svg"
          width="85%"
          alt="Login Banner"
        />

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input size="large" type="email" placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" placeholder="Enter your password" />
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
