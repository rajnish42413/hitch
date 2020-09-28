import React from 'react';
import { Button, Typography } from 'antd';
import AuthLayout from '../../layouts/auth';
import welcomeImage from '.././../assets/images/hitch-user-welcome-trans.svg';
import { useHistory } from 'react-router-dom';
import AuthFooter from '../../layouts/auth/footer';

const { Title } = Typography;

const UserCreatedWelcome = (props: any) => {
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    history.push('/user/images');
  };

  return (
    <AuthLayout header={false}>
      <Typography className="mt-4">
        <Title level={4}>Profiles with personality leads to better convos</Title>
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

export default UserCreatedWelcome;
