import React, { useEffect } from 'react';
import useWindowSize from '../../hooks/useSize';
import * as auth from '@utils/userAuth';
import { useHistory } from 'react-router-dom';
import Login from '../auth/Login';

const PageSkeleton = React.lazy(() => import('./pageSkeleton'));

export default function LandingPage(props: any) {
  const history = useHistory();
  useEffect(() => {
    const handleLogin = () => {
      const token = auth.get();
      const user = JSON.parse(auth.getUser());
      if (user && token) {
        history.replace('/home');
      }
    };
    handleLogin();
  }, [history]);
  const size = useWindowSize();
  if (size.width <= 768) return <Login />;
  else return <PageSkeleton className="pj-main" homePage={true} defaultLoginModal={true} />;
}
