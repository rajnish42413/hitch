import React, { useState } from 'react';
import { Form, Input, Button, Typography, DatePicker, Modal, Select, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import AuthLayout from '../../../layouts/auth';
import moment from 'moment';
import { TeamOutlined, LineOutlined } from '@ant-design/icons';
import { getAge } from '@utils/helpers';

const { confirm } = Modal;
const { Title } = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const dateFormat = 'DD-MM-YYYY';

export default function CreateUserStepOne() {
  const [form] = Form.useForm();
  const history = useHistory();
  const [btnLoading, setBtnLoading] = useState(false);
  const [signAs, setSignAs] = useState('');
  const [gender, setGender] = useState('');

  const onFinish = async (values: any) => {
    setBtnLoading(true);
    let show = message.loading('Saving ...', 0);
    const user = {
      full_name: values.firstName + ' ' + values.lastName,
      email: values.email,
      gender: values.gender ?? 'male',
      dob: values.dob?.format(dateFormat),
      sub_role: values.subRole,
      age: getAge(values.dob.format(dateFormat)),
    };

    if (!user.age) {
      message.warning('Please ! ,select age');
      return;
    }

    if (user.age < 18) {
      setTimeout(show, 0);
      message.error('Age must be greater than 18 year');
      setBtnLoading(false);
      return;
    }
    setTimeout(show, 0);
    setBtnLoading(false);
    if (user) showConfirm(user);
  };

  const showConfirm = (user: any) => {
    confirm({
      title: ' Please confirm your info ',
      content: ` ${user.age} years old , Born ${user.dob}`,
      cancelText: 'Edit',
      onOk() {
        history.push('/user/create/step-2', user);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleSigningAsChange = (value: string) => {
    setSignAs(value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout>
      {/* <CustomStepper totalSteps={4} active={0} /> */}

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
          <Title level={4}>Signing up as ...</Title>
        </Typography>
        <Form.Item
          name="subRole"
          rules={[{ required: true, message: 'Please Select signing up a!' }]}
        >
          <Select placeholder="Select Signing up a" onChange={handleSigningAsChange}>
            <Select.Option value="father">Father</Select.Option>
            <Select.Option value="mother">Mother</Select.Option>
            <Select.Option value="brother">Brother</Select.Option>
            <Select.Option value="sister">Sister</Select.Option>
            <Select.Option value="self">Self</Select.Option>
            <Select.Option value="guardian">Guardian</Select.Option>
          </Select>
        </Form.Item>
        <Typography>
          <Title level={4} className="text-center text-muted">
            {' '}
            <LineOutlined /> <TeamOutlined /> {} Profile setup <LineOutlined />
          </Title>
        </Typography>

        <Typography>
          <Title level={4}>{renderTitle(signAs, 'profile_title', 'gender')} </Title>
        </Typography>
        <Form.Item name="gender" initialValue="female">
          <Select onChange={handleGenderChange}>{renderGender(signAs)}</Select>
        </Form.Item>

        <Typography>
          <Title level={4}> {renderTitle(signAs, 'gender_title', gender)} </Title>
        </Typography>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input first name!' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" rules={[{ required: true, message: 'Please input last name!' }]}>
          <Input placeholder="Last Name" />
        </Form.Item>

        <Typography>
          <Title level={4}>{renderTitle(signAs, 'dob_title', gender)}</Title>
          <p className="hints">Tip: This can’t be changed later</p>
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

        <Form.Item style={{ display: 'block', marginBottom: '20px' }}>
          <Button
            type="primary"
            htmlType="submit"
            shape="circle"
            style={{ float: 'right' }}
            disabled={btnLoading}
            icon={<RightOutlined />}
          ></Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}

function disabledDate(current: any) {
  return current && current > moment().endOf('day');
}
interface ITitleProps {
  signAs: string;
  returnType: 'profile_title';
}

export const renderTitle = (
  signAs: string,
  returnType:
    | 'profile_title'
    | 'gender_title'
    | 'dob_title'
    | 'city_title'
    | 'community_title'
    | 'height_title'
    | 'm_status'
    | 'workplace_title'
    | 'salary_title'
    | 'designation_title',
  gender: string,
  name?: string
) => {
  let gender_name = '';
  let profile_title = 'Profile created for my';
  let gender_title = '';
  let dob_title = '';
  let city_title = '';
  let community_title = 'What’s your community?';
  let height_title = 'How tall is you';
  let m_status = '';
  let workplace_title = '';
  let designation_title = '';
  let salary_title = '';
  switch (signAs) {
    case 'father':
      if (gender) gender_name = gender === 'female' ? 'daughter' : 'son';
      gender_title = `And my ${gender_name} name is?`;
      dob_title = `What's your ${gender_name} date of birth ?`;
      city_title = `Where does your ${gender_name}live?`;
      height_title += `r ${gender_name}?`;
      m_status = `What’s your ${gender_name}’s marital status?`;
      workplace_title = `Where is your ${gender_name} working?`;
      designation_title = `And what’s your ${gender_name}’s designation?`;
      salary_title = `And your ${gender_name}’s salary range?`;
      break;
    case 'mother':
      if (gender) gender_name = gender === 'female' ? 'daughter' : 'son';
      gender_title = `And my ${gender_name} name is?`;
      dob_title = `What's your ${gender_name} date of birth ?`;
      city_title = `Where does your ${gender_name} live?`;
      height_title += `r ${gender_name}?`;
      m_status = `What’s your ${gender_name}’s marital status?`;
      workplace_title = `Where is your ${gender_name} working?`;
      designation_title = `And what’s your ${gender_name}’s designation?`;
      salary_title = `And your ${gender_name}’s salary range?`;
      break;
    case 'brother':
      if (gender) gender_name = gender === 'female' ? 'sister' : 'brother';
      gender_title = `And my ${gender_name} name is?`;
      dob_title = `What's your ${gender_name} date of birth ?`;
      city_title = `Where does your ${gender_name} live?`;
      height_title += `r ${gender_name}?`;
      m_status = `What’s your ${gender_name}’s marital status?`;
      workplace_title = `Where is your ${gender_name} working?`;
      designation_title = `And what’s your ${gender_name}’s designation?`;
      salary_title = `And your ${gender_name}’s salary range?`;
      break;
    case 'sister':
      if (gender) gender_name = gender === 'female' ? 'sister' : 'brother';
      gender_title = `And my ${gender_name} name is?`;
      dob_title = `What's your ${gender_name} date of birth ?`;
      city_title = `Where does your ${gender_name} live?'`;
      height_title += `r ${gender_name}?`;
      m_status = `What’s your ${gender_name}’s marital status?`;
      workplace_title = `Where is your ${gender_name} working?`;
      designation_title = `And what’s your ${gender_name}’s designation?`;
      salary_title = `And your ${gender_name}’s salary range?`;
      break;
    case 'guardian':
      profile_title = 'Searching for a';
      gender_title = 'And profile display name will be?';
      dob_title = "What's date of birth for profile?";
      city_title = `Where does ${name} live?`;
      community_title = `What’s ${name}’s community?`;
      height_title = `How tall is ${name}?`;
      m_status = `What’s ${name}’s marital status?`;
      workplace_title = `Where is ${name} working?`;
      designation_title = `And what’s ${name}’s designation?`;
      salary_title = `And ${name}’s salary range?`;
      break;
    default:
      profile_title = 'Searching for a';
      gender_title = 'And profile display name will be?';
      dob_title = "What's your date of birth?";
      city_title = `Where do you live?`;
      community_title = 'What’s your community?';
      height_title = 'How tall are you?';
      m_status = 'What’s your marital status?';
      workplace_title = 'Where do you work?';
      designation_title = 'And what’s your designation?';
      salary_title = `And your salary range?`;
      break;
  }
  if (returnType === 'profile_title') return profile_title;
  if (returnType === 'gender_title') return gender_title;
  if (returnType === 'dob_title') return dob_title;
  if (returnType === 'city_title') return city_title;
  if (returnType === 'community_title') return community_title;
  if (returnType === 'height_title') return height_title;
  if (returnType === 'm_status') return m_status;
  if (returnType === 'workplace_title') return workplace_title;
  if (returnType === 'designation_title') return designation_title;
  if (returnType === 'salary_title') return salary_title;
};

const renderGender = (signAs: string) => {
  switch (signAs) {
    case 'father':
      return (
        <>
          <Select.Option value="female">Daughter</Select.Option>
          <Select.Option value="male">Son</Select.Option>
        </>
      );
    case 'mother':
      return (
        <>
          <Select.Option value="female">Daughter</Select.Option>
          <Select.Option value="male">Son</Select.Option>
        </>
      );
    case 'brother':
      return (
        <>
          <Select.Option value="female">Sister</Select.Option>
          <Select.Option value="male">Brother</Select.Option>
        </>
      );
    case 'sister':
      return (
        <>
          <Select.Option value="female">Sister</Select.Option>
          <Select.Option value="male">Brother</Select.Option>
        </>
      );
    case 'guardian':
      return (
        <>
          <Select.Option value="female">Groom (M)</Select.Option>
          <Select.Option value="male">Bride (F)</Select.Option>
        </>
      );
    default:
      return (
        <>
          <Select.Option value="female">Groom (M)</Select.Option>
          <Select.Option value="male">Bride (F)</Select.Option>
        </>
      );
  }
};
