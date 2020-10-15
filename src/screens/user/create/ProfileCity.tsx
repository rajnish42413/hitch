import React, { useState } from 'react';
import { Form, Button, Typography } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';
import { renderTitle } from '@utils/helpers';
import LocationAutoComplete from '../../../components/form/LocationAutoComplete';

const ProfileCity = (props: any) => {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [city, setCity] = useState('');

  const [form] = Form.useForm();
  const history = useHistory();
  const { state } = useLocation();

  const onFinish = async (values: any) => {
    const data = {
      ...state,
      city: city,
      latitude: lat,
      longitute: long,
    };
    history.push('/user/create/profile-community', data);
  };

  return (
    <AuthLayout header={true}>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Typography.Title level={4}>
            {renderTitle(state?.signAs, 'city_title', state?.gender, state?.full_name)}
          </Typography.Title>
        </Typography>
        <LocationAutoComplete
          setCity={(value: string) => setCity(value)}
          setLong={(value: number) => setLong(value)}
          setLat={(value: number) => setLat(value)}
        />
        <AuthFooter>
          <Button htmlType="submit" block className="btn-dark">
            Continue
          </Button>
        </AuthFooter>
      </Form>
    </AuthLayout>
  );
};

export default ProfileCity;
