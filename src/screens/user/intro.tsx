import React from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import AuthLayout from '../../layouts/auth';
import { useHistory } from 'react-router';
import CustomStepper from '../../components/CustomStepper';

const UserIntro = (props: any) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    message.success('Hooray ! Welcome to HITCH familiy ', 2);
    history.push('/home');
  };

  return (
    <AuthLayout>
      <CustomStepper totalSteps={4} active={3} /> <br />
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
        form={form}
      >
        <Typography style={{ textAlign: 'center' }}>
          <Typography.Title level={3}>Write your introduction </Typography.Title>
          <Typography.Paragraph>Good first impressions are nice to have </Typography.Paragraph>
        </Typography>

        <Form.Item
          name="intro"
          rules={[{ required: true, message: 'Please input your introduction!' }]}
        >
          <Input.TextArea rows={5} placeholder="Here goes my introduction" maxLength={255} />
        </Form.Item>
        <br />
        <Form.Item className="button-bottom buttom-buttom-1">
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
};

export default UserIntro;
