import {
  Typography,
  Affix,
  Layout,
  Breadcrumb,
  Button,
  Modal,
  Form,
  Input,
  message
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState,useEffect } from "react";

import { SideBar, SideBarDefault } from "../../../../component/sites/side-bar";
import { TrackingList } from "../../../../component/sites/tracking-list";
import { SkeletonPage } from "../../../../component/sites/skeleton-page";

import { createTrackingInfo } from "../../../../common/query-lib/heatmap-data/create-tracking-info";
import { getAccessToken } from "../../../../utils/account-utils";

import { getCheckingInfo } from "../../../../common/query-lib/heatmap-data/get-checking-info";


const Click = ({ id } ) => {
  
  

  const [mainData, setMainData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(()=>{
    getData();
  },[]);

  const getData =async () => {
    const datares = await loaddata(id);
    setMainData(fetch(datares));
    
  } 

  ///for add click heatmap tracking info
  const success = () => {
    message.success("Add click tracking infomation success !");
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async data => {
    setLoading(true);
    setError("");

    data.webID = id;
    const token = getAccessToken();

    try {
      const response = await createTrackingInfo(data, token);
      if (response.status === 200 || response.status === 304) {
        const dataResponse = response.data;
        mainData.push(tranfer(dataResponse));
        success();
        setVisible(false);
        setMainData([...mainData]);
        return;
      }

      if (response.status === 400) {
        setError("Sorry, you can not create now, please try again later!");
        return;
      }
    } catch (error) {
      setError("Invalid!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetch = (datares) => {
    setLoading(true);
    const data = [];
    for (let i = 0; i < datares.length; i++) {
      data.push(tranfer(datares[i]));
    }
    setLoading(false);
    return data;
  };

  const tranfer= (datares) => {
    return {
      id: datares.trackingHeatmapInfoId,
      name: datares.name,
      url: datares.trackingUrl,
      description:
        "Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes along Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes along ...",
      createdBy: "Duc Tho Tran",
      createdAt: new Date(
        new Date().getTime() - Math.round(Math.random() * 1000000000000)
      ).toLocaleDateString(),
      views: Math.round(Math.random() * 10000)
    };
  }

  const loaddata = async (id) => {
    const token = getAccessToken();
    try {
      const response = await getCheckingInfo(id, token);
      if (response.status === 200 || response.status === 304) {
        const dataResponse = response.data;
        return dataResponse;
      }
  
      if (response.status === 400) {
        console.error.log("Bad request");
        return null;
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  //========================================================

  return (
    <SkeletonPage id={id} sideBarActive={SideBarDefault.HEATMAPS}>
      <Breadcrumb>
        <Breadcrumb.Item>Analytics</Breadcrumb.Item>
        <Breadcrumb.Item>Heatmap Tracking</Breadcrumb.Item>
        <Breadcrumb.Item>All</Breadcrumb.Item>
      </Breadcrumb>

      <Typography.Title level={2}>Heatmap Tracking</Typography.Title>

      <Modal
        title="Add Heatmap Tracking"
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

      <TrackingList id={id} renderData={mainData} loading={loading} />
    </SkeletonPage>
  );
};

Click.getInitialProps = ({ query: { id } }) => {
  return { id };
};

export default Click;
