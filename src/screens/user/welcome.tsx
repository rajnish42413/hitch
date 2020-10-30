import React from 'react';
import { Button, Typography } from 'antd';
import AuthLayout from '../../layouts/auth';
import welcomeImage from '.././../assets/images/hitch-welcome-screen.svg';
import { useHistory } from 'react-router-dom';
import AuthFooter from '../../layouts/auth/footer';

const { Title } = Typography;

const Welcome = (props: any) => {
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    history.push('/user/create/profile-for');
  };

  return (
    <AuthLayout header={false}>
      <Typography style={{ zIndex: 9, position: 'absolute', marginTop: '3rem' }}>
        <Title level={4} className="mt-4" style={{ fontSize: '24px' }}>
          Welcome to PAKKI JODI! <br />
          <p style={{ marginTop: '2rem', fontSize: '27px' }}>
            {' '}
            App for the life partner <br /> you are searching for{' '}
          </p>
        </Title>
      </Typography>
      <img src={welcomeImage} alt="welcomeImage" height="auto" className="image-w100" />
      <AuthFooter>
        <Button block onClick={onFinish} className="btn-dark">
          Continue
        </Button>
      </AuthFooter>
    </AuthLayout>
  );
};

export default Welcome;
