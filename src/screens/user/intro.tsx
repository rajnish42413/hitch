import React, { Dispatch, useState } from 'react';
import { Button, Form, Input, message, Typography } from 'antd';
import AuthLayout from '../../layouts/auth';
import Axios from 'axios';
import Loader from '../../components/loader/Loader';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import { IAction, SetTourVisibility, SetUser } from '@redux/actions';
import { IUser } from 'src/schemas/IUser';
import AuthFooter from '../../layouts/auth/footer';
import { useHistory, useLocation } from 'react-router-dom';

const UserIntro = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [btnLoading, setBtnLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const { state } = useLocation();
  const edit = state?.edit;
  const { user } = props;

  const onFinish = async (values: any) => {
    const profile_id = user.profile?.id;
    const { intro } = values;
    setBtnLoading(true);
    let show = message.loading('Saving ...', 0);
    try {
      const { data } = await Axios.put(`/profiles/${profile_id}/introduction`, { intro: intro });
      setTimeout(show, 0);
      props.setUser(data);
      if (edit) {
        history.go(-1);
        return;
      }
      props.setTourVisibal(true);
      setBtnLoading(false);
      redirectToHome();
    } catch (error) {
      setTimeout(show, 0);
      if (error.response?.data?.errors) {
        const { intro } = error.response.data.errors;
        if (intro) message.warning(intro?.[0]);
      }
      setBtnLoading(false);
    }
  };

  const redirectToHome = () => {
    message.success('Hooray ! Your profile is updated!');
    setUpdated(true);
  };

  return (
    <AuthLayout header={edit ? true : false}>
      {user ? (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          form={form}
          className="mt-1"
        >
          <Typography style={{ textAlign: 'center' }}>
            <Typography.Title level={3}>Write your introduction </Typography.Title>
            <Typography.Paragraph>Good first impressions are nice to have </Typography.Paragraph>
          </Typography>

          <Form.Item
            name="intro"
            rules={[{ required: true, message: 'Please input your introduction!' }]}
            initialValue={user.profile?.detail?.intro}
          >
            <Input.TextArea rows={5} placeholder="Here goes my introduction" maxLength={255} />
          </Form.Item>
          <br />

          <AuthFooter>
            {updated && (
              <>
                <Button className="btn-dark" htmlType="button" block href={`/profiles/${user.id}`}>
                  Profile Preview
                </Button>

                <button
                  className="btn-dark-text"
                  type="button"
                  onClick={() => history.replace('/home')}
                >
                  Go to Home
                </button>
              </>
            )}

            {!updated && (
              <Button className="btn-dark" htmlType="submit" block disabled={btnLoading}>
                {edit ? 'Save' : 'Submit'}
              </Button>
            )}
          </AuthFooter>
        </Form>
      ) : (
        <Loader />
      )}
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
    setTourVisibal: (data: boolean) => dipatch(SetTourVisibility(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserIntro);
