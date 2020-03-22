import { Breadcrumb, Row, Col, Form, Input, Button, Typography } from 'antd';

import { AccountLayout } from '../../component/account/account-layout';
import { SideBarDefault } from '../../component/account/side-bar';

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
  return (
    <AccountLayout sectionName="Profile" sideBarActive={SideBarDefault.PROFILE}>
      <Breadcrumb>
        <Breadcrumb.Item>Settings</Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2}>Profile</Typography.Title>

      <Row style={{ marginTop: '3%' }}>
        <Col span={6} offset={8}>
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
              <Input />
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
              <Input />
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

          <Typography.Title level={4}>Password change</Typography.Title>
          <Form name="passwordChange" scrollToFirstError {...formItemLayout}>
            <Form.Item
              name="password"
              label="Old Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
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
              <Input.Password />
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
