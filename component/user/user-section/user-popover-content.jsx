import { Menu } from 'antd';
import { useRouter } from 'next/router';

import { clearAccessToken } from '../../../utils/account-utils';
import { useAccountContext } from '../../profile/profile-context';

export const UserPopoverContent = () => {
  const router = useRouter();
  const { setProfile, setSetting, setRoute } = useAccountContext();

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
          setProfile(undefined);
          setSetting(undefined);
          setRoute(undefined);
          clearAccessToken();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};
