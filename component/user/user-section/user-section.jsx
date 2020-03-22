import { useAccountContext } from '../../profile/profile-context';
import { Popover } from 'antd';
import { UserPopoverContent } from './user-popover-content';

export const UserSection = () => {
  const { profile } = useAccountContext();

  const fullName = profile && profile.user ? profile.user.fullName : undefined;
  return (
    <Popover
      content={<UserPopoverContent />}
      placement="bottom"
      overlayClassName="custom-popover"
    >
      <div className="cursor-pointer flex h-full items-center px-8 text-gray-400 hover:text-white transition ease-in-out duration-300 item">
        {fullName}
      </div>
    </Popover>
  );
};
