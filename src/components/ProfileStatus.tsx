import React, { useState } from 'react';
import { Button, Alert } from 'antd';
import Axios from 'axios';
import { Link } from 'react-router-dom';

interface IProps {
  status: number;
  setUser: any;
  goToProfile?: boolean;
}
export default function ProfileVerificationStatus({
  status,
  setUser,
  goToProfile = false,
}: IProps) {
  const [btnLoading, setbtnLoading] = useState(false);
  const getUser = async () => {
    setbtnLoading(true);
    try {
      const { data } = await Axios.get('user');
      setUser(data);
      setbtnLoading(false);
    } catch (error) {
      setbtnLoading(false);
    }
  };

  if (status === 0) {
    return (
      <Alert
        message={`Your Profile is under processing !`}
        type="warning"
        closable
        className="mt-1"
        description={
          <Button type="link" size="small" onClick={() => getUser()} loading={btnLoading}>
            Refresh
          </Button>
        }
      />
    );
  }
  if (status === 2) {
    return (
      <Alert
        message="Your Profile is under verification !"
        type="warning"
        closable
        description={
          <div className="flex-row">
            <Button type="link" size="small" onClick={() => getUser()} loading={btnLoading}>
              Refresh
            </Button>
            {goToProfile && (
              <Link to="/profile">
                <Button type="link" size="small">
                  Go to Profile
                </Button>
              </Link>
            )}
          </div>
        }
      />
    );
  }
  if (status === 3) {
    return (
      <Alert
        message="Profile not completed. Please complete to activate all services"
        description={
          <div className="flex-row">
            <Button type="link" size="small" onClick={() => getUser()} loading={btnLoading}>
              Refresh
            </Button>
            {goToProfile && (
              <Link to="/profile">
                <Button type="link" size="small">
                  Go to Profile
                </Button>
              </Link>
            )}
          </div>
        }
        type="info"
        showIcon
        className="mt-1"
        closable
      />
    );
  }
  if (status === 4) {
    return (
      <Alert
        message="Your Profile is under re-verification !"
        type="warning"
        closable
        className="mt-1"
        description={
          <div className="flex-row">
            <Button type="link" size="small" onClick={() => getUser()} loading={btnLoading}>
              Refresh
            </Button>
            {goToProfile && (
              <Link to="/profile">
                <Button type="link" size="small">
                  Go to Profile
                </Button>
              </Link>
            )}
          </div>
        }
      />
    );
  }

  if (status === 5) {
    return (
      <Alert
        message="Your Profile rejected by system"
        type="error"
        closable
        className="mt-1"
        description={
          <div className="flex-row">
            <Button type="link" size="small" onClick={() => getUser()} loading={btnLoading}>
              Refresh
            </Button>
            {goToProfile && (
              <Link to="/profile">
                <Button type="link" size="small">
                  Go to Profile
                </Button>
              </Link>
            )}
          </div>
        }
      />
    );
  }
  return null;
}
