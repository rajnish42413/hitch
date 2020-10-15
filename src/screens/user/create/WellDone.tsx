import React from 'react';
import { Button, Typography } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { Link, useHistory } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
const logo = require('../../../assets/icons/work.svg');
const WellDone = (props: any) => {
  const history = useHistory();
  const onFinish = () => {
    history.push('profile-workspace');
  };
  return (
    <AuthLayout header={false}>
      <div className="mt-4">
        <img src={logo} alt="welcomeImage" height="auto" />
        <Typography>
          <Typography.Title level={4}>
            Well done! Just one more to go. Tell us about your work life
            <p style={{ marginTop: '1rem' }} className="text-muted">
              80% women want a partner they can look upto professionally
            </p>
          </Typography.Title>
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

export default WellDone;
