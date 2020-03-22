import { Typography, Layout } from 'antd';

import { SideBar, SideBarDefault } from '../../../component/sites/side-bar';
import { SkeletonPage } from '../../../component/sites/skeleton-page/skeleton-page';

const Page = ({ id }) => {
  const verified = false;

  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.INCOMING_FEEDBACK}>
      <Layout.Content className="bg-white m-auto py-8 px-16"></Layout.Content>
    </SkeletonPage>
  );
};

Page.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Page;
