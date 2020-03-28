import { Layout, Menu, Card, Popover, Button, Select, Divider } from 'antd';
import { useRouter } from 'next/router';
import {
  AppstoreOutlined,
  PlusOutlined,
  AreaChartOutlined,
  FireOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { useAccountContext } from '../profile/profile-context';

export const SideBarDefault = {
  DASH_BOARD: 'DASH_BOARD',
  HEATMAPS: 'HEATMAPS',
  CONVERSION_RATE: 'CONVERSION_RATE',
  INCOMING_FEEDBACK: 'INCOMING_FEEDBACK',
  SETTING_MEMBER: 'SETTING_MEMBER',
  SETTING_GENERAL: 'SETTING_GENERAL',
};

const menus = [
  {
    key: SideBarDefault.HEATMAPS,
    icon: <FireOutlined />,
    name: 'Heatmaps',
  },
  {
    key: SideBarDefault.CONVERSION_RATE,
    icon: <AreaChartOutlined />,
    name: 'Funnels',
  },
];

const settings = [
  {
    key: SideBarDefault.SETTING_GENERAL,
    icon: <SettingOutlined />,
    name: 'General',
  },
  {
    key: SideBarDefault.SETTING_MEMBER,
    icon: <UsergroupAddOutlined />,
    name: 'Member',
  },
];

export const SideBar = ({ sideBarActive }) => {
  const { profile, route, setting, setSetting } = useAccountContext();
  const router = useRouter();

  const organizations = profile ? profile.organizations : undefined;
  const activeOrganization = setting ? setting.activeOrganization : undefined;
  const activeWebsite = setting ? setting.activeWebsite : undefined;

  const handleOnClick = selection => {
    let dummyID;

    switch (selection) {
      case SideBarDefault.DASH_BOARD:
      case SideBarDefault.HEATMAPS:
      case SideBarDefault.CONVERSION_RATE:
      case SideBarDefault.INCOMING_FEEDBACK: {
        if (activeWebsite) {
          dummyID = activeWebsite.webID;
        }

        if (
          !dummyID &&
          activeOrganization &&
          activeOrganization.websites.length !== 0
        ) {
          dummyID = activeOrganization.websites[0].webID;
        }
        break;
      }

      case SideBarDefault.SETTING_MEMBER:
      case SideBarDefault.SETTING_GENERAL: {
        if (activeOrganization) {
          dummyID = activeOrganization.organizationID;
        }
        break;
      }
    }

    if (!dummyID) {
      return router.push('/');
    }

    switch (selection) {
      case SideBarDefault.DASH_BOARD:
        return router.push(
          '/sites/[id]/dashboard',
          `/sites/${dummyID}/dashboard`,
        );

      case SideBarDefault.HEATMAPS:
        return router.push(
          '/sites/[id]/heatmaps',
          `/sites/${dummyID}/heatmaps`,
        );

      case SideBarDefault.CONVERSION_RATE:
        return router.push(
          '/sites/[id]/conversion-rate',
          `/sites/${dummyID}/conversion-rate`,
        );

      case SideBarDefault.INCOMING_FEEDBACK:
        return router.push(
          '/sites/[id]/incoming-feedback',
          `/sites/${dummyID}/incoming-feedback`,
        );

      case SideBarDefault.SETTING_GENERAL:
        return router.push(
          '/organization/[id]/settings/general',
          `/organization/${dummyID}/settings/general`,
        );

      case SideBarDefault.SETTING_MEMBER:
        return router.push(
          '/organization/[id]/settings/member',
          `/organization/${dummyID}/settings/member`,
        );
    }
  };

  const handleClickOrganization = organization => {
    const activeWebsite = organization.websites[0];
    const { webID } = activeWebsite;
    setSetting({
      activeOrganization: organization,
      activeWebsite,
    });
    router.push('/sites/[id]/dashboard', `/sites/${webID}/dashboard`);
  };

  const renderOrganizationContentPopover = () => (
    <Menu
      theme="light"
      mode="vertical"
      className="border-r-0"
      style={{ minWidth: 250 }}
    >
      {organizations &&
        organizations.map(organization => [
          <Menu.Item
            key={organization.organizationID}
            onClick={() => handleClickOrganization(organization)}
          >
            {organization.organizationName}
          </Menu.Item>,
          <Menu.Divider />,
        ])}
      <Menu.Item>
        <div className="flex items-center">
          <PlusOutlined />
          <span>Add organization</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Sider width={200} theme="dark" breakpoint="md">
      <Menu
        selectable={false}
        mode="vertical"
        theme="dark"
        defaultSelectedKeys={[sideBarActive]}
        className="h-full border-r-0"
        style={{
          background: 'rgb(38,29,23)',
          background:
            'linear-gradient(180deg, rgba(38,29,23,1) 0%, rgba(34,17,41,1) 100%)',
        }}
      >
        <div
          style={{ height: 150 }}
          className="flex justify-center items-center"
        >
          <img src="/icon.png" width="40%" />
        </div>

        <Menu.Item key={SideBarDefault.DASH_BOARD}>
          <Popover
            placement="bottomRight"
            content={renderOrganizationContentPopover()}
            overlayClassName="custom-popover"
            trigger="click"
          >
            <div className="flex items-center">
              <AppstoreOutlined />
              <span>
                {activeOrganization
                  ? activeOrganization.organizationName
                  : 'Dashboard'}
              </span>
            </div>
          </Popover>
        </Menu.Item>

        <Menu.ItemGroup title="Analytics">
          {menus.map(({ key, icon, name }) => (
            <Menu.Item key={key} onClick={() => handleOnClick(key)}>
              <div className="flex items-center">
                {icon}
                <span>{name}</span>
              </div>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>

        <Menu.ItemGroup title="Settings">
          {settings.map(({ key, icon, name }) => (
            <Menu.Item key={key} onClick={() => handleOnClick(key)}>
              <div className="flex items-center">
                {icon}
                <span>{name}</span>
              </div>
            </Menu.Item>
          ))}
        </Menu.ItemGroup>
      </Menu>
    </Layout.Sider>
  );
};
