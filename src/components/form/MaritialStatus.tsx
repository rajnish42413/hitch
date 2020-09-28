import { Form, Select } from 'antd';
import React from 'react';

interface IProps {
  initialValue?: string | Number;
}

export default function MaritialStatus(props: IProps) {
  return (
    <Form.Item
      name="marital_status"
      rules={[{ required: true, message: 'Please Select your marital status!' }]}
      initialValue={props?.initialValue}
    >
      <Select placeholder="Select Marital Status">
        <Select.Option value="Widowed">Widowed</Select.Option>
        <Select.Option value="Separated">Separated</Select.Option>
        <Select.Option value="Divorced">Divorced</Select.Option>
        <Select.Option value="Never Married">Never Married</Select.Option>
      </Select>
    </Form.Item>
  );
}
