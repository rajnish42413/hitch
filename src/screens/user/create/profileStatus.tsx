import React, { Dispatch, useState } from 'react';
import { Form, Button, Typography, message } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
import { renderTitle } from '@utils/helpers';
import MaritialStatus from '../../../components/form/MaritialStatus';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import { IUser } from '../../../schemas/IUser';
import { connect } from 'react-redux';
import Axios from 'axios';

const ProfileStatus = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [btnLoading, setBtnLoading] = useState(false);
  const { state } = useLocation();
  const user = props.user;
  const edit = state?.edit;

  const onFinish = async (values: any) => {
    if (edit) {
      const value = {
        ...user.profile.detail,
        full_name: user.profile?.name,
        email: user.profile?.email,
        gender: user.profile?.gender,
        dob: user.profile.date_of_birth,
        sub_role: user.profile?.sub_role,
        marital_status: values.marital_status,
      };

      handleSubmit(value);
      return;
    }
    const data = {
      ...state,
      marital_status: values.marital_status,
    };
    history.push('/user/create/profile-dob', data);
  };

  const handleSubmit = async (values: any) => {
    setBtnLoading(true);
    let show = message.loading('Saving ...', 0);
    try {
      const { data } = await Axios.post('user/profile/update', values);
      setTimeout(show, 0);
      props.setUser(data);
      setBtnLoading(false);
      message.success('Profile updated successfully');
      history.go(-1);
    } catch (error) {
      setTimeout(show, 0);
      setBtnLoading(false);
    }
  };

  return (
    <AuthLayout header={true}>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Typography.Title level={4}>
            {state?.sub_role && state?.gender
              ? renderTitle(state?.sub_role, 'm_status', state?.gender, state?.name)
              : renderTitle(user?.sub_role, 'm_status', user?.profile?.gender, user?.profile?.name)}
          </Typography.Title>
        </Typography>
        <br />
        <MaritialStatus initialValue={user.profile?.detail?.marital_status} />
        <AuthFooter>
          <Button htmlType="submit" block className="btn-dark" loading={btnLoading}>
            {edit ? 'Save ' : 'Continue'}
          </Button>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileStatus);
