import React from 'react';
import { Select } from 'antd';
import { TYPE_URL } from '../../common/type-url';

export const SelectTypeURL = ({ defaultValue, width, onChange, ...others }) => (
  <Select
    style={{ width }}
    defaultValue={defaultValue || 'MATCH'}
    onChange={onChange}
    {...others}
  >
    {Object.keys(TYPE_URL).map(key => (
      <Select.Option key={TYPE_URL[key].key} value={key}>
        {TYPE_URL[key].display}
      </Select.Option>
    ))}
  </Select>
);
