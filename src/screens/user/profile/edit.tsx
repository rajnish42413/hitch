import React, { useEffect } from 'react';
import { Card, Col, DatePicker, Form, Input, Row, Select, Typography, Slider } from 'antd';

export default function EditProfile() {
  const [form] = Form.useForm();
  const getData = async () => {
    // const { data } = await axios.get<IMedia>(`http://127.0.0.1:8000/api/media?page=${page}`);
    // setMedia(data);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      size="large"
      form={form}
      style={{ padding: '20px' }}
    >
      <Form.Item
        name="intro"
        rules={[{ required: true, message: 'Please input your introduction!' }]}
      >
        <Input.TextArea rows={5} placeholder="Here goes my introduction" maxLength={255} />
      </Form.Item>

      <Typography style={{ marginTop: '20px', paddingLeft: '20px' }}>
        <Typography.Paragraph>Basic</Typography.Paragraph>
      </Typography>

      <Card>
        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              DOB <br />
              <span>01/05/1997</span>
            </p>
          </Col>
          <Col span={15}>
            <Form.Item
              name="dob"
              rules={[{ required: true, message: 'Please Select your date of birth!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Location <br />
              <span>Delhi</span>
            </p>
          </Col>
          <Col span={15}>
            <Form.Item
              name="city"
              rules={[{ required: true, message: 'Please input your city name!' }]}
            >
              <Input placeholder="Enter City Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Community <br />
              <span>Buddhists</span>
            </p>
          </Col>
          <Col span={15}>
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
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Status <br />
              <span>Single</span>
            </p>
          </Col>
          <Col span={15}>
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
              <span>5.3</span>
            </p>
          </Col>
          <Col span={15}>
            <Form.Item
              name="height"
              rules={[{ required: true, message: 'Please input your height in cm!' }]}
            >
              <Slider min={4} max={7} tooltipVisible tipFormatter={formatter} step={0.1} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <p className="form-edit-label">
              Education Level <br />
              <span>Undergrad</span>
            </p>
          </Col>
          <Col span={15}>
            <Form.Item name="highest_attained">
              <Select>
                <Select.Option value="School">School</Select.Option>
                <Select.Option value="Undergrad">Undergrad</Select.Option>
                <Select.Option value="Postgrad">Postgrad</Select.Option>
                <Select.Option value="Doctrate">Doctrate</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </Form>
  );
}

const formatter = (value: any) => {
  return `${value} ft`;
};
