import React, { Dispatch, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { colors, FB_APP_ID, GOOGLE_APP_ID } from '@constants/general';
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import * as authToken from '@utils/userAuth';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { message, Modal, Button } from 'antd';
import { IAction, SetUser } from '@redux/actions';
import { connect } from 'react-redux';
import { IUser } from '../../schemas/IUser';

function LoginButtons(props: any) {
  const history = useHistory();
  const [socialLoginLoading, setLoading] = useState(false);

  const handleRedirectToProfile = (profile: any, login_profile: any) => {
    if (profile) {
      Modal.confirm({
        title: `Want to see  profile #PJ${profile}?`,
        icon: <ExclamationCircleOutlined />,
        content: 'Click on ok to see the profile .',
        onOk() {
          authToken.removeProfileRedirect();
          history.replace(`/profiles/${profile}`);
        },
        onCancel() {
          authToken.removeProfileRedirect();
          handleLoginRedirect(login_profile);
        },
      });
    } else {
      handleLoginRedirect(login_profile);
      return;
    }
  };

  const handleLoginRedirect = (profile: any) => {
    if (profile?.detail?.name && profile?.detail?.gender) {
      message.success('Verified and good to go!');
      history.push('/home');
      return;
    }
    message.success('Account Verified Successfully');
    history.push('/user/welcome');
    return;
  };

  const accountVerification = async (values: any) => {
    if (!values.email) {
      history.push('/phone-number', values);
      return;
    }

    setLoading(false);
    let show = message.loading('Verifying account ...', 0);
    try {
      const { data } = await Axios.post('verified-login', { email: values.email });
      setTimeout(show, 0);
      const { user, token } = data;
      const { profile } = user;
      authToken.storeToken(token);
      props.setUser(user);
      const redirect_profile = authToken.getProfileRedirect();
      handleRedirectToProfile(redirect_profile, profile);
    } catch (error) {
      setTimeout(show, 0);
      const { data } = error?.response;
      if (data && data.action === 'verify-otp') {
        history.push('/phone-number', values);
      }

      if (data && data.action === 'fail_account_not_found') {
        history.push('/phone-number', values);
      }
    }
  };

  const responseGoogle = (response: any) => {
    setLoading(true);
    const { profileObj, accessToken } = response;
    if (accessToken && profileObj) {
      const data = {
        provider_id: accessToken,
        name: profileObj.name,
        email: profileObj.email,
        provider_name: 'google',
      };
      if (data.email) accountVerification(data);
    }
  };

  const loginInfoOrFailureResponse = (
    response: ReactFacebookLoginInfo | ReactFacebookLoginInfo
  ) => {
    if (response.accessToken) {
      const data = {
        provider_id: response.accessToken,
        name: response.name,
        email: response.email,
        provider_name: 'facebook',
      };
      if (data.email) accountVerification(data);
    }
  };

  return (
    <div className={props.type ? '' : 'loginOptions'}>
      <GoogleLogin
        clientId={GOOGLE_APP_ID}
        render={(renderProps) => (
          <Button
            htmlType="submit"
            size="large"
            block
            className={props.type ? 'btn-google' : 'button'}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            loading={socialLoginLoading}
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
        cssClass={props.type ? 'btn-google' : 'facebook-login-button button'}
        scope="public_profile, email"
      />

      <Button
        htmlType="submit"
        size="large"
        block
        type="link"
        className={props.type ? 'btn-google' : 'button'}
        style={{ color: colors['white-color'] }}
      >
        <Link to="/phone-number">Or continue with a number</Link>
      </Button>
    </div>
  );
}

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setUser: (data: IUser) => dipatch(SetUser(data)),
  };
};

export default connect(null, mapDispatchToProps)(LoginButtons);