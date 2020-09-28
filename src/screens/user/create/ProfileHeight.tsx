import React from 'react';
import { Form, Button, Typography } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
import { getHeightFromValue, renderTitle } from '@utils/helpers';
import Height from '../../../components/form/Height';

const ProfileHeight = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { state } = useLocation();

  const onFinish = async (values: any) => {
    const data = {
      ...state,
      height: getHeightFromValue(values.c_height),
    };
    history.push('/user/create/profile-location', data);
  };

  return (
    <AuthLayout header={true}>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Typography.Title level={4}>
            {renderTitle(state.signAs, 'height_title', state.gender, state.full_name)}
          </Typography.Title>
          {/* <p className="hints">Tip: Height Guide</p> */}
        </Typography>
        <Height />
        <AuthFooter>
          <Button htmlType="submit" block className="btn-dark">
            Continue
          </Button>
        </AuthFooter>
      </Form>
    </AuthLayout>
  );
};

export default ProfileHeight;
