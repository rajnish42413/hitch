import React, { useEffect, useState } from 'react';
import { Layout, Form, Select, Typography, Button, List, Tag, Input, message } from 'antd';
import AppLayout from '../../layouts/app';
import { IMember } from '../../schemas/IProfile';
import Axios from 'axios';
import { lowerStrings } from '@utils/helpers';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import TopHeader from '../find/Header';

const { Content } = Layout;

const ProfileUsers = (props: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [members, setMemebers] = useState([] as Array<IMember>);
  const [countryCode, setCountryCode] = useState('+91');
  const [btnLoading, setBtnLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const { data } = await Axios.get(`user/members`);
    if (data && props.user) {
      const profile = props.user.profile;
      data.push({
        countryCode: profile?.countryCode,
        created_at: profile?.created_at,
        date_of_birth: profile?.date_of_birth,
        email: profile?.email,
        gender: profile?.gender,
        id: profile?.id,
        name: profile?.name,
        parent_id: profile?.parent,
        phone: profile?.phone,
        role: profile?.role,
        source: profile?.source,
        status: profile?.status,
        sub_role: profile?.sub_role,
        updated_at: profile?.updated_at,
      });
    }
    setMemebers(data);
    setLoading(false);
  };

  const handleSelectCountry = (value: string) => {
    setCountryCode(value);
  };

  const onFinish = async (values: any) => {
    values = lowerStrings(values);
    setBtnLoading(true);
    let show = message.loading('Sending Invitation ...', 0);
    try {
      await Axios.post('user/members', values);
      setTimeout(show, 0);
      setBtnLoading(false);
      message.success('Invitation send successfully');
    } catch (error) {
      setTimeout(show, 0);
      if (error.response.data.errors) {
        setBtnLoading(false);
        const { sub_role, phone } = error.response.data.errors;
        if (sub_role) message.warning(sub_role?.[0]);
        if (phone) message.warning(phone?.[0]);
      }
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select onChange={handleSelectCountry} defaultValue={countryCode}>
        <Select.Option value="+91">+91</Select.Option>
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppLayout>
      <TopHeader backHeadertitle="Profile Users" backTo="/profile" backHeader={true} />
      {props.user && (
        <Content style={{ padding: '20px' }}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            form={form}
          >
            <Typography style={{ padding: '20px', marginTop: 0, textAlign: 'center' }}>
              <Typography.Title level={4}>Add user to profile</Typography.Title>
            </Typography>
            <Form.Item name="sub_role" rules={[{ required: true, message: 'Please user!' }]}>
              <Select placeholder="Select Signing up a">
                <Select.Option value="Father">Father</Select.Option>
                <Select.Option value="Mother">Mother</Select.Option>
                <Select.Option value="Brother">Brother</Select.Option>
                <Select.Option value="Sister">Sister</Select.Option>
                <Select.Option value="Self">Self</Select.Option>
                <Select.Option value="Guardian">Guardian</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Please input your phone number!' },
                { max: 10, min: 10, message: 'Please enter valid phone number!' },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
                placeholder="Phone number"
                maxLength={10}
                type="number"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={btnLoading}
                disabled={btnLoading}
              >
                Send
              </Button>
            </Form.Item>
          </Form>

          <Typography style={{ padding: '20px' }}>
            <Typography.Title level={4}>List of Users</Typography.Title>
          </Typography>
          <List
            bordered
            loading={loading ? true : false}
            dataSource={members}
            renderItem={(member: any) => (
              <List.Item>
                <div
                  style={{ display: 'inline-block', float: 'left', textTransform: 'capitalize' }}
                >
                  {`${member.sub_role + ' '}`}
                  {member.role === 'profile' && (
                    <>
                      <Tag color="magenta"> Profile</Tag>
                      <Tag color="magenta"> Created by {member.sub_role}</Tag>
                    </>
                  )}
                  {props.user.id === member.id && <Tag>Self</Tag>}
                </div>
                <div style={{ display: 'inline-block', float: 'right' }}>{member.phone}</div>
              </List.Item>
            )}
          />
        </Content>
      )}
    </AppLayout>
  );
};

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps)(ProfileUsers);
