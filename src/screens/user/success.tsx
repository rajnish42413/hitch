import React from 'react';
import { Button, Typography } from 'antd';
import AuthLayout from '../../layouts/auth';
import welcomeImage from '.././../assets/images/hitch-user-welcome.svg';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

const UserCreatedWelcome = (props: any) => {
  const history = useHistory();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    history.push('/user/images');
  };

  return (
    <AuthLayout>
      <div className="mx-3">
        <Typography>
          <Title level={3}>Profiles with personality leads to better convos</Title>
        </Typography>
      </div>

      <img src={welcomeImage} alt="welcomeImage" height="auto" className="image-w100" />
      <Button type="primary" size="large" block onClick={onFinish} className="button-bottom">
        Continue
      </Button>
    </AuthLayout>
  );
};

export default UserCreatedWelcome;
