import React from 'react';
import classNames from 'classnames';
import { DownCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

export const StepDetails = () => (
  <div
    className="flex flex-row absolute w-full bottom-0"
    style={{
      paddingLeft: 75,
      paddingRight: 14,
    }}
  >
    {[1, 2, 3, 4, 5, 6, 7].map((id, index) => (
      <div
        key={id}
        className={classNames(
          'flex-1',
          'text-gray-700',
          'text-center',
          'p-4',
          'uppercase',
          'font-bold',
          {
            'text-red-500': id != 7,
            'text-green-500': id == 7,
          },
        )}
        style={{
          marginLeft: index != 0 ? -1 : undefined,
          borderColor: '#ddd',
        }}
      >
        {id != 7 ? (
          <DownCircleTwoTone twoToneColor="#f00" style={{ fontSize: 32 }} />
        ) : (
          <CheckCircleTwoTone twoToneColor="#0c0" style={{ fontSize: 32 }} />
        )}
        <p className="mt-2">Drop off</p>
        <p>49%</p>
      </div>
    ))}
  </div>
);
