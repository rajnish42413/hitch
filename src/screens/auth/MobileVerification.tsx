import React, { useState } from 'react';
import { Form, Button, Typography, Input, Select, message, notification } from 'antd';
import AuthLayout from '../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import Axios from 'axios';
import { queryfie } from '@utils/helpers';
import { SmileOutlined } from '@ant-design/icons';
import { colors } from '@constants/general';
import AuthFooter from '../../layouts/auth/footer';

const { Title } = Typography;
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const MobileVerification = (props: any) => {
  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState('+91');
  const [btnLoading, setBtnLoading] = useState(false);
  const history = useHistory();
  const { search, state } = useLocation();
  const params = queryfie(search);
  const social_data = state;

  const handleSelectCountry = (value: string) => {
    setCountryCode(value);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue={countryCode}>
      <Select onChange={handleSelectCountry}>
        <Option value="+91">+91</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async (values: any) => {
    setBtnLoading(true);
    let show = message.loading('Verifying Phone Number ...', 0);
    const { phone } = values;
    try {
      const { data } = await Axios.post(`request-otp`, {
        phone: phone,
        countryCode: countryCode,
        ref_code: params.ref ? params.ref : '',
      });
      if (data?.user) {
        history.push('/verify-phone-number', data.user);
      }
      setTimeout(show, 0);
      message.success('OTP send successfully');
      setBtnLoading(false);
    } catch (error) {
      if (error.response.data?.errors) {
        const { phone } = error.response?.data?.errors;
        if (phone) message.warning(phone?.[0]);
      }
      setBtnLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout header={true}>
      {social_data &&
        openNotification(
          `${social_data.type ? social_data.type : ''} Login Successful`,
          `${social_data?.name} ( ${social_data?.email} ) , Verify your phone number to proceed futher !`
        )}
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
          <Typography>
            <Title level={4}>Enter your phone number</Title>
            <p>Whatsapp number recommended</p>
          </Typography>
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              { max: 10, min: 10, message: 'Please enter valid phone number!' },
            ]}
            initialValue={params.phone}
          >
            <Input
              addonBefore={prefixSelector}
              style={{ width: '100%' }}
              placeholder="Phone number"
              maxLength={10}
              type="number"
            />
          </Form.Item>
        </div>

        <AuthFooter>
          <Form.Item>
            <Button htmlType="submit" disabled={btnLoading} block className="btn-dark">
              Continue
            </Button>
          </Form.Item>
        </AuthFooter>
      </Form>
    </AuthLayout>
  );
};

export default MobileVerification;

const openNotification = (title: string, description: string) => {
  notification.open({
    message: title,
    duration: 10,
    description: description,
    icon: <SmileOutlined style={{ color: colors['link-color'] }} />,
  });
};
