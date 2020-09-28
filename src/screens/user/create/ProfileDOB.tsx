import React from 'react';
import { Form, Button, Typography, DatePicker, message } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
import { getAge, renderTitle } from '@utils/helpers';
import moment from 'moment';

const dateFormat = 'DD-MM-YYYY';

const ProfileDOB = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { state } = useLocation();
  console.log(state);

  const onFinish = async (values: any) => {
    const data = {
      ...state,
      dob: values.dob?.format(dateFormat),
      age: getAge(values.dob.format(dateFormat)),
    };

    if (data.age < 18) {
      message.error('Age must be greater than 18 year');
      return;
    }

    console.log(data);
    history.push('/user/create/profile-height', data);
  };

  return (
    <AuthLayout header={true}>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Typography.Title level={4}>
            {' '}
            {renderTitle(props.signAs, 'gender_title', props.gender)}{' '}
          </Typography.Title>
        </Typography>
        <Form.Item
          name="dob"
          rules={[{ required: true, message: 'Please Select the date of birth!' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            showToday={false}
            disabledDate={disabledDate}
            format={dateFormat}
            placeholder="DD-MM-YYYY"
          />
        </Form.Item>
        <AuthFooter>
          <Button htmlType="submit" block className="btn-dark">
            Continue
          </Button>
        </AuthFooter>
      </Form>
    </AuthLayout>
  );
};

export default ProfileDOB;

function disabledDate(current: any) {
  return current && current > moment().endOf('day');
}
