import React, { useEffect } from 'react';
import { Form, Button, Typography, Select } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
import { renderTitle } from '@utils/helpers';

const ProfileGender = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { state } = useLocation();
  const { signAs } = state;

  useEffect(() => {
    return () => {
      if (!signAs) return history.go(-1);
    };
  }, [history, signAs]);

  const onFinish = async (values: any) => {
    console.log(values);
    const data = {
      ...state,
      gender: values.gender,
    };
    history.push('/user/create/profile-name', data);
  };

  return (
    <AuthLayout header={true}>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Typography.Title level={4}>
            {renderTitle(signAs, 'profile_title', 'gender')}{' '}
          </Typography.Title>
        </Typography>
        <Form.Item name="gender" rules={[{ required: true, message: 'Please Select Option!' }]}>
          <Select placeholder="Select a option">{renderGender(signAs)}</Select>
        </Form.Item>
        <AuthFooter>
          <Button htmlType="submit" block className="btn-dark">
            Continue
          </Button>
        </AuthFooter>
      </Form>
    </AuthLayout>
  );
};

export default ProfileGender;

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
