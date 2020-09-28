import { Form, Select } from 'antd';
import React from 'react';

interface IProps {
  initialValue?: string | Number;
}

export default function EducationLevel(props: IProps) {
  return (
    <Form.Item
      name="max_education"
      rules={[{ required: true, message: 'Please Select your highest attained!' }]}
      initialValue={props.initialValue}
    >
      <Select placeholder="Highest Attained">
        <Select.Option value="School">School</Select.Option>
        <Select.Option value="Undergrad">Undergrad</Select.Option>
        <Select.Option value="Postgrad">Postgrad</Select.Option>
        <Select.Option value="Doctrate">Doctrate</Select.Option>
      </Select>
    </Form.Item>
  );
}
