import React from 'react';
import { Button } from 'antd';

export const FooterModal = ({ onCancel, loading, onSubmit }) => [
  <Button key="back" onClick={onCancel}>
    Cancel
  </Button>,
  <Button key="submit" type="primary" loading={loading} onClick={onSubmit}>
    Submit
  </Button>,
];
