import React from 'react';
import { Form, Input, Button, Radio, Typography, Modal, Steps, Select, Switch } from 'antd';
import {
  HomeOutlined,
  LineOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined,
  LockOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import AuthLayout from '../../../layouts/auth';
const { confirm } = Modal;
const { Title, Paragraph } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

export default function CreateUserStepTwo() {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = async (values: any) => {
    const data = {
      city: values.city,
      community: values.community,
      height: values.height,
      marital_status: values.marital_status,
      highest_attained: values.highest_attained,
      college_name: values.college_name,
      workplace: values.workplace,
      designation: values.designation,
      salary_range: values.salary_range
    };
    console.log(data);
    if (data) showConfirm(data);
  };

  const showConfirm = (data: any) => {
    confirm({
      title: ' Please confirm your info ',
      content: ` Live in ${data.city}, Belong to ${data.community} community and your height is ${
        data.height
      }cm`,
      cancelText: 'Edit',
      onOk() {
        console.log('OK');
        history.push('/user/create/success');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout>
      <Steps current={1} direction="horizontal" className="newuser-steps">
        <Steps.Step title="" description="" />
        <Steps.Step />
        <Steps.Step />
        <Steps.Step />
      </Steps>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        form={form}
      >
        <br />
        <Typography>
          <Title level={3} className="text-center text-muted">
            {' '}
            <HomeOutlined /> {} Let’s talk about home{' '}
          </Title>
        </Typography>
        <br />

        <Typography>
          <Title level={2}>Where do you live? </Title>
        </Typography>
        <Form.Item
          name="city"
          rules={[{ required: true, message: 'Please input your city name!' }]}
        >
          <Input placeholder="Enter City Name" />
        </Form.Item>

        <br />
        <Typography>
          <Title level={3} className="text-center text-muted">
            <LineOutlined /> <UserOutlined /> Tell us about yourself <LineOutlined />
          </Title>
        </Typography>
        <br />

        <Typography>
          <Title level={2}>What’s your community?</Title>
        </Typography>
        <Form.Item
          name="community"
          rules={[{ required: true, message: 'Please Select community!' }]}
        >
          <Select placeholder="Select community">
            <Select.Option value="Sikhs">Sikhs</Select.Option>
            <Select.Option value="Hindu">Hindu</Select.Option>
            <Select.Option value="Muslims">Muslims</Select.Option>
            <Select.Option value="Christians">Christians</Select.Option>
            <Select.Option value="Zoroastrians">Zoroastrians</Select.Option>
            <Select.Option value="Buddhists">Buddhists</Select.Option>
            <Select.Option value="Jains">Jains</Select.Option>
            <Select.Option value="other">Other Community</Select.Option>
          </Select>
        </Form.Item>

        <br />

        <Typography>
          <Title level={2}>How tall are you? </Title>
          <Paragraph>
            We have noticed that members do not respond to Profiles with hidden height{' '}
          </Paragraph>
        </Typography>
        <Form.Item
          name="height"
          rules={[{ required: true, message: 'Please input your height in cm!' }]}
        >
          <Input placeholder="178cm" type="number" min="100" max="300" />
        </Form.Item>
        <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        />
        <br />

        <Typography>
          <Title level={2}>What’s your marital status?</Title>
        </Typography>
        <Form.Item
          name="marital_status"
          rules={[{ required: true, message: 'Please Select your marital status!' }]}
        >
          <Select placeholder="Select marital status">
            <Select.Option value="Married">Married</Select.Option>
            <Select.Option value="Widowed">Widowed</Select.Option>
            <Select.Option value="Separated">Separated</Select.Option>
            <Select.Option value="Divorced">Divorced</Select.Option>
            <Select.Option value="Single">Single</Select.Option>
          </Select>
        </Form.Item>

        <br />
        <Typography>
          <Title level={3} className="text-center text-muted">
            <LineOutlined /> <SafetyCertificateOutlined /> Academic Background <LineOutlined />
          </Title>
        </Typography>
        <br />

        <Typography>
          <Title level={2}>What’s the highest level you attained?</Title>
        </Typography>
        <Form.Item name="highest_attained">
          <Radio.Group buttonStyle="solid" defaultValue="Undergrad">
            <Radio.Button value="School">School</Radio.Button>
            <Radio.Button value="Undergrad">Undergrad</Radio.Button>
            <Radio.Button value="Postgrad">Postgrad</Radio.Button>
            <Radio.Button value="Doctrate">Doctrate</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        />
        <br />

        <Typography>
          <Title level={2}>Where did you go to college? </Title>
        </Typography>
        <Form.Item
          name="college_name"
          rules={[{ required: true, message: 'Please input your college name!' }]}
        >
          <Input placeholder="College" />
        </Form.Item>
        <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        />
        <br />
        <Typography>
          <Title level={3} className="text-center text-muted">
            <LineOutlined /> <ShoppingOutlined /> Work life details <LineOutlined />
          </Title>
        </Typography>
        <br />

        <Typography>
          <Title level={2}>Where do you work? </Title>
        </Typography>
        <Form.Item
          name="workplace"
          rules={[{ required: true, message: 'Please input your workplace!' }]}
        >
          <Input placeholder="Workplace" />
        </Form.Item>
        <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        />
        <br />

        <Typography>
          <Title level={2}>And what’s your designation? </Title>
        </Typography>
        <Form.Item
          name="designation"
          rules={[{ required: true, message: 'Please input your designation!' }]}
        >
          <Input placeholder="Designation" />
        </Form.Item>
        <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        />
        <br />

        <Typography>
          <Title level={2}>Your salary range? </Title>
        </Typography>
        <Form.Item
          name="salary_range"
          rules={[{ required: true, message: 'Please Select your salary range!' }]}
        >
          <Select placeholder="Select salary range">
            <Select.Option value="10000">Under 10,000/month</Select.Option>
            <Select.Option value="10000-30000">10,000 to 30,000</Select.Option>
            <Select.Option value="30000-60000">30,000 to 60,000</Select.Option>
            <Select.Option value="60000-90000">60,000 to 90,000</Select.Option>
            <Select.Option value="90000-100000">90,000 to 100,000</Select.Option>
            <Select.Option value="90000-100000">100,000</Select.Option>
            <Select.Option value="100K-150K">100K to 150K</Select.Option>
            <Select.Option value="150K-200K">150K to 200K</Select.Option>
            <Select.Option value="200K-300K">200K to 300K</Select.Option>
            <Select.Option value="300K-400K">300K to 400K</Select.Option>
            <Select.Option value="400K-500K">400K to 500K</Select.Option>
            <Select.Option value="500K">500K +</Select.Option>
          </Select>
        </Form.Item>
        <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        />

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}
