import React from 'react';
import { Form, Button, Typography, Input, Select } from 'antd';
import AuthLayout from '../../layouts/auth';
import './Auth.scss';
import { useHistory } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const MobileVerification = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue="91">
        <Option value="91">+91</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    history.push('/verify-phone-number');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        size="large"
        form={form}
        className="h-100"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <br />

        <div className="mt-5">
          <Typography style={{ paddingLeft: '2rem' }}>
            <Title level={4}>What’s your phone number?</Title>
          </Typography>
          <br />

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { max: 10, min: 10, message: 'Please enter valid phone number!' }
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
              placeholder="Phone number"
              maxLength={10}
            />
          </Form.Item>
        </div>

        <div className="loginOptions">
          <Form.Item>
            <Button
              type="primary"
              shape="circle"
              size="large"
              icon={<RightOutlined />}
              style={{ float: 'right' }}
              htmlType="submit"
            />
          </Form.Item>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default MobileVerification;
