import React, { Dispatch, useEffect, useState } from 'react';
import { Form, Button, Typography, Input, Statistic, Modal, message } from 'antd';
import AuthLayout from '../../layouts/auth';
import { colors } from '../../constants/general';
import { useHistory, useLocation } from 'react-router-dom';
import Axios from 'axios';
import * as authToken from '@utils/userAuth';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { IUser } from '../../schemas/IUser';
import { IAction, SetUser, SetUserQuestionAnswer } from '@redux/actions';
import { IAppState } from '@redux/reducers';
import firebase from '../../firebase/config';
import AuthFooter from '../../layouts/auth/footer';
import { IQuestion } from '../../schemas/IQuestion.d';

const { Title } = Typography;
const { Countdown } = Statistic;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const VerifyPhone = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [counter, setCounter] = useState(true);
  const location = useLocation();
  const { phone, countryCode } = location.state;
  const [btnLoading, setBtnLoading] = useState(false);
  const [deviceToken, setDeviceToken] = useState('');

  const getToken = async () => {
    if (firebase.messaging()) {
      const msg = firebase.messaging();
      msg
        .requestPermission()
        .then(() => {
          return msg.getToken();
        })
        .then((data) => {
          setDeviceToken(data);
          console.log(data);
        });
    }
  };

  useEffect(() => {
    if (!phone) history.go(-1);
    setCounter(true);
    getToken();
    return () => {
      setCounter(false);
    };
  }, [phone, history]);

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
          getProfileStatus(login_profile?.detail);
        },
      });
    } else {
      getProfileStatus(login_profile?.detail);
      return;
    }
  };

  const getProfileStatus = async (detail: boolean) => {
    const [firstResponse, secondResponse] = await Promise.all([
      Axios.get(`user/profile/status`),
      Axios.get(`questions`),
    ]);
    props.setUserQuestionAnswer(secondResponse.data);
    const data = firstResponse.data;
    if (data) {
      switch (data?.action) {
        case 'add_basic_detail':
          history.push('/user/welcome');
          break;
        case 'add_workplace_detail':
          history.replace('/user/create/well-done');
          break;
        case 'add_educations_detail':
          history.replace('/user/create/good-going');
          break;
        case 'add_images':
          history.push('/user/create/great-job');
          break;
        case 'add_profile_introduction':
          history.replace('/user/introduction');
          break;
        default:
          history.replace('/home');
          break;
      }
      return;
    }
    handleLoginRedirectWithoutData(detail);
  };

  const handleLoginRedirectWithoutData = (detail: boolean) => {
    if (detail) {
      message.success('Verified and good to go!');
      history.push('/home');
      return;
    }
    message.success('Account Verified Successfully');
    history.push('/user/welcome');
    return;
  };

  const onFinish = async (values: any) => {
    setBtnLoading(true);
    const { otp } = values;
    let show = message.loading('Verifying OTP ...', 0);
    try {
      const { data } = await Axios.post(`login`, {
        phone: phone,
        otp: otp,
        device_token: deviceToken,
      });
      setTimeout(show, 0);
      const { user, token } = data;
      const { profile } = user;
      authToken.storeToken(token);
      props.setUser(user);
      const redirect_profile = authToken.getProfileRedirect();
      handleRedirectToProfile(redirect_profile, profile);
      return;
    } catch (error) {
      let otp_error = error.response?.data?.errors?.otp;
      if (otp_error) message.warning(otp_error?.[0]);
      setTimeout(show, 0);
      setBtnLoading(false);
    }
  };

  const resendOTP = async () => {
    setBtnLoading(true);
    let show = message.loading('Sending verification code again!', 0);
    await Axios.post(`resend-otp`, {
      phone: phone,
      countryCode: location.state.countryCode,
    });
    setTimeout(show, 0);
    setBtnLoading(false);
    setCounter(true);
    message.success('OTP send successfully');
  };

  function onFinishDeadLine() {
    setCounter(false);
    console.log(counter);
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const confirmResendOTP = () => {
    Modal.confirm({
      title: 'Do you want to re-send OTP?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        resendOTP();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <AuthLayout header={true}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        size="large"
        form={form}
        className="h-100"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Typography>
          <Title level={4}>
            Enter OTP sent to you on <br />
            {countryCode || '+91'}-{phone}
          </Title>
        </Typography>

        <Form.Item
          name="otp"
          rules={[
            { required: true, message: 'Please enter valid OTP!' },
            { max: 6, min: 6, message: 'Enter 6 digit OTP!' },
          ]}
        >
          <Input style={{ width: '100%' }} placeholder="6 digit OTP" type="number" />
        </Form.Item>

        <div className="flex-row">
          {!counter ? (
            <button
              type="button"
              className="btn-text"
              style={{ color: colors['link-color'], fontSize: '0.9em' }}
              onClick={confirmResendOTP}
            >
              Resend OTP
            </button>
          ) : (
            <Countdown
              title=""
              value={Date.now() + 1000 * 60 * 60 * 24 * 0 + 1000 * 30 * 3}
              onFinish={onFinishDeadLine}
              className="counter"
            />
          )}
          <button
            type="button"
            className="btn-text"
            style={{ color: colors['link-color'], fontSize: '0.9em' }}
            onClick={() => history.go(-1)}
          >
            Edit phone number
          </button>
        </div>

        <AuthFooter>
          <Form.Item>
            <Button htmlType="submit" disabled={btnLoading} block className="btn-dark">
              Continue
            </Button>
          </Form.Item>
        </AuthFooter>
      </Form>
    </AuthLayout>
  );
};

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setUser: (data: IUser) => dipatch(SetUser(data)),
    setUserQuestionAnswer: (data: Array<IQuestion>) => dipatch(SetUserQuestionAnswer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPhone);
