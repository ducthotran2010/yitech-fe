import { Typography, Layout } from 'antd';

import { SideBar, SideBarDefault } from '../../../component/sites/side-bar';

const contentStyle = {
  width: 960,
};

const ConversionRate = ({ id }) => {
  const verified = false;
  
  return (
    <Layout className="h-screen flex flex-row">
      <SideBar id={id} sideBarActive={SideBarDefault.CONVERSION_RATE} />
      <Layout className="h-full flex-1 p-8">
        <Layout.Content
          className="bg-white m-auto py-8 px-16"
          style={contentStyle}
        >
          <Typography.Title>Dashboard</Typography.Title>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

ConversionRate.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default ConversionRate;
