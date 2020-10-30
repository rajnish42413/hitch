import React, { useEffect, useState } from 'react';
import { Form, Button, Typography, Input, message } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthFooter from '../../../layouts/auth/footer';
import { IAppState } from '@redux/reducers';
import Axios from 'axios';
import { IHandle } from '../../../schemas/IProfileHandles.d';
import Loader from '../../../components/loader/Loader';

const { Title } = Typography;

const ProfileSocialHandle = (props: any) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [handles, setHandles] = useState({} as IHandle);
  const history = useHistory();
  const user = props.user;
  const { state } = useLocation();
  const edit = state?.edit;

  const getData = async () => {
    const { data } = await Axios.get('social-handles');
    setHandles(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish = async (values: any) => {
    // const { facebook, instagram, linkedin } = values;
    setBtnLoading(true);
    let show = message.loading('Saving ...', 0);
    try {
      const { data } = await Axios.post('social-handles', values);
      setHandles(data.data);
      setTimeout(show, 0);
      setBtnLoading(false);
      message.success('Social Handles Updated');
      if (edit) {
        history.go(-1);
      }
    } catch (error) {
      setTimeout(show, 0);
      if (error.response?.data?.errors) {
        const { facebook, instagram, linkedin } = error.response.data.errors;
        if (facebook) message.warning(facebook[0]);
        if (instagram) message.warning(instagram[0]);
        if (linkedin) message.warning(linkedin[0]);
      }
      setBtnLoading(false);
    }
  };
  return (
    <AuthLayout header={true}>
      {!loading ? (
        <Form
          name="basic"
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
          layout="vertical"
        >
          <Typography>
            <Title level={4}>{user.profile.name} Social Handles</Title>
            <p className="hints">Tip: You can update social media handles for free .</p>
          </Typography>

          <Form.Item
            name="facebook"
            label="Facebook Profile URL"
            rules={[{ required: true, message: 'Please enter facebook handle URL' }]}
            initialValue={handles?.facebook}
          >
            <Input placeholder="https://www.facebook.com/username" />
          </Form.Item>

          <Form.Item
            name="instagram"
            label="Instagram Profile URL"
            rules={[{ required: true, message: 'Please enter facebook handle URL' }]}
            initialValue={handles?.instagram}
          >
            <Input type="url" placeholder="https://www.instagram.com/username" />
          </Form.Item>

          <Form.Item label="Linkedin Profile URL" name="linkedin" initialValue={handles?.linkedin}>
            <Input type="url" placeholder="https://www.linkedin.com/in/username" />
          </Form.Item>

          <AuthFooter>
            <Button htmlType="submit" block className="btn-dark" loading={btnLoading}>
              {edit ? ' save' : 'Continue'}
            </Button>
          </AuthFooter>
        </Form>
      ) : (
        <Loader />
      )}
    </AuthLayout>
  );
};

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps)(ProfileSocialHandle);
