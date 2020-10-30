import React, { Dispatch, useState } from 'react';
import { Form, Button, Typography, message } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
import { renderTitle } from '@utils/helpers';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import { IUser } from '../../../schemas/IUser';
import { connect } from 'react-redux';
import Workplace from '../../../components/form/Workplace';
import Designation from '../../../components/form/Designation';
import Salary from '../../../components/form/Salary';
import Axios from 'axios';
import '../../../layouts/styles/app.less';

const ProfileWorkplace = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { state } = useLocation();
  const [btnLoading, setBtnLoading] = useState(false);
  const user = props.user;
  const edit = state?.edit;
  const detail = user.profile?.detail;
  const [step, setStep] = useState(edit ? 2 : 0);

  const onFinish = async (values: any) => {
    const { workplace, designation, salary_range } = values;
    if (workplace) {
      setStep(1);
    }

    if (workplace && designation) {
      setStep(2);
    }
    if (workplace && designation && salary_range) {
      const data = {
        workplace: workplace,
        designation: designation,
        salary_range: salary_range,
      };
      handleSubmit(data);
      return;
    }
  };

  const handleSubmit = async (values: any) => {
    setBtnLoading(true);
    let show = message.loading('Saving ...', 0);
    try {
      const { data } = await Axios.put('profile/workplace', values);
      setTimeout(show, 0);
      props.setUser(data);
      setBtnLoading(false);
      message.success('Profile updated successfully');
      handleRedirect();
    } catch (error) {
      setTimeout(show, 0);
      if (error.response?.data?.errors) {
        const { workplace, salary_range, designation } = error.response.data.errors;
        if (workplace) message.warning(workplace[0]);
        if (salary_range) message.warning(salary_range[0]);
        if (designation) message.warning(designation[0]);
      }
      setBtnLoading(false);
    }
  };

  const handleRedirect = () => {
    if (edit) {
      history.go(-1);
      return;
    }
    history.push('/user/create/great-job');
  };
  console.log(user);

  return (
    <AuthLayout header={true} classsName="auth-header">
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Typography.Title level={4}>
            {renderTitle(
              user.sub_role,
              'workplace_title',
              user.profile?.gender,
              user.profile?.name
            )}
          </Typography.Title>
        </Typography>
        <Workplace initialValue={detail?.workplace} />

        {step >= 1 && step <= 2 && (
          <>
            <Typography>
              <Typography.Title level={4}>
                {renderTitle(
                  user.sub_role,
                  'designation_title',
                  user.profile?.gender,
                  user.profile?.name
                )}
              </Typography.Title>
            </Typography>
            <Designation initialValue={detail?.designation} />
          </>
        )}

        {step >= 2 && (
          <>
            <Typography>
              <Typography.Title level={4}>
                {renderTitle(
                  user.sub_role,
                  'salary_title',
                  user.profile?.gender,
                  user.profile?.name
                )}{' '}
              </Typography.Title>
            </Typography>
            <Salary initialValue={detail?.salary_range} />
          </>
        )}

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWorkplace);
