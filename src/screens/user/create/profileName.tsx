import React from 'react';
import { Form, Button, Typography, Input } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
import { renderTitle } from '@utils/helpers';

const ProfileName = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { state } = useLocation();

  console.log(state);

  const onFinish = async (values: any) => {
    const data = {
      ...state,
      full_name: values.firstName + ' ' + values.lastName,
    };
    history.push('/user/create/profile-maritial-status', data);
  };

  return (
    <AuthLayout header={true}>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Typography.Title level={4}>
            {renderTitle(state.signAs, 'gender_title', state.gender)}{' '}
          </Typography.Title>
        </Typography>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" rules={[{ required: true, message: 'Please input last name!' }]}>
          <Input placeholder="Last Name" />
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

export default ProfileName;
