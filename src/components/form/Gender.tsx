import React from 'react';
import { Form, Typography, Select, Button } from 'antd';
import { renderTitle } from '../../screens/user/create/Step-1';
import AuthFooter from '../../layouts/auth/footer';

interface IProps {
  initialValue?: string | Number;
  signAs: string;
  onChange?: any;
  onSubmit: any;
}

export default function Gender(props: IProps) {
  return (
    <>
      <Typography>
        <Typography.Title level={4}>
          {renderTitle(props.signAs, 'profile_title', 'gender')}{' '}
        </Typography.Title>
      </Typography>
      <Form.Item name="gender" initialValue="female">
        <Select>{renderGender(props.signAs)}</Select>
      </Form.Item>
      <AuthFooter>
        <Button
          htmlType="button"
          block
          className="btn-dark"
          onClick={() => props.onSubmit('enter-name')}
        >
          Continue
        </Button>
      </AuthFooter>
    </>
  );
}

const renderGender = (signAs: string) => {
  switch (signAs) {
    case 'father':
      return (
        <>
          <Select.Option value="female">Daughter</Select.Option>
          <Select.Option value="male">Son</Select.Option>
        </>
      );
    case 'mother':
      return (
        <>
          <Select.Option value="female">Daughter</Select.Option>
          <Select.Option value="male">Son</Select.Option>
        </>
      );
    case 'brother':
      return (
        <>
          <Select.Option value="female">Sister</Select.Option>
          <Select.Option value="male">Brother</Select.Option>
        </>
      );
    case 'sister':
      return (
        <>
          <Select.Option value="female">Sister</Select.Option>
          <Select.Option value="male">Brother</Select.Option>
        </>
      );
    case 'guardian':
      return (
        <>
          <Select.Option value="female">Groom (M)</Select.Option>
          <Select.Option value="male">Bride (F)</Select.Option>
        </>
      );
    default:
      return (
        <>
          <Select.Option value="female">Groom (M)</Select.Option>
          <Select.Option value="male">Bride (F)</Select.Option>
        </>
      );
  }
};
