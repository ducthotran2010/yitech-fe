import { useState, useRef } from 'react';
import { Button, Modal, Steps, Form, Input, message, Select } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { createTrackingInfo } from '../../common/query-lib/heatmap-data/create-tracking-info';
import { getAccessToken } from '../../utils/account-utils';
import { useAccountContext } from '../profile/profile-context';

export const AddFunnel = ({ addTracking }) => {
  const { setting } = useAccountContext();

  const formRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [trackingUrl, setTrackingURL] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState([{}, {}]);

  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const webID = activeWebsite ? activeWebsite.webID : undefined;

  const handleAddFunnel = async () => {
    const token = getAccessToken();
    setLoading(true);
    setError('');

    try {
      formRef.current.submit();
      return;

      const response = await createTrackingInfo(
        { name, trackingUrl, webID },
        token,
      );

      if (response.status === 200 || response.status === 304) {
        message.success('Add funnel success!');
        addTracking(response.data);
        setVisible(false);
        return;
      }

      setError('Add funnel failed!');
    } catch (error) {
      setError('Sorry, you can not create now, please try again later!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderSelectTypeURL = () => (
    <Select defaultValue="Match">
      <Select.Option>Match</Select.Option>
    </Select>
  );

  const handleUpdateStepEntry = (entry, index) => event => {
    const step = steps[index];
    step[entry] = event.currentTarget.value;
    setSteps(steps);
  };

  const handleAddStep = () => setSteps([...steps, {}]);
  const handleRemoveLastStep = () => {
    if (steps.length > 2) {
      steps.pop();
      setSteps([...steps]);
    }
  };

  return (
    <>
      <Modal
        title="Add funnel"
        visible={visible}
        onCancel={() => setVisible(false)}
        width={800}
        footer={[
          <Button key="back" onClick={() => setVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleAddFunnel}
          >
            Submit
          </Button>,
        ]}
      >
        <Form name="basic" ref={formRef}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your funnels' }]}
          >
            <Input
              size="large"
              value={name}
              onChange={event => setName(event.currentTarget.value)}
              type="basic"
              placeholder="Enter your funnel name"
            />
          </Form.Item>

          <Steps direction="vertical" current={-1}>
            {steps.map(({ name, url }, index) => (
              <Steps.Step
                key={index}
                description={
                  <div className="flex flex-row flex-wrap">
                    <Form.Item
                      name={`step-name-${index}`}
                      className="flex-1 mr-4"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your step name!',
                        },
                      ]}
                    >
                      <Input
                        size="middle"
                        placeholder="Step name"
                        value={name}
                        onChange={handleUpdateStepEntry('name', index)}
                      />
                    </Form.Item>
                    <Form.Item
                      name={`step-url-${index}`}
                      className="w-full"
                      style={{ maxWidth: 500 }}
                      rules={[
                        {
                          required: true,
                          message: 'Please input your url!',
                        },
                      ]}
                    >
                      <Input
                        value={url}
                        onChange={handleUpdateStepEntry('url', index)}
                        size="middle"
                        addonBefore={renderSelectTypeURL()}
                        placeholder="Enter your URL"
                      />
                    </Form.Item>
                  </div>
                }
              />
            ))}
          </Steps>

          <Button
            shape="circle"
            type="primary"
            className="ml-12"
            onClick={handleAddStep}
          >
            <div className="flex items-center">
              <PlusOutlined className="pl-2" />
            </div>
          </Button>

          <Button
            disabled={steps.length <= 2}
            className="ml-4"
            shape="circle-outline"
            onClick={handleRemoveLastStep}
          >
            <div className="flex items-center">
              <MinusOutlined className="pl-2" />
            </div>
          </Button>

          {error && (
            <span className="block mb-4 text-red-600 text-center">{error}</span>
          )}
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
            Add Funnel
          </div>
        </Button>
      </div>
    </>
  );
};
