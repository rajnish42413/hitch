import React, { Dispatch, useState } from 'react';
import { Card, Col, Form, Input, Row, Typography, message } from 'antd';
import Axios from 'axios';
import Community from '../../../components/form/Community';
import MaritialStatus from '../../../components/form/MaritialStatus';
import Height from '../../../components/form/Height';
import { getHeightFromValue, getValueFromHeight } from '@utils/helpers';
import Salary from '../../../components/form/Salary';
import PromptModal from '../../../components/PromptModal';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import { connect } from 'react-redux';
import AppLayout from '../../../layouts/app';
import TopHeader from '../../../screens/find/Header';
import { IUser } from 'src/schemas/IUser';
import { useHistory } from 'react-router-dom';

function EditProfile(props: any) {
  const { profile } = props.user;
  const [form] = Form.useForm();
  const [changed, setChanged] = useState(false);
  const history = useHistory();

  const onSubmit = (values: any) => {
    setChanged(false);

    const data = {
      gender: profile?.gender ? profile?.gender : 'male',
      full_name: profile?.name,
      sub_role: profile?.sub_role,
      dob: profile?.date_of_birth,
    };

    const height = getHeightFromValue(values.c_height);
    values.height = height;
    let updatedData = { ...data, ...values };
    handleSubmit(updatedData);
  };

  const handleSubmit = async (values: any) => {
    let show = message.loading('Action Proccess ...', 0);
    try {
      const { data } = await Axios.post('user/profile/update', values);
      setTimeout(show, 0);
      if (data) props.setUser(data);
      message.success('Profile updated successfully');
      history.go(-1);
      setChanged(false);
      return;
    } catch (error) {
      setTimeout(show, 0);
      if (error?.response?.data?.errors) {
        setChanged(false);
        const { salary_range, height } = error.response.data.errors;
        if (salary_range) message.warning(salary_range?.[0]);
        if (height) message.warning(height?.[0]);
      }
    }
  };

  return (
    <AppLayout appendPageTitle={profile?.name}>
      <TopHeader backHeader={true} backHeadertitle={'Edit Profile'} backTo="/profile" />
      <Form
        name="basic"
        initialValues={{ remember: true }}
        size="large"
        form={form}
        style={{ padding: '20px' }}
        onFinish={onSubmit}
        onValuesChange={() => {
          setChanged(true);
          // props.setDisable(true);
        }}
      >
        <Form.Item
          name="intro"
          rules={[{ required: true, message: 'Please input your introduction!' }]}
          initialValue={profile?.detail?.intro}
        >
          <Input.TextArea
            rows={5}
            placeholder="Here goes my introduction"
            maxLength={255}
            minLength={100}
            value={profile?.detail?.intro}
          />
        </Form.Item>

        <Typography style={{ marginTop: '20px', paddingLeft: '20px' }}>
          <Typography.Paragraph>Basic</Typography.Paragraph>
        </Typography>

        <Card>
          <Row>
            <Col span={8}>
              <p className="form-edit-label">
                Location <br />
                <span>{profile?.detail?.city}</span>
              </p>
            </Col>
            <Col span={15}>
              <Form.Item
                name="city"
                rules={[{ required: true, message: 'Please input your city name!' }]}
                initialValue={profile?.detail?.city}
              >
                <Input placeholder="Enter City Name" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <p className="form-edit-label">
                Community <br />
                <span>{profile?.detail?.community}</span>
              </p>
            </Col>
            <Col span={15}>
              <Community initialValue={profile?.detail?.community} />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <p className="form-edit-label">
                Status <br />
                <span>{profile?.detail?.marital_status}</span>
              </p>
            </Col>
            <Col span={15}>
              <MaritialStatus initialValue={profile?.detail?.marital_status} />
            </Col>
          </Row>
        </Card>

        <Typography style={{ marginTop: '20px', paddingLeft: '20px' }}>
          <Typography.Paragraph>Preffered</Typography.Paragraph>
        </Typography>

        <Card>
          <Row>
            <Col span={8}>
              <p className="form-edit-label">
                Height <br />
                <span>{profile?.detail?.height}</span>
              </p>
            </Col>
            <Col span={15}>
              <Height initialValue={getValueFromHeight(profile?.detail?.height)} />
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <p className="form-edit-label">
                Salary <br />
                <span>{profile?.detail?.salary_range}</span>
              </p>
            </Col>
            <Col span={15}>
              <Salary initialValue={profile?.detail?.salary_range} />
            </Col>
          </Row>
        </Card>
        <PromptModal changed={changed} onOk={() => onSubmit(form.getFieldsValue())} />
      </Form>
    </AppLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
