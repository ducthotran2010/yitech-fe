import { Typography, Layout } from 'antd';

import { SideBar, SideBarDefault } from '../../../component/sites/side-bar';

const Page = ({ id }) => {
  const verified = false;

  return (
    <Layout className="h-screen flex flex-row">
      <SideBar id={id} sideBarActive={SideBarDefault.CONTENT_READING} />
      <Layout className="h-full flex-1 p-8">
        <Layout.Content className="bg-white m-auto py-8 px-16"></Layout.Content>
      </Layout>
    </Layout>
  );
};

Page.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Page;
