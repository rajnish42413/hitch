import { Form, Slider } from 'antd';
import React from 'react';
interface IProps {
  initialValue?: string | Number;
}
export default function Height(props: IProps) {
  return (
    <Form.Item
      name="c_height"
      rules={[{ required: true, message: 'Please input your height in cm!' }]}
      initialValue={props.initialValue}
    >
      <Slider min={48} max={84} tipFormatter={formatter} tooltipVisible />
    </Form.Item>
  );
}

const formatter = (value: any) => {
  return `${getFeet(value)}' ${getInches(value)}"`;
};

function getFeet(n: number) {
  return Math.floor(n / 12);
}

function getInches(n: number) {
  return n % 12;
}
