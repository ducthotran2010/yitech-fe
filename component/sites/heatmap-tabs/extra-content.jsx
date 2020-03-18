import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

import { STAT_OPTION } from '../../../common/statistic-option';

const dateFormat = 'DD/MM/YYYY';

export const ExtraContent = ({
  showedDevice,
  setOption,
  setFrom,
  setTo,
  from,
  to,
  option,
}) => (
  <div className="hidden md:block">
    {showedDevice &&
      [STAT_OPTION.MOBILE, STAT_OPTION.TABLET, STAT_OPTION.DESKTOP].map(
        item => (
          <span
            className="mr-4 cursor-pointer hidden xl:inline-block"
            key={item.display}
            onClick={() => setOption(item.value)}
            style={{
              color: item.value == option && '#40a9ff',
            }}
          >
            {item.display}
          </span>
        ),
      )}

    <DatePicker.RangePicker
      className="mr-4"
      onChange={([from, to]) => {
        setFrom(from);
        setTo(to);
      }}
      value={[from, to]}
      format={dateFormat}
    />
  </div>
);
