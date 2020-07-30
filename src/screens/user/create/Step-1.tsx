import React from 'react';
import { Form, Input, Button, Radio, Typography, DatePicker, Modal, Select, message } from 'antd';
import { useHistory } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
import AuthLayout from '../../../layouts/auth';
import moment from 'moment';
import CustomStepper from '../../../components/CustomStepper';

const { confirm } = Modal;
const { Title, Paragraph } = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};


export default function CreateUserStepOne() {
  const [form] = Form.useForm();
  const history = useHistory();
  const onFinish = async(values: any) => {
    const user = {
      "name": values.firstName + ' ' + values.lastName,
      "email": values.email,
      "password": values.password,
      "gender": values.gender ?? 'male',
      "date_of_birth": values.dob?.format('DD-MM-YYYY')
    };
    const age = getAge(user.date_of_birth) || 0;

    if(age< 18) {
      message.error("Age must be greater than 18 year");
      return ;
    }

    if(user) showConfirm(user);
    // const {data} =  await axios.post(`/register`, user);
    // console.log(data);
    // if(data){
    //   console.log(data);
    //   form.resetFields();
    //   message.success("Your account is successfully created")
    // }
  };

  const showConfirm=(user:any) =>{
    confirm({
      title: ' Please confirm your info ',
      content: ` ${getAge(user.date_of_birth)} years old , Born ${user.date_of_birth}`,
      cancelText: 'Edit',
      onOk() {
        console.log('OK');
        history.push('/user/create/step-2');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const onSelectDate=(date: any, dateString: string)=>{
    console.log(dateString);
    console.log(getAge(dateString))
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <AuthLayout>
        <CustomStepper totalSteps={4} active={0} />

       <br/>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            size="large"
            form={form}
          >
            <Typography>
              <Title level={4}>What is your name ?</Title>
            </Typography>
            <Form.Item
              name="firstName"
              rules={[{ required: true, message: 'Please input your last name!' }]}
            >
              <Input placeholder="Enter First Name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true, message: 'Please input your first name!' }]}
            >
              <Input placeholder="Enter Last Name" />
            </Form.Item>

            <br />

            <Typography>
              <Title level={4}>And your gender ?</Title>
            </Typography>
            <Form.Item name="gender">
              <Radio.Group  buttonStyle="solid" defaultValue="male">
                <Radio.Button value="male">Male</Radio.Button>
                <Radio.Button value="female">Female</Radio.Button>
                <Radio.Button value="other">Other</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <br />

            <Typography>
              <Title level={4}>What's your date of birth ?</Title>
              <Paragraph>This cannot be editable later .</Paragraph>
            </Typography>

            <Form.Item
              name="dob"
              rules={[{ required: true, message: 'Please Select your date of birth!' }]}
            >
              <DatePicker style={{ width: '100%' }} showToday={false} onChange={onSelectDate}  disabledDate={disabledDate}/>
            </Form.Item>

            <br />

            <Typography>
              <Title level={4}>Signing up as ...</Title>
            </Typography>
            <Form.Item
          name="community"
          rules={[{ required: true, message: 'Please Select signing up a!' }]}
        >
          <Select placeholder="Select Signing up a">
            <Select.Option value="Father" >Father</Select.Option> 
            <Select.Option value="Mother">Mother</Select.Option>
            <Select.Option value="Brother">Brother</Select.Option>
            <Select.Option value="Sister">Sister</Select.Option>
            <Select.Option value="Self">Self</Select.Option>
            <Select.Option value="Guardian">Guardian</Select.Option>
          </Select>
        </Form.Item>

            <br />

            <Form.Item style={{display:'block'}}>
              <Button type="primary" htmlType="submit" shape="circle"  
                style={{float:'right'}}
              icon={<RightOutlined />}></Button>
            </Form.Item>
          </Form>
    </AuthLayout>
  );
}


function getAge(dateString:string):number
{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return +(age);
}

function disabledDate(current:any) {
  return current && current > moment().endOf('day');
}