import { Typography, Affix, Layout, Breadcrumb, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

import { SideBar, SideBarDefault } from '../../../../component/sites/side-bar';
import { TrackingList } from '../../../../component/sites/tracking-list';
import { SkeletonPage } from '../../../../component/sites/skeleton-page';

const Click = ({ id }) => {
  const [visible, setVisible] = useState(false);

  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
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

      <TrackingList id={id} />
    </SkeletonPage>
  );
};

Click.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Click;
