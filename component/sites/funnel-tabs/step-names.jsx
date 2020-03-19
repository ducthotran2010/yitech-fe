import React from 'react';
import classNames from 'classnames';

export const StepNames = ({ data }) => (
  <div
    className="flex flex-row absolute w-full top-0"
    style={{
      paddingLeft: 75,
      paddingRight: 14,
    }}
  >
    {data.map(({ stepName, url }, index) => (
      <div
        key={`${url}-${index}`}
        className={classNames(
          'flex-1',
          'text-gray-600',
          'text-center',
          'border-b',
          'py-4',
          'px-1',
          'truncate',
          'text-base',
          'font-bold',
        )}
        style={{
          marginLeft: index != 0 ? -1 : undefined,
          borderColor: '#ddd',
        }}
      >
        {stepName}
      </div>
    ))}
  </div>
);
