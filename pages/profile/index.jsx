import { Breadcrumb, Row, Col, Form, Input, Button, Typography } from 'antd';

import { AccountLayout } from '../../component/account/account-layout';
import { SideBarDefault } from '../../component/account/side-bar';
import { useAccountContext } from '../../component/profile/profile-context';
import { useEffect, useState } from 'react';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default () => {
  const { profile } = useAccountContext();
  const profileFullName =
    profile && profile.user ? profile.user.fullName : undefined;
  const profileEmail = profile && profile.user ? profile.user.email : undefined;

  const [email, setEmail] = useState(profileEmail);
  const [fullName, setFullName] = useState(profileFullName);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  return (
    <AccountLayout sectionName="Profile" sideBarActive={SideBarDefault.PROFILE}>
      <Breadcrumb>
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2}>Profile</Typography.Title>

      <Row className="mt-8">
        <Col className="m-auto w-full" style={{ maxWidth: 500 }}>
          <Typography.Title level={4}>Profile information</Typography.Title>
          <Form name="register" scrollToFirstError {...formItemLayout}>
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'Invalid email!',
                },
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input
                value={email}
                defaultValue={email}
                onChange={event => setEmail(event.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="fullName"
              label="Fullname"
              rules={[
                {
                  required: true,
                  message: 'Please input your fullname!',
                  whitespace: true,
                },
              ]}
            >
              <Input
                value={fullName}
                defaultValue={fullName}
                onChange={event => setFullName(event.target.value)}
              />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <div>
                <Button type="primary" htmlType="submit">
                  Update profile
                </Button>
                <Button style={{ marginLeft: '5%' }} htmlType="reset">
                  Reset
                </Button>
              </div>
            </Form.Item>
          </Form>

          <Typography.Title level={4} className="mt-12">
            Password change
          </Typography.Title>
          <Form name="passwordChange" scrollToFirstError {...formItemLayout}>
            <Form.Item
              name="password"
              label="Current Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="New Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The new password should not be matched with the old password!',
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                value={newPassword}
                onChange={event => setNewPassword(event.target.value)}
              />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <div>
                <Button type="primary" htmlType="submit">
                  Change Password
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AccountLayout>
  );
};
