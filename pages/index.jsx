import { Button } from 'antd';
import NextLink from 'next/link';

export default () => (
  <div>
    <h1 className="text-5xl font-bold text-purple-500">
      The fast & visual way to understand your users!
    </h1>

    <div>
      <NextLink href="sign-up">
        <Button type="danger" size="large">
          Sign Up
        </Button>
      </NextLink>
    </div>
    <div>
      <NextLink href="sign-in">
        <Button type="normal" size="large">
          Sign In
        </Button>
      </NextLink>
    </div>
  </div>
);
