import { Breadcrumb, Typography, Table } from 'antd';

import { AccountLayout } from '../../component/account/account-layout';
import { SideBarDefault } from '../../component/account/side-bar';
import { OrganizationList } from '../../component/account/organization-list/organization-list';
import { withAuth } from '../../component/user/with-auth';

export default withAuth(() => (
  <AccountLayout
    sectionName="Organization"
    sideBarActive={SideBarDefault.ORGANIZATION}
  >
    <Breadcrumb>
      <Breadcrumb.Item>Settings</Breadcrumb.Item>
      <Breadcrumb.Item>Organization</Breadcrumb.Item>
    </Breadcrumb>

    <Typography.Title level={2}>Organization</Typography.Title>
    <OrganizationList />
  </AccountLayout>
));
