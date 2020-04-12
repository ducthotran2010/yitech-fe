import React, { useState } from 'react';
import { Form, Input, Button, Layout, Typography } from 'antd';
import { useRouter } from 'next/router';

import { register } from '../../common/query-lib/register';
import { useAccountContext } from '../profile/profile-context';
import { setAccessToken } from '../../utils/account-utils';

const items = [
  { key: 'email', display: 'email' },
  { key: 'fullName', display: 'full name' },
  { key: 'domainUrl', display: 'Domain Url' },
  { key: 'organizationName', display: 'Organization Name' },
  { key: 'password', display: 'password', isPassword: true },
];

export const RegisterForm = () => {
  const router = useRouter();
  const { setProfile, setSetting } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      const response = await register(data);
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

      setProfile(null);
      setError('Register failed');
    } catch (error) {
      setProfile(null);
      setError('Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout.Content
      className="rounded bg-white p-8"
      style={{ boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 50px 5px' }}
    >
      <Typography.Title level={4} className="text-center">
        Register
      </Typography.Title>
      <Form name="basic" onFinish={handleSubmit}>
        {items.map(({ key, display, isPassword }) => (
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
