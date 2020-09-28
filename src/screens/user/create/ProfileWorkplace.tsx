import React, { Dispatch, useState } from 'react';
import { Form, Button, Typography, message } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory } from 'react-router-dom';
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

const ProfileWorkplace = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  const user = props.user;

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
      history.push('/user/create/great-job');
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

  return (
    <AuthLayout header={true}>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Typography.Title level={4}>
            {renderTitle(user.sub_role, 'workplace_title', user.profile.gender, user.profile.name)}
          </Typography.Title>
        </Typography>
        <Workplace />

        {step >= 1 && step <= 2 && (
          <>
            <Typography>
              <Typography.Title level={4}>
                {renderTitle(user.sub_role, 'designation_title', user.gender, user.profile.name)}
              </Typography.Title>
            </Typography>
            <Designation />
          </>
        )}

        {step >= 2 && (
          <>
            <Typography>
              <Typography.Title level={4}>
                {renderTitle(user.sub_role, 'salary_title', user.gender, user.profile.name)}{' '}
              </Typography.Title>
            </Typography>
            <Salary />
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
