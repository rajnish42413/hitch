import React, { Dispatch, useState } from 'react';
import { Form, Button, Typography, message } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
import { renderTitle } from '@utils/helpers';
import Community from '../../../components/form/Community';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import { IUser } from '../../../schemas/IUser';
import { connect } from 'react-redux';
import Axios from 'axios';

const ProfileCommunity = (props: any) => {
  const [form] = Form.useForm();
  const [btnLoading, setBtnLoading] = useState(false);
  const history = useHistory();
  const { state } = useLocation();
  console.log(state);

  const onFinish = async (values: any) => {
    const data = {
      ...state,
      community: values.community,
      sub_role: state.signAs,
    };

    handleSubmit(data);
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
      history.push('/user/create/good-going', data);
    } catch (error) {
      console.log(error);
      setTimeout(show, 0);
      if (error.response?.data?.errors) {
        const { full_name, community } = error.response.data.errors;
        if (full_name) message.warning(full_name[0]);
        if (community) message.warning(community[0]);
      }
      setBtnLoading(false);
    }
  };

  return (
    <AuthLayout header={true}>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Typography.Title level={4}>
            {renderTitle(state.signAs, 'community_title', state.gender, state.full_name)}
          </Typography.Title>
        </Typography>
        <Community />
        <AuthFooter>
          <Button htmlType="submit" block className="btn-dark" loading={btnLoading}>
            Continue
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCommunity);
