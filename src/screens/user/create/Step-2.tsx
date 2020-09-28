import React, { Dispatch, useState } from 'react';
import { Form, Button, Typography, message } from 'antd';
import {
  HomeOutlined,
  LineOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import AuthLayout from '../../../layouts/auth';
import { RightOutlined } from '@ant-design/icons';
import CustomStepper from '../../../components/CustomStepper';
import Axios from 'axios';
import Workplace from '../../../components/form/Workplace';
import Designation from '../../../components/form/Designation';
import Salary from '../../../components/form/Salary';
import Community from '../../../components/form/Community';
import Height from '../../../components/form/Height';
import MaritialStatus from '../../../components/form/MaritialStatus';
import EducationLevel from '../../../components/form/EducationLevel';
import { getHeightFromValue } from '@utils/helpers';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import { IUser } from '../../../schemas/IUser';
import SkipScreen from '../../../components/form/SkipScreen';
import LocationAutoComplete from '../../../components/form/LocationAutoComplete';
import { renderTitle } from './Step-1';

const { Title } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function CreateUserStepTwo(props: any) {
  const [form] = Form.useForm();
  const history = useHistory();
  const { user } = props;
  const location = useLocation();
  const oldData = location.state;
  const [btnLoading, setBtnLoading] = useState(false);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [city, setCity] = useState('');

  const onFinish = async (values: any) => {
    const data = {
      city: city,
      latitude: lat,
      longitute: long,
      community: values.community,
      height: getHeightFromValue(values.c_height),
      marital_status: values.marital_status,
      max_education: values.max_education,
      college_name: values.college_name,
      workplace: values.workplace,
      designation: values.designation,
      salary_range: values.salary_range,
    };
    let updatedData = {};
    if (location.state) {
      updatedData = { ...data, ...location.state };
    } else {
      const old = {
        full_name: user.name,
        email: user.email,
        gender: user.gender,
        dob: user.date_of_birth,
        sub_role: user.sub_role,
      };
      updatedData = { ...data, ...old };
    }
    if (data) showConfirm(updatedData);
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
      history.push('/user/create/success');
    } catch (error) {
      setTimeout(show, 0);
      if (error.response.data.errors) {
        const { phone, full_name, max_education } = error.response.data.errors;
        if (phone) message.warning(phone[0]);
        if (full_name) message.warning(full_name[0]);
        if (max_education) message.warning(max_education[0]);
      }
      setBtnLoading(false);
    }
  };

  const showConfirm = (data: any) => {
    handleSubmit(data);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout>
      <CustomStepper totalSteps={4} active={1} />
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        form={form}
        className="user-create-form"
      >
        <Typography>
          <Title level={4} className="text-center text-muted">
            {' '}
            <LineOutlined /> <HomeOutlined /> {} Let’s talk about home <LineOutlined />
          </Title>
        </Typography>

        <Typography>
          <Title level={4}>
            {oldData
              ? renderTitle(oldData.sub_role, 'city_title', oldData.gender, oldData.full_name)
              : renderTitle(user.sub_role, 'city_title', user.gender, user.profile.name)}
          </Title>
        </Typography>
        <LocationAutoComplete
          setCity={(value: string) => setCity(value)}
          setLong={(value: number) => setLong(value)}
          setLat={(value: number) => setLat(value)}
        />

        <Typography>
          <Title level={4}>
            {oldData
              ? renderTitle(oldData.sub_role, 'community_title', oldData.gender, oldData.full_name)
              : renderTitle(user.sub_role, 'community_title', user.gender, user.profile.name)}
          </Title>
        </Typography>
        <Community />

        <Typography>
          <Title level={4} className="text-center text-muted">
            <LineOutlined /> <UserOutlined /> Tell us about yourself <LineOutlined />
          </Title>
        </Typography>
        <br />

        <Typography>
          <Title level={4}>
            {oldData
              ? renderTitle(oldData.sub_role, 'height_title', oldData.gender, oldData.full_name)
              : renderTitle(user.sub_role, 'height_title', user.gender, user.profile.name)}{' '}
          </Title>
          {/* <p className="hints">Tip: Height Guide</p> */}
        </Typography>
        <Height />

        <Typography>
          <Title level={4}>
            {oldData
              ? renderTitle(oldData.sub_role, 'm_status', oldData.gender, oldData.full_name)
              : renderTitle(user.sub_role, 'm_status', user.gender, user.profile.name)}{' '}
          </Title>
        </Typography>
        <br />
        <MaritialStatus />

        <Typography>
          <Title level={4} className="text-center text-muted">
            <LineOutlined /> <SafetyCertificateOutlined /> Academic Background <LineOutlined />
          </Title>
        </Typography>
        <br />
        <Typography>
          <Title level={4}>What’s highest level of education attained?</Title>
        </Typography>
        <EducationLevel />

        <Typography>
          <Title level={4}>And the name of college? </Title>
        </Typography>

        <Typography>
          <Title level={4} className="text-center text-muted">
            <LineOutlined /> <ShoppingOutlined /> Work life details <LineOutlined />
          </Title>
        </Typography>
        <br />
        <Typography>
          <Title level={4}>
            {oldData
              ? renderTitle(oldData.sub_role, 'workplace_title', oldData.gender, oldData.full_name)
              : renderTitle(user.sub_role, 'workplace_title', user.gender, user.profile.name)}{' '}
          </Title>
        </Typography>
        <Workplace />

        <Typography>
          <Title level={4}>
            {oldData
              ? renderTitle(
                  oldData.sub_role,
                  'designation_title',
                  oldData.gender,
                  oldData.full_name
                )
              : renderTitle(
                  user.sub_role,
                  'designation_title',
                  user.gender,
                  user.profile.name
                )}{' '}
          </Title>
        </Typography>
        <Designation />

        <Typography>
          <Title level={4}>
            {oldData
              ? renderTitle(oldData.sub_role, 'salary_title', oldData.gender, oldData.full_name)
              : renderTitle(user.sub_role, 'salary_title', user.gender, user.profile.name)}{' '}
          </Title>
        </Typography>
        <Salary />

        <Form.Item style={{ display: 'block', marginBottom: '20px' }}>
          <SkipScreen to="/home" />
          <Button
            type="primary"
            htmlType="submit"
            shape="circle"
            style={{ float: 'right' }}
            disabled={btnLoading}
            icon={<RightOutlined />}
          />
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserStepTwo);
