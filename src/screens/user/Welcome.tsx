import React from 'react';
import { Button, Row, Col, Typography } from 'antd';
import AuthLayout from '../../layouts/auth';
import welcomeImage from '.././../assets/images/hitch-welcome-screen.png';
import { useHistory } from 'react-router';

const { Title } = Typography;

const Welcome = (props: any) => {
  const history = useHistory();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    history.push('/user/create/step-1');
  };

  return (
    <AuthLayout>
      <Row justify="center" align="middle" style={{ height: '100vh', overflowY: 'hidden' }}>
        <Col xs={20} sm={20} md={12} lg={12} xl={10}>
          <div className="mx-3 mt-4">
            <Typography>
              <Title level={3}>
                Welcome to Hitch! <br />
                <p style={{ marginTop: '2rem' }}>
                  {' '}
                  App for the life partner you are searching for{' '}
                </p>
              </Title>
            </Typography>
          </div>

          <img src={welcomeImage} alt="welcomeImage" height="auto" className="image-w100" />
          <Button type="primary" size="large" block onClick={onFinish} className="button-bottom">
            Continue
          </Button>
        </Col>
      </Row>
    </AuthLayout>
  );
};

export default Welcome;
