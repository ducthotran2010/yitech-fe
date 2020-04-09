import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

import { TYPE_URL } from '../../../common/type-url';

const getContent = ({ typeUrl, url }) => {
  const typeUrlKey = Object.keys(TYPE_URL).find(
    (key) => TYPE_URL[key].key == typeUrl,
  );
  const typeUrlDisplay = typeUrlKey ? TYPE_URL[typeUrlKey].display : typeUrl;

  return (
    <span className="normal-case">
      URL {typeUrlDisplay.toLowerCase()}&nbsp;
      <span className="underline">{url}</span>
    </span>
  );
};

export const StepNames = ({ data }) => {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(250);

  useEffect(() => {
    if (elementRef && elementRef.current) {
      setWidth(elementRef.current.width);
    }
  }, [elementRef, elementRef.current]);

  return (
    <div
      className="flex flex-row absolute w-full top-0"
      style={{
        paddingLeft: 55,
        paddingRight: 14,
      }}
    >
      {data.map(({ stepName, url, typeUrl, sessions }, index) => (
        <div className="flex-1" ref={elementRef}>
          <div
            key={`${url}-${index}`}
            className={classNames(
              'text-center',
              'border-b',
              'py-4',
              'px-1',
              'truncate',
            )}
            style={{
              marginLeft: index != 0 ? -1 : undefined,
              borderColor: '#ddd',
              maxWidth: width,
            }}
          >
            <div className="flex justify-center items-center">
              <span className="text-xs text-gray-600 block uppercase">
                Step {index + 1}
              </span>
              <Popover
                trigger="hover"
                content={getContent({ typeUrl, url })}
                className="text-xs"
              >
                <InfoCircleOutlined className="ml-1" />
              </Popover>
            </div>
            <span className={classNames('font-bold', 'text-base', 'block')}>
              {stepName}
            </span>
          </div>
          <div
            className="py-2 text-center truncate"
            style={{ maxWidth: width }}
          >
            <div className="font-bold text-xl truncate">{sessions}</div>
            <div className="text-xs text-gray-600 uppercase truncate">
              Sessions
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
