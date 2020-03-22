import { Menu } from 'antd';
import { useRouter } from 'next/router';

import { clearAccessToken } from '../../../utils/account-utils';

export const UserPopoverContent = () => {
  const router = useRouter();

  return (
    <Menu selectable={false}>
      <Menu.Item onClick={() => router.push('/profile')}>Profile</Menu.Item>
      <Menu.Item onClick={() => router.push('/profile/organization')}>
        Organization
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        onClick={() => {
          router.push('/');
          clearAccessToken();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};
