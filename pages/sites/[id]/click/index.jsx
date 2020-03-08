import { Typography, Layout, Breadcrumb, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { SideBar, SideBarDefault } from '../../../../component/sites/side-bar';
import { TrackingList } from '../../../../component/sites/tracking-list';
import { TrackType } from '../../../../common/track';
import { useState } from 'react';

const Click = ({ id }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout className="h-screen flex flex-row">
      <SideBar id={id} sideBarActive={SideBarDefault.CLICK_EVENT} />
      <Layout className="h-full flex-1 p-8 overflow-y-auto ">
        <Breadcrumb>
          <Breadcrumb.Item>Analytics</Breadcrumb.Item>
          <Breadcrumb.Item>Click Tracking</Breadcrumb.Item>
          <Breadcrumb.Item>All</Breadcrumb.Item>
        </Breadcrumb>

        <Typography.Title level={2}>Click Tracking</Typography.Title>

        <Modal
          title="Add Click Tracking"
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>

        <div className="relative z-10">
          <Button
            type="primary"
            className="absolute"
            style={{ bottom: -50 }}
            onClick={() => setVisible(true)}
          >
            <div className="flex items-center">
              <PlusOutlined className="pr-2" />
              Tracking
            </div>
          </Button>
        </div>

        <TrackingList id={id} trackType={TrackType.CLICK} />
      </Layout>
    </Layout>
  );
};

Click.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Click;
