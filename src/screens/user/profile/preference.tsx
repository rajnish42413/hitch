import React, { Dispatch, useEffect, useState } from 'react';
import { Card, Col, Form, Input, Row, Typography, Layout, message, Slider } from 'antd';
import AppLayout from '../../../layouts/app';
import { IPreference } from '../../../schemas/IProfile';
import Axios from 'axios';
import Community from '../../../components/form/Community';
import MaritialStatus from '../../../components/form/MaritialStatus';
import Height from '../../../components/form/Height';
import EducationLevel from '../../../components/form/EducationLevel';
import { getHeightFromValue } from '../../../utils/helpers';
import Loader from '../../../components/loader/Loader';
import { IAction, SetTourVisibility } from '@redux/actions';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import TopHeader from '../../../screens/find/Header';
import PromptModal from '../../../components/PromptModal';

interface IAge {
  min: number;
  max: number;
}

function Preference(props: any) {
  const [form] = Form.useForm();
  const [preference, setPreference] = useState({} as IPreference);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const tourVisibal = props.tourVisibal;
  const [age, setAge] = useState([18, 60]);

  const handleAgeChange = (value: any) => {
    setChanged(true);
    setAge(value);
  };

  const getData = async () => {
    setLoading(true);
    const { data } = await Axios.get<IPreference>(`user/preference`);
    const val = [data.min_age, data.max_age];
    setAge(val);
    setPreference(data);
    setLoading(false);
  };

  const onValuesChange = () => {
    const allValues = form.getFieldsValue();
    allValues.min_age = age[0];
    allValues.max_age = age[1];
    allValues.height = getHeightFromValue(allValues.c_height);
    setChanged(false);
    handleSubmit(allValues);
  };

  const handleSubmit = async (values: any) => {
    setChanged(false);
    let show = message.loading('Action Proccess ...', 0);
    try {
      await Axios.post('user/preference', values);
      setTimeout(show, 0);
      message.success('Preference updated successfully');
    } catch (error) {
      setChanged(false);
      setTimeout(show, 0);
      if (error.response.data.errors) {
        const {
          max_education,
          height,
          community,
          location,
          marital_status,
        } = error.response.data.errors;
        if (max_education) message.warning(max_education?.[0]);
        if (height) message.warning(height?.[0]);
        if (community) message.warning(community?.[0]);
        if (location) message.warning(location?.[0]);
        if (marital_status) message.warning(marital_status?.[0]);
      }
    }
  };

  useEffect(() => {
    if (tourVisibal) {
      props.setTourVisibal(true);
    }
    getData();
  }, [props, tourVisibal]);

  return (
    <AppLayout>
      <TopHeader backHeadertitle="Preference" backHeader={true} />
      <Layout.Content>
        {!loading ? (
          <Form
            name="basic"
            initialValues={{ remember: true }}
            size="large"
            form={form}
            style={{ padding: '20px' }}
            onValuesChange={() => setChanged(true)}
          >
            <Typography style={{ marginTop: '20px', paddingLeft: '20px' }}>
              <Typography.Paragraph>Basic</Typography.Paragraph>
            </Typography>

            <Card>
              <Row data-tut="pre-first-step">
                <Col span={8}>
                  <p className="form-edit-label">
                    Age <br />
                    <span>{preference.min_age + '-' + preference.max_age}</span>
                  </p>
                </Col>
                <Col span={15}>
                  <Slider
                    range
                    disabled={false}
                    min={18}
                    max={60}
                    defaultValue={[preference.min_age, preference.max_age]}
                    onChange={handleAgeChange}
                  />
                </Col>
              </Row>
              <br />

              <Row data-tut="pre-second-step">
                <Col span={8}>
                  <p className="form-edit-label">
                    Location <br />
                    <span>{preference?.location}</span>
                  </p>
                </Col>
                <Col span={15}>
                  <Form.Item
                    name="location"
                    rules={[{ required: true, message: 'Please input your city name!' }]}
                    initialValue={preference?.location}
                  >
                    <Input placeholder="Enter City Name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row data-tut="pre-third-step">
                <Col span={8}>
                  <p className="form-edit-label">
                    Community <br />
                    <span>{preference?.community}</span>
                  </p>
                </Col>
                <Col span={15}>
                  <Community initialValue={preference?.community} />
                </Col>
              </Row>

              <Row data-tut="pre-fourth-step">
                <Col span={8}>
                  <p className="form-edit-label">
                    Status <br />
                    <span>{preference?.marital_status}</span>
                  </p>
                </Col>
                <Col span={15}>
                  <MaritialStatus initialValue={preference?.marital_status} />
                </Col>
              </Row>
            </Card>

            <Typography style={{ marginTop: '20px', paddingLeft: '20px' }}>
              <Typography.Paragraph>Preffered</Typography.Paragraph>
            </Typography>
            <Card>
              <Row data-tut="pre-fifth-step">
                <Col span={8}>
                  <p className="form-edit-label">
                    Height <br />
                    <span>{preference?.height}</span>
                  </p>
                </Col>
                <Col span={15}>
                  <Height initialValue={preference.height && initial(preference.height)} />
                </Col>
              </Row>

              <Row data-tut="pre-sixth-step">
                <Col span={8}>
                  <p className="form-edit-label">
                    Education Level <br />
                    <span>{preference?.max_education}</span>
                  </p>
                </Col>
                <Col span={15}>
                  <EducationLevel initialValue={preference?.max_education} />
                </Col>
              </Row>
            </Card>
          </Form>
        ) : (
          <Loader />
        )}

        <PromptModal changed={changed} onOk={onValuesChange} />
      </Layout.Content>
    </AppLayout>
  );
}

const initial = (value: any) => {
  return Math.floor(value * 12);
};

const mapStateToProps = ({ user, tour }: IAppState) => {
  return {
    tourVisibal: tour.visible,
  };
};

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setTourVisibal: (data: boolean) => dipatch(SetTourVisibility(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Preference);
