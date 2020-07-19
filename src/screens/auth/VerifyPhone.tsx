import React, { useState } from 'react';
import { Form, Button, Row, Col, Typography, Input, Statistic, Modal, message } from 'antd';
import AuthLayout from '../../layouts/auth';
import './Auth.scss';
import { RightOutlined } from '@ant-design/icons';
import { colors } from '../../constants/general';
import { useHistory } from 'react-router-dom';

const { Title, Paragraph } = Typography;
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 0 + 1000 * 30 * 3;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const VerifyPhone = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [counter, setCounter] = useState(false);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    message.success('Verified and good to go!', 5);
    history.push('/user/welcome');
  };

  function onFinishDeadLine() {
    setCounter(true);
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const resendOTP = () => {
    Modal.success({
      content: 'Sending verification code again!'
    });
  };

  return (
    <AuthLayout>
      <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col xs={20} sm={20} md={12} lg={12} xl={10} className="h-100">
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
                <Title level={4} style={{ textAlign: 'center' }}>
                  Enter your verification code
                </Title>
                <Paragraph style={{ textAlign: 'center', color: colors['mutted-color'] }}>
                  Sent to 98XXX-XXXXX
                </Paragraph>
              </Typography>
              <br />

              <Form.Item
                name="otp"
                rules={[
                  { required: true, message: 'Enter 6 digit OTP' },
                  { max: 6, min: 6, message: 'Please enter valid phone number!' }
                ]}
              >
                <Input
                  style={{ width: '100%' }}
                  placeholder="6 digit OTP"
                  maxLength={6}
                  type="number"
                />
              </Form.Item>

              {counter ? (
                <Button type="link" className="button-resend" onClick={resendOTP}>
                  Resend OTP
                </Button>
              ) : (
                <Countdown
                  title=""
                  value={deadline}
                  onFinish={onFinishDeadLine}
                  className="counter"
                />
              )}
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
        </Col>
      </Row>
    </AuthLayout>
  );
};

export default VerifyPhone;
