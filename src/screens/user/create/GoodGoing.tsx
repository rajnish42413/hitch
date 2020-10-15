import React from 'react';
import { Button, Typography } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { Link, useHistory, useLocation } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';

const logo = require('../../../assets/icons/education.svg');

const { Title } = Typography;

const GoodGoing = (props: any) => {
  const history = useHistory();
  const { state } = useLocation();
  const onFinish = () => {
    history.push('/user/create/profile-education');
  };

  return (
    <AuthLayout header={false}>
      <div className="mt-4">
        <img src={logo} alt="welcomeImage" height="auto" />
        <Typography>
          <Title level={4}>
            Good going {state?.full_name}! <br /> Tell us about your education.
            <p style={{ marginTop: '1rem' }} className="text-muted">
              Your education details can elevate you above others
            </p>
          </Title>
        </Typography>
      </div>
      <AuthFooter>
        <Button block onClick={onFinish} className="btn-dark">
          Continue
        </Button>
        <Link to="/home">
          <button type="button" className="btn-dark-text">
            Do it later
          </button>
        </Link>
      </AuthFooter>
    </AuthLayout>
  );
};

export default GoodGoing;
