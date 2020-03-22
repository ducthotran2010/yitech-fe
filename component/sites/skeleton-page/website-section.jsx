import React from 'react';
import { Popover } from 'antd';

import { WebsitePopoverContent } from './website-popver-content';
import { useAccountContext } from '../../profile/profile-context';

export const WebsiteSection = () => {
  const { setting } = useAccountContext();

  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const webUrl = activeWebsite ? activeWebsite.webUrl : undefined;

  return (
    <div
      className="hover:underline cursor-pointer bg-gray-700 relative h-full flex items-center px-8 text-gray-400"
      style={{
        fontSize: 16,
        backgroundColor: '#1890ff',
      }}
    >
      <Popover
        content={<WebsitePopoverContent />}
        placement="bottomLeft"
        overlayClassName="custom-popover"
      >
        <div
          className="absolute bg-gray-700 rotate-45 transform"
          style={{
            color: '#666e7b',
            backgroundColor: '#1890ff',
            width: 40,
            height: 40,
            top: 3,
            right: -20,
          }}
        ></div>
        {webUrl}
      </Popover>
    </div>
  );
};
