import { Menu } from 'antd';

export const UserPopoverContent = () => {
  return (
    <Menu selectable={false}>
      <Menu.Item>Profile</Menu.Item>
      <Menu.Item>Organizations</Menu.Item>
      <Menu.Divider />
      <Menu.Item>Logout</Menu.Item>
    </Menu>
  );
};
