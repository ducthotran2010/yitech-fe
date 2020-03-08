import { Typography, Layout } from 'antd';

import { InstallAppView } from '../../../component/install-app-view';
import { SideBar, SideBarDefault } from '../../../component/sites/side-bar';

const contentStyle = {
  width: 960,
};

const ContentReading = ({ id }) => {
  const verified = false;
  
  return (
    <Layout className="min-h-screen flex flex-row">
      <SideBar id={id} sideBarActive={SideBarDefault.CONTENT_READING} />
      <Layout className="h-full flex-1 p-8">
        <Layout.Content
          className="bg-white m-auto py-8 px-16"
          style={contentStyle}
        >
          <Typography.Title>Dashboard</Typography.Title>
          {verified ? <InstallAppView /> : <InstallAppView />}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

ContentReading.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default ContentReading;
