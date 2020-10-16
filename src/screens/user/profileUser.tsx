import React, { useEffect, useState } from 'react';
import { Layout, Form, Select, Typography, Button, List, Tag, Input, message, Drawer } from 'antd';
import AppLayout from '../../layouts/app';
import { IMember } from '../../schemas/IProfile';
import Axios from 'axios';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import TopHeader from '../find/Header';
import FamailyPhoto from '../../assets/images/family.svg';
import CopyToClipboard from 'react-copy-to-clipboard';

const { Content } = Layout;

const ProfileUsers = (props: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [members, setMemebers] = useState([] as Array<IMember>);
  const [countryCode, setCountryCode] = useState('+91');
  const [btnLoading, setBtnLoading] = useState(false);
  const [visibal, setVisibal] = useState(false);
  const add_members_link = props.user.profile?.add_members_link;
  const share_text = `${props?.user.name} want to add as member in there account`;

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
    <Form.Item name="countryCode" noStyle>
      <Select onChange={handleSelectCountry} defaultValue={countryCode}>
        <Select.Option value="+91">+91</Select.Option>
      </Select>
    </Form.Item>
  );

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveMember = (memberID: number) => {
    let show = message.loading('Removing ...', 0);
    try {
      Axios.delete(`user/members/${memberID}`);
      setTimeout(show, 0);
      getData();
      message.success('Member Removed');
    } catch (error) {
      setTimeout(show, 0);
    }
  };

  return (
    <AppLayout>
      <TopHeader backHeadertitle="Add family members" backTo="/profile" backHeader={true} />
      {props.user && (
        <Content>
          <div style={{ ...style, position: 'relative' }}>
            <Typography.Title
              level={4}
              style={{
                color: '#fff',
                textShadow: ' 0px 0px 11px #000000',
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
              }}
            >
              Give friends/family access to your profile
            </Typography.Title>
          </div>

          <div style={{ padding: '15px' }}>
            <Typography>
              <Typography.Title level={4}>Active Members</Typography.Title>
            </Typography>
            <List
              loading={loading ? true : false}
              dataSource={members}
              renderItem={(member: any) => (
                <List.Item className="members-list">
                  <div className="flex-row">
                    <div style={{ display: 'inline-block' }}>
                      <h3>{member.name}</h3>
                      {`${member.sub_role + ' '}`}
                      {member.role === 'profile' && (
                        <div>
                          <Tag color="magenta"> Profile</Tag>
                          <Tag color="magenta"> Created by {member.sub_role}</Tag>
                        </div>
                      )}
                      {props.user.id === member.id && <Tag color="green">Self</Tag>}
                    </div>

                    {member.role === 'user' && (
                      <Button type="text" danger onClick={() => handleRemoveMember(member.id)}>
                        remove
                      </Button>
                    )}
                  </div>
                </List.Item>
              )}
            />
            <button className="btn-red d-block" onClick={() => setVisibal(true)}>
              Add another member <br />
              <p className="text-small">You can add upto 3 more people </p>
            </button>
          </div>
        </Content>
      )}
      <Drawer
        visible={visibal}
        onClose={() => setVisibal(false)}
        closable
        placement="bottom"
        height="75vh"
        title={
          <Typography>
            <Typography.Title level={5}>Invite</Typography.Title>
            <p className="text-small">Give friends/family access to your profile</p>
          </Typography>
        }
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          form={form}
        >
          <Typography.Title level={5}>Who are you inviting?</Typography.Title>
          <Form.Item name="sub_role" rules={[{ required: true, message: 'Please select member!' }]}>
            <Select placeholder="Select Signing up a">
              <Select.Option value="Father">Father</Select.Option>
              <Select.Option value="Mother">Mother</Select.Option>
              <Select.Option value="Brother">Brother</Select.Option>
              <Select.Option value="Sister">Sister</Select.Option>
              <Select.Option value="Self">Self</Select.Option>
              <Select.Option value="Guardian">Guardian</Select.Option>
            </Select>
          </Form.Item>
          <Typography.Title level={5}>What’s their name?</Typography.Title>
          <Form.Item name="name" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input style={{ width: '100%' }} placeholder="Full name" type="text" />
          </Form.Item>

          <Typography.Title level={5}>Phone number</Typography.Title>
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

          <Button
            type="text"
            htmlType="submit"
            block
            size="large"
            loading={btnLoading}
            disabled={btnLoading}
            className="btn-dark"
          >
            Invite (SMS)
          </Button>

          {add_members_link && share_text && navigator.share && (
            <button
              className="btn-dark-text"
              type="button"
              onClick={() => handleShare(share_text, add_members_link)}
            >
              Share Link
            </button>
          )}

          {add_members_link && (
            <CopyToClipboard text={add_members_link} onCopy={() => message.success('copied')}>
              <Button block type="dashed" htmlType="button">
                Copy Link
              </Button>
            </CopyToClipboard>
          )}
        </Form>
      </Drawer>
    </AppLayout>
  );
};

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps)(ProfileUsers);

const style = {
  background: `url(${FamailyPhoto}), linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, #000000 78.32%)`,
  backgroundRepeat: 'no-repeat, repeat',
  backgroundSize: 'cover',
  width: '100%',
  height: '165px',
};

const handleShare = async (share_text: string, url: string) => {
  if (navigator.share) {
    navigator
      .share({
        title: share_text,
        text: share_text,
        url: url,
      })
      .then(() => {
        console.log('Thanks for sharing!');
      })
      .catch((err) => {
        console.log(`Couldn't share because of`, err.message);
      });
  }
};
