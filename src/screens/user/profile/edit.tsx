import React, { useState } from 'react';
import { Card, Col, Form, Input, Row, Typography, message, Modal } from 'antd';
import { IUser } from '../../../schemas/IUser';
import Axios from 'axios';
import Workplace from '../../../components/form/Workplace';
import Community from '../../../components/form/Community';
import MaritialStatus from '../../../components/form/MaritialStatus';
import EducationLevel from '../../../components/form/EducationLevel';
import Height from '../../../components/form/Height';
import { getHeightFromValue, getValueFromHeight } from '@utils/helpers';
// import College from '../../../components/form/College';
import NavigationPrompt from 'react-router-navigation-prompt';
import Designation from '../../../components/form/Designation';
import Salary from '../../../components/form/Salary';

interface IProps {
  user: IUser;
  updateUser: any;
}
export default function EditProfile(props: IProps) {
  const [form] = Form.useForm();
  const [changed, setChanged] = useState(false);

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
    setChanged(false);
    handleSubmit(updatedData);
  };

  const handleSubmit = async (values: any) => {
    let show = message.loading('Action Proccess ...', 0);
    try {
      const { data } = await Axios.post('user/profile/update', values);
      setTimeout(show, 0);
      setChanged(false);
      // props.setDisable(false);
      message.success('Profile updated successfully');
      props.updateUser(data);
    } catch (error) {
      setTimeout(show, 0);
      // props.setDisable(false);
      if (error.response.data.errors) {
        setChanged(false);
        const { max_education, salary_range, Workplace, height } = error.response.data.errors;
        if (max_education) message.warning(max_education?.[0]);
        if (salary_range) message.warning(salary_range?.[0]);
        if (Workplace) message.warning(Workplace?.[0]);
        if (height) message.warning(height?.[0]);
      }
    }
  };

  const { profile } = props.user;
  const { detail } = profile ? profile : ({} as IUser);

  return (
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
        initialValue={detail?.intro}
      >
        <Input.TextArea
          rows={5}
          placeholder="Here goes my introduction"
          maxLength={255}
          minLength={100}
          value={detail?.intro}
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
              <span>{detail?.city}</span>
            </p>
          </Col>
          <Col span={15}>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Please input your city name!' }]}
              initialValue={detail?.city}
            >
              <Input placeholder="Enter City Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Community <br />
              <span>{detail?.community}</span>
            </p>
          </Col>
          <Col span={15}>
            <Community initialValue={detail?.community} />
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Status <br />
              <span>{detail?.marital_status}</span>
            </p>
          </Col>
          <Col span={15}>
            <MaritialStatus initialValue={detail?.marital_status} />
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
              <span>{detail?.height}</span>
            </p>
          </Col>
          <Col span={15}>
            <Height initialValue={getValueFromHeight(detail?.height)} />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Workplace <br />
              <span>{detail?.workplace}</span>
            </p>
          </Col>
          <Col span={15}>
            <Workplace initialValue={detail?.workplace} />
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              College <br />
              <span>{detail?.college_name}</span>
            </p>
          </Col>
          <Col span={15}>{/* <College initialValue={detail?.college_name} /> */}</Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Designation <br />
              <span>{detail?.designation}</span>
            </p>
          </Col>
          <Col span={15}>
            <Designation initialValue={detail?.designation} />
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Salary <br />
              <span>{detail?.salary_range}</span>
            </p>
          </Col>
          <Col span={15}>
            <Salary initialValue={detail?.salary_range} />
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Education Level <br />
              <span>{detail?.max_education}</span>
            </p>
          </Col>
          <Col span={15}>
            <EducationLevel initialValue={detail?.max_education} />
          </Col>
        </Row>
      </Card>
      <NavigationPrompt when={changed}>
        {({ isActive, onCancel, onConfirm }) => {
          if (isActive) {
            return (
              <Modal
                visible={changed}
                title="Close without saving"
                cancelText="Save"
                okButtonProps={{ type: 'default' }}
                cancelButtonProps={{ type: 'primary' }}
                okText="Go"
                onCancel={() => onSubmit(form.getFieldsValue())}
                onOk={onConfirm}
                centered
                closable={false}
              >
                <p>
                  You have unsaved changes. Are you sure you want to leave this page without saving?
                </p>
              </Modal>
            );
          }
        }}
      </NavigationPrompt>
    </Form>
  );
}
