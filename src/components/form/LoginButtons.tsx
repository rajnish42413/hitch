import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { colors, FB_APP_ID, GOOGLE_APP_ID } from '@constants/general';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import Button from 'antd/lib/button/button';

interface IProps {
  type?: 'pop' ;
}

export default function LoginButtons({ type }: IProps) {
  const history = useHistory();
  const responseGoogle = (response: any) => {
    const { profileObj, accessToken } = response;
    if (accessToken && profileObj) {
      const data = {
        accessToken: accessToken,
        name: profileObj.name,
        email: profileObj.email,
        type: 'Google',
      };
      history.push('/phone-number', data);
    }
  };

  const loginInfoOrFailureResponse = (
    response: ReactFacebookLoginInfo | ReactFacebookLoginInfo
  ) => {
    console.log(response);
    if (response.accessToken) {
      const data = {
        accessToken: response.accessToken,
        name: response.name,
        email: response.email,
        type: 'Facebook',
      };
      history.push('/phone-number', data);
    }
  };

  return (
    <div className={type ? "" : "loginOptions"}>
      <GoogleLogin
        clientId={GOOGLE_APP_ID}
        render={(renderProps) => (
          <Button
            htmlType="submit"
            size="large"
            block
            className={type ? 'btn-google' : 'button'}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Google Sign In
          </Button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />

      <FacebookLogin
        appId={FB_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        callback={loginInfoOrFailureResponse}
        cssClass={type ? 'btn-google' : 'facebook-login-button button'}
        scope="public_profile, email"
      />

      <Button
        htmlType="submit"
        size="large"
        block
        type="link"
        className={type ? 'btn-google' : 'button'}
        style={{ color: colors['white-color'] }}
      >
        <Link to="/phone-number">Or continue with a number</Link>
      </Button>
    </div>
  );
}
