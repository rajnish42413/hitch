import React, { useState } from 'react';
import { Button, Form, Input, Layout, message, Typography } from 'antd';
import Axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import AppLayout from '../..//layouts/app';
import TopHeader from '../find/Header';

const ReportProfile = (props: any) => {
  const [form] = Form.useForm();
  const location = useLocation();
  const { profile_id } = location.state;
  const [btnLoading, setBtnLoading] = useState(false);
  const history = useHistory();

  const onFinish = async (values: any) => {
    if (!profile_id) return;
    const { intro } = values;
    setBtnLoading(true);
    let show = message.loading('Upadting ...', 0);
    try {
      await Axios.post(`user/report-profile`, { reason: intro, profile_id: profile_id });
      setTimeout(show, 0);
      setBtnLoading(false);
      message.success('Reported Successfully');
      history.replace('/home');
    } catch (error) {
      setTimeout(show, 0);
      if (error.response?.data?.errors) {
        const { intro } = error.response.data.errors;
        if (intro) message.warning(intro?.[0]);
      }
      setBtnLoading(false);
    }
  };

  return (
    <AppLayout>
      <TopHeader backHeadertitle="Report User" backTo="/home" backHeader={true} />

      <Layout.Content style={{ padding: '20px' }}>
        {profile_id && (
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            form={form}
          >
            <Typography>
              <Typography.Title level={3}>Write your reason </Typography.Title>
              <Typography.Paragraph>Reason must meet with our terms. </Typography.Paragraph>
            </Typography>

            <Form.Item
              name="intro"
              rules={[{ required: true, message: 'Please input your reason!' }]}
            >
              <Input.TextArea
                rows={5}
                placeholder="Here goes your reason"
                maxLength={255}
                minLength={50}
              />
            </Form.Item>
            <br />
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                disabled={btnLoading}
                loading={btnLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </Layout.Content>
    </AppLayout>
  );
};

export default ReportProfile;
