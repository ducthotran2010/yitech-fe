import { Typography, Affix, Layout, Breadcrumb, Button, Modal,Form,Input, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

import { SideBar, SideBarDefault } from "../../../../component/sites/side-bar";
import { TrackingList } from "../../../../component/sites/tracking-list";
import { SkeletonPage } from "../../../../component/sites/skeleton-page";

import {createTrackingInfo} from "../../../../common/query-lib/heatmap-data/create-tracking-info";
import { getAccessToken } from '../../../../utils/account-utils';


const Click = ({ id }) => {
  const [visible, setVisible] = useState(false);

  ///for add click heatmap tracking info
  const success = () => {
    message.success('This is a success message');
  };


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async data => {
    setLoading(true);
    setError("");

    data.webID = id;
    const token = getAccessToken();

    console.log(data, token);
    try {
      const response = await createTrackingInfo(data,token);
      if (response.status === 200 || response.status === 304) {
        const dataResponse = response.data;
        console.log(dataResponse)
        success();
        setVisible(false);
        return;
      }

      if (response.status === 400) {
        setError("Sorry, you can not create now, please try again later!")
        return;
      }
    } catch (error) {
      setError("Invalid!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //========================================================

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
        footer = {[]}
      >
        <Form name="basic" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your click tracking name!" }]}
          >
            <Input size="large" type="basic" placeholder="Enter your click tracking name" />
          </Form.Item>

          <Form.Item
            name="trackingUrl"
            rules={[{ required: true, message: "Please input your tracking url!" }]}
          >
            <Input size="large" placeholder="Enter your tracking url" />
          </Form.Item>

          {error && (
            <span className="block mb-4 text-red-600 text-center">{error}</span>
          )}

          <Form.Item>
            <Button
              loading={loading}
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              Create new tracking information
            </Button>
          </Form.Item>
        </Form>
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
