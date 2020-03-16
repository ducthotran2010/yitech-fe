import React from 'react';
import classNames from 'classnames';

export const StepNames = () => (
  <div
    className="flex flex-row absolute w-full top-0"
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
          'border-b',
          'py-4',
          'px-1',
          'truncate',
        )}
        style={{
          marginLeft: index != 0 ? -1 : undefined,
          borderColor: '#ddd',
        }}
      >
        Step {id}
      </div>
    ))}
  </div>
);
