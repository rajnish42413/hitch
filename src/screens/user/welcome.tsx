import React from 'react';
import { Button, Typography } from 'antd';
import AuthLayout from '../../layouts/auth';
import welcomeImage from '.././../assets/images/hitch-welcome-screen.svg';
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
      <Typography style={{ paddingLeft: '2rem' }}>
        <Title level={3}>
          Welcome to Hitch! <br />
          <p style={{ marginTop: '2rem' }}>
            {' '}
            App for the life partner <br /> you are searching for{' '}
          </p>
        </Title>
      </Typography>

      <img src={welcomeImage} alt="welcomeImage" height="auto" className="image-w100" />
      <Button
        type="primary"
        size="large"
        block
        onClick={onFinish}
        className="button-bottom buttom-buttom-1"
      >
        Continue
      </Button>
    </AuthLayout>
  );
};

export default Welcome;
