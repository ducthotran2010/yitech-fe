import React from 'react';
import classNames from 'classnames';
import { DownCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';

export const StepDetails = ({ data }) => {
  const length = data.length;
  const last = data.length - 1;

  return (
    <div
      className="flex flex-row absolute w-full bottom-0"
      style={{
        paddingLeft: 55,
        paddingRight: 14,
      }}
    >
      {data.map(({ sessions, url }, index) => {
        let rate = 0;
        const nextData = data[(index + 1) % length];

        if (nextData) {
          const { sessions: nextSessions } = nextData;
          rate = Math.floor(100 - (nextSessions / sessions) * 100);
          if (index == last) {
            rate = Math.floor((sessions / nextSessions) * 100);
          }
          if (isNaN(rate) || !isFinite(rate)) {
            rate = 0;
          }
        }

        return (
          <div
            key={`${url}-${index}`}
            className={classNames(
              'flex-1',
              'text-center',
              'p-4',
              'uppercase',
              'font-bold',
              {
                'text-green-500': index == last,
                'text-red-500': index != last && rate >= 40,
                'text-gray-500': index != last && rate < 40,
              },
            )}
            style={{
              marginLeft: index != 0 ? -1 : undefined,
              borderColor: '#ddd',
            }}
          >
            {index != last ? (
              <DownCircleTwoTone
                twoToneColor={rate >= 40 ? '#f56565' : '#bbb'}
                style={{ fontSize: 32 }}
              />
            ) : (
              <CheckCircleTwoTone
                twoToneColor="#0c0"
                style={{ fontSize: 32 }}
              />
            )}

            <p className="mt-2">{index != last ? 'Drop off' : 'Conversion'}</p>
            <p>{rate}%</p>
          </div>
        );
      })}
    </div>
  );
};
