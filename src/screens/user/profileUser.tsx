import React from 'react';
import { Layout, Form, Select, Typography, Button, List } from 'antd';
import AppLayout from '../../layouts/app';
import BottomFooter from '../home/Footer';
import { ProfileTopHeader } from './profile/index';

const { Content } = Layout;

const ProfileUsers = (props: any) => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {};

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <AppLayout>
      <ProfileTopHeader title="Profile Users" goToback="/profile" />
      <Content style={{ padding: '20px' }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          size="large"
          form={form}
        >
          <Typography style={{ padding: '20px' }}>
            <Typography.Title level={4}>Add user to profile</Typography.Title>
          </Typography>
          <Form.Item name="community" rules={[{ required: true, message: 'Please user!' }]}>
            <Select placeholder="Select Signing up a">
              <Select.Option value="Father">Father</Select.Option>
              <Select.Option value="Mother">Mother</Select.Option>
              <Select.Option value="Brother">Brother</Select.Option>
              <Select.Option value="Sister">Sister</Select.Option>
              <Select.Option value="Self">Self</Select.Option>
              <Select.Option value="Guardian">Guardian</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              Send
            </Button>
          </Form.Item>
        </Form>

        <Typography style={{ padding: '20px' }}>
          <Typography.Title level={4}>List of Users</Typography.Title>
        </Typography>
        <List
          bordered
          dataSource={listdata}
          renderItem={item => (
            <List.Item>
              <div style={{ display: 'inline-block', float: 'left' }}>{item.name}</div>
              <div style={{ display: 'inline-block', float: 'right' }}>{item.phone}</div>
            </List.Item>
          )}
        />
      </Content>
      <BottomFooter />
    </AppLayout>
  );
};
export default ProfileUsers;

const listdata = [
  { name: 'Mother', phone: '880898398' },
  { name: 'Father ', phone: '880898398' },
  { name: 'Brother', phone: '880898398' }
];
