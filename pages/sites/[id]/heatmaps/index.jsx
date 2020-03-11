import { Typography, Affix, Layout, Breadcrumb, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { SideBar, SideBarDefault } from '../../../../component/sites/side-bar';
import { TrackingList } from '../../../../component/sites/tracking-list';
import { useState } from 'react';

const Click = ({ id }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Layout className="h-screen flex flex-row">
      <SideBar id={id} sideBarActive={SideBarDefault.HEATMAPS} />
      <div className="flex flex-col w-full">
        <div
          className="flex flex-row items-center overflow-hidden shadow z-20"
          style={{
            height: 50,
            background: 'rgb(38,29,23)',
            background:
              'linear-gradient(90deg, rgba(38,29,23,1) 0%, rgba(34,17,41,1) 100%)',
          }}
        >
          <div
            className="hover:underline cursor-pointer bg-gray-700 relative h-full flex items-center px-8 text-gray-400"
            style={{
              fontSize: 16,
              backgroundColor: 'rgb(58, 45, 36)',
            }}
          >
            <div
              className="absolute bg-gray-700 rotate-45 transform"
              style={{
                color: '#666e7b',
                backgroundColor: 'rgb(58, 45, 36)',
                width: 40,
                height: 40,
                right: -20,
              }}
            ></div>
            https://www.google.com/
          </div>
        </div>
        <Layout className="flex-1 w-full p-8 overflow-y-auto">
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
        </Layout>
      </div>
    </Layout>
  );
};

Click.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Click;
