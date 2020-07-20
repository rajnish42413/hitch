import React from 'react';
import { Form, Button, Row, Col, Typography } from 'antd';
import AuthLayout from '../../layouts/auth';
import './Auth.scss';
import { Link } from 'react-router-dom';
import { colors } from '../../constants/general';

const { Title, Paragraph } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const Login = (props: any) => {
  const [form] = Form.useForm();
  return (
    <AuthLayout backgroundColor={colors['primary-color']}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        size="large"
        form={form}
        className="h-100"
      >
        <br />

        <div className="mt-5">
          <Typography>
            <Title
              level={1}
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: '4rem',
                marginBottom: 0
              }}
            >
              Hitch
            </Title>
            <Paragraph style={{ textAlign: 'center', color: 'white', fontSize: 18 }}>
              Let’s get you married
            </Paragraph>
          </Typography>
        </div>

        <div className="loginOptions">
          <Form.Item>
            <Button htmlType="submit" size="large" block className="button">
              Google Sign In
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              className="button"
              style={{
                backgroundColor: '#425597',
                color: colors['white-color'],
                borderColor: '#425597'
              }}
              block
            >
              Continue with Facebook
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              block
              type="link"
              className="button"
              style={{ color: colors['white-color'] }}
            >
              <Link to="/phone-number">Or continue with a number</Link>
            </Button>
          </Form.Item>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default Login;
