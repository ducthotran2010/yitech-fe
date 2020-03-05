import { Form, Input, Button } from 'antd';
import NextLink from 'next/link';
import { useState } from 'react';

export default () => {
  const [username, setUsername] = useState('1');
  const [password, setPassword] = useState('1');
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h1>Sign in</h1>
      <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <NextLink href="sites/[id]/dashboard" as="sites/0/dashboard">
            <Button type="">Sign in</Button>
          </NextLink>
        </Form.Item>
      </Form>
    </div>
  );
};
