import React, { useState } from 'react';
import { Form, Input, Button, Layout, Typography } from 'antd';
import { useRouter } from 'next/router';

import { register } from '../../common/query-lib/register';
import { useAccountContext } from '../profile/profile-context';
import { setAccessToken } from '../../utils/account-utils';
import { acceptInvite } from '../../common/query-lib/accept-invite';

export const AcceptInviteForm = ({ token, email }) => {
  const router = useRouter();
  const { setProfile, setSetting } = useAccountContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const items = [
    { key: 'fullName', display: 'full name' },
    { key: 'password', display: 'password', isPassword: true },
  ];

  const handleSubmit = async ({ email: _, ...data }) => {
    setLoading(true);
    setError('');

    try {
      const response = await acceptInvite(data, token);
      if (response.status === 200 || response.status === 304) {
        const { token, ...profile } = response.data;
        setAccessToken(token);
        setProfile(profile);
        const activeOrganization = profile.organizations.find( ({ websites }) => websites && websites.length > 0);
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
      setError('Accept failed');
    } catch (error) {
      setProfile(null);
      setError('Invalid information');
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
        Accept Invite
      </Typography.Title>
      <Form name="basic" onFinish={handleSubmit}>
        <input
          value={email}
          readOnly
          className="border cursor-not-allowed leading-7 mb-4 rounded-sm text-gray-500 w-full"
          style={{
            padding: '6.5px 11px',
            fontSize: 16,
          }}
        />
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
