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
  {
    key: SideBarDefault.INCOMING_FEEDBACK,
    icon: <InfoCircleOutlined />,
    name: 'Incoming Feedback',
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

export const SideBar = ({ id, sideBarActive }) => {
  const { profile, setting, setSetting } = useAccountContext();
  const router = useRouter();

  const handleOnClick = selection => {
    switch (selection) {
      case SideBarDefault.DASH_BOARD:
        return router.push('/sites/[id]/dashboard', `/sites/${id}/dashboard`);

      case SideBarDefault.HEATMAPS:
        return router.push('/sites/[id]/heatmaps', `/sites/${id}/heatmaps`);

      case SideBarDefault.CONVERSION_RATE:
        return router.push(
          '/sites/[id]/conversion-rate',
          `/sites/${id}/conversion-rate`,
        );

      case SideBarDefault.INCOMING_FEEDBACK:
        return router.push(
          '/sites/[id]/incoming-feedback',
          `/sites/${id}/incoming-feedback`,
        );

      case SideBarDefault.SETTING_GENERAL: {
        if (!setting) {
          return router.push('/');
        }

        const { activeOrganization } = setting;
        if (activeOrganization) {
          const { organizationID: id } = activeOrganization;
          return router.push(
            '/organization/[id]/settings/general',
            `/organization/${id}/settings/general`,
          );
        }
        return router.push('/');
      }

      case SideBarDefault.SETTING_MEMBER: {
        if (!setting) {
          return router.push('/');
        }

        const { activeOrganization } = setting;
        if (activeOrganization) {
          const { organizationID: id } = activeOrganization;
          return router.push(
            '/organization/[id]/settings/member',
            `/organization/${id}/settings/member`,
          );
        }
        return router.push('/');
      }
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

  const organizations = profile ? profile.organizations : undefined;
  const activeOrganization = setting ? setting.activeOrganization : undefined;

  return (
    <Layout.Sider width={200} theme="dark" breakpoint="md">
      <Menu
        mode="inline"
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
            trigger="hover"
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
