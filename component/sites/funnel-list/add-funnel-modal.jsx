import { useState, useRef, useEffect } from 'react';
import { Button, Modal, Steps, Form, Input, message, Select } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { createFunnelInfo } from '../../../common/query-lib/funnel/create-funnel-info';
import { getAccessToken } from '../../../utils/account-utils';
import { useAccountContext } from '../../profile/profile-context';
import { SelectTypeURL } from '../select-type-url';
import { FooterModal } from '../../footer-modal';
import { TYPE_URL } from '../../../common/type-url';

const initStep = { typeUrl: 'MATCH', name: '', stepUrl: '' };
const getRules = (field) => [
  {
    required: true,
    message: `Please input ${field}!`,
  },
];

export const AddFunnel = ({ addTracking }) => {
  const { setting } = useAccountContext();

  const formRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [steps, setSteps] = useState([{ ...initStep }, { ...initStep }]);

  const activeWebsite = setting ? setting.activeWebsite : undefined;
  const webID = activeWebsite ? activeWebsite.webID : undefined;

  const handleAddFunnel = async () => {
    const token = getAccessToken();
    setLoading(true);
    console.log(steps);
    setError('');

    try {
      formRef.current.submit();
      for (let i = 0; i < steps.length; ++i) {
        const { name, stepUrl } = steps[i];
        if (name == '' || stepUrl == '') {
          return;
        }
      }

      const realSteps = steps.map(({ typeUrl, ...others }) => ({
        ...others,
        typeUrl: TYPE_URL[typeUrl].key,
      }));

      const response = await createFunnelInfo(
        { name, steps: realSteps, webID },
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
      console.log(error);

      setError(
        'Sorry, please check your step url, it must be start with website url',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStepEntry = (entry, index) => (event) => {
    const step = steps[index];
    step[entry] = event.currentTarget.value;
    setSteps([...steps]);
  };

  const handleUpdateStepTypeURL = (index) => (key) => {
    const step = steps[index];
    step.typeUrl = key;
    setSteps([...steps]);
  };

  const handleAddStep = () => setSteps([...steps, { ...initStep }]);
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
        footer={
          <FooterModal
            onCancel={() => setVisible(false)}
            loading={loading}
            onSubmit={handleAddFunnel}
          />
        }
      >
        <Form name="basic" ref={formRef}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your funnels' }]}
          >
            <Input
              size="large"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
              type="basic"
              placeholder="Enter your funnel name"
            />
          </Form.Item>

          <Steps direction="vertical" current={-1}>
            {steps.map(({ name, stepUrl, typeUrl }, index) => (
              <Steps.Step
                key={index}
                description={
                  <div className="flex flex-row flex-wrap">
                    <Form.Item
                      name={`step-name-${index}`}
                      className="flex-1 mr-4"
                      rules={getRules('step name')}
                    >
                      <Input
                        size="middle"
                        placeholder="Step name"
                        value={name}
                        onChange={handleUpdateStepEntry('name', index)}
                      />
                    </Form.Item>

                    <Input.Group
                      compact
                      className="w-full"
                      style={{ maxWidth: 500 }}
                    >
                      <SelectTypeURL
                        width="30%"
                        onChange={handleUpdateStepTypeURL(index)}
                      />
                      <Form.Item
                        name={`step-url-${index}`}
                        style={{ width: '70%' }}
                        className="-ml-px"
                        rules={getRules('step url')}
                      >
                        <Input
                          placeholder={TYPE_URL[typeUrl].suggest}
                          value={stepUrl}
                          onChange={handleUpdateStepEntry('stepUrl', index)}
                          size="middle"
                        />
                      </Form.Item>
                    </Input.Group>
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
