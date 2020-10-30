import React from 'react';
import { Form, Button, Typography, Select } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthFooter from '../../../layouts/auth/footer';

const { Title } = Typography;

const ProfileFor = (props: any) => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values: any) => {
    history.push('/user/create/profile-gender', { signAs: values.subRole });
  };

  return (
    <AuthLayout header={true}>
      <Form name="basic" initialValues={{ remember: true }} form={form} onFinish={onFinish}>
        <Typography>
          <Title level={4}>
            Welcome to made in heaven.
            <br /> Whose profile are you making?
          </Title>
        </Typography>

        <Form.Item
          name="subRole"
          rules={[{ required: true, message: 'Please Select signing up a!' }]}
        >
          <Select placeholder="Select Signing up a">
            <Select.Option value="father">Father</Select.Option>
            <Select.Option value="mother">Mother</Select.Option>
            <Select.Option value="brother">Brother</Select.Option>
            <Select.Option value="sister">Sister</Select.Option>
            <Select.Option value="self">Self</Select.Option>
            <Select.Option value="guardian">Guardian</Select.Option>
          </Select>
        </Form.Item>

        <AuthFooter>
          <Button htmlType="submit" block className="btn-dark">
            Continue
          </Button>

          {/* <button type="button" className="btn-dark-text">
            I have an invite code
          </button> */}
        </AuthFooter>
      </Form>
    </AuthLayout>
  );
};

export default connect(null, null)(ProfileFor);
