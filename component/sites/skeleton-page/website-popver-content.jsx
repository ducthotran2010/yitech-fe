import React from 'react';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import { useAccountContext } from '../../profile/profile-context';

export const WebsitePopoverContent = () => {
  const { profile, setting, setSetting } = useAccountContext();
  const router = useRouter();

  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const activeOrganizationID = activeOrganization
    ? activeOrganization.organizationID
    : undefined;
  const websites =
    profile && activeOrganization ? activeOrganization.websites : undefined;

  const handleClickWebsite = (website) => {
    const { webID } = website;
    setSetting({
      ...setting,
      activeWebsite: website,
    });
    const pathname = window.location.pathname;
    const restPosition =
      pathname.slice('/sites/'.length).indexOf('/') + '/sites/'.length + 1;
    const restPath = pathname.slice(restPosition);
    const nextQueryPosition = restPath.indexOf('/');
    if (nextQueryPosition == -1) {
      router.push(`/sites/[id]/${restPath}`, `/sites/${webID}/${restPath}`);
      return;
    }

    const nextQuery = restPath.slice(0, nextQueryPosition);
    router.push(`/sites/[id]/${nextQuery}`, `/sites/${webID}/${nextQuery}`);
  };

  return (
    <Menu
      theme="light"
      mode="vertical"
      className="border-r-0"
      style={{ minWidth: 250 }}
    >
      {websites &&
        websites.map((website) => (
          <Menu.Item
            key={website.webID}
            onClick={() => handleClickWebsite(website)}
          >
            {website.webUrl}
          </Menu.Item>
        ))}
      <Menu.Item
        onClick={() => {
          setSetting({ ...setting, addWebsite: true });
          router.push(
            '/organization/[id]/settings/general',
            `/organization/${activeOrganizationID}/settings/general`,
          );
        }}
      >
        <div className="flex items-center">
          <PlusOutlined />
          <span>Add website</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};
