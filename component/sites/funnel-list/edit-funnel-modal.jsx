import { Modal, Form, Steps, Input } from 'antd';
import { useState, useRef } from 'react';

import { SelectTypeURL } from '../select-type-url';
import { FooterModal } from '../../footer-modal';
import { TYPE_URL } from '../../../common/type-url';

const getRules = field => [
  {
    required: true,
    message: `Please input ${field}!`,
  },
];

export const EditFunnelModal = ({
  visible,
  setVisible,
  name,
  setName,
  steps,
  setSteps,
}) => {
  const formRef = useRef(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateStepEntry = (entry, index) => event => {
    const step = steps[index];
    step[entry] = event.currentTarget.value;
    setSteps([...steps]);
  };

  const handleUpdateStepTypeURL = index => key => {
    const step = steps[index];
    step.typeUrl = key;
    setSteps([...steps]);
  };

  const handleEditName = () => {
    console.log('handled');
  };

  return (
    <Modal
      title="Edit Funnel Tracking"
      visible={visible}
      onCancel={() => setVisible(false)}
      width={800}
      footer={
        <FooterModal
          onCancel={() => setVisible(false)}
          onSubmit={handleEditName}
          loading={loading}
        />
      }
    >
      <Form name="basic" ref={formRef}>
        {visible && (
          <>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your funnels' }]}
            >
              <Input
                size="large"
                value={name}
                defaultValue={name}
                onChange={event => setName(event.currentTarget.value)}
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
                          defaultValue={name}
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
                          disabled
                          defaultValue={typeUrl}
                          onChange={handleUpdateStepTypeURL(index)}
                        />
                        <Form.Item
                          name={`step-url-${index}`}
                          style={{ width: '70%' }}
                          className="-ml-px"
                          rules={getRules('step url')}
                        >
                          <Input
                            disabled
                            placeholder={TYPE_URL[typeUrl].suggest}
                            value={stepUrl}
                            defaultValue={stepUrl}
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
          </>
        )}

        {error && (
          <span className="block mb-4 text-red-600 text-center">{error}</span>
        )}
      </Form>
    </Modal>
  );
};
