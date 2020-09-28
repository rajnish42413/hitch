import { Form } from 'antd';
import React from 'react';

interface IProps {
  initialValue?: string | Number;
}

export default function Salary(props: IProps) {
  return (
    <Form.Item
      name="salary_range"
      rules={[{ required: true, message: 'Please Select your salary range!' }]}
      initialValue={props?.initialValue}
    >
      <select placeholder="Select Salary Range" className="ant-input">
        <option value="no-income">No Income</option>
        <option value="0-1-lakh">0-1 Lakh</option>
        <option value="1-2-lakh">1-2 Lakh</option>
        <option value="2-3-lakh">2-3 Lakh</option>
        <option value="3-4-lakh">3-4 Lakh</option>
        <option value="4-5-lakh">4-5 Lakh</option>
        <option value="5-7.5-lakh">5-7.5 Lakh</option>
        <option value="7.5-10-lakh">7.5-10 Lakh</option>
        <option value="10-15-lakh">10-15 Lakh</option>
        <option value="15-20-lakh">15-20 Lakh</option>
        <option value="20-25-lakh">20-25 Lakh</option>
        <option value="25-35-lakh">25-35 Lakh</option>
        <option value="35-50-lakh">35-50 Lakh</option>
        <option value="50-70-lakh">50-70 Lakh</option>
        <option value="70-1-crore">70-1 Crore</option>
        <option value="1crore+">1 Crore & above</option>
      </select>
    </Form.Item>
  );
}
