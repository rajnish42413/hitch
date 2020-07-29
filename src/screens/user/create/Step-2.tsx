import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Typography,
  Modal,
  Steps,
  Select,
  AutoComplete
} from 'antd';
import axios from 'axios';
import {
  HomeOutlined,
  LineOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined  
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import AuthLayout from '../../../layouts/auth';
import { occupations } from '../../../constants/occupation.json';
import { RightOutlined } from '@ant-design/icons';

const { confirm } = Modal;
const { Title, Paragraph } = Typography;

interface IOption{
   value:string;
}


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};


export default function CreateUserStepTwo() {
  const [form] = Form.useForm();
  const history = useHistory();

  const [organization ,setOrganization] = useState( [] as Array<IOption>);
  const [occupationsData ,setOccupations] = useState(occupations);


  const onSearchOrganization=(searchText: string)=>{
   let data = occupations?.filter((element:IOption) => {
      return element.value.toLowerCase().includes(searchText.toLowerCase());
    });
    setOccupations(data);
  }

  const onFinish = async (values: any) => {
    const data = {
      city: values.city,
      community: values.community,
      height: values.height,
      marital_status: values.marital_status,
      highest_attained: values.highest_attained,
      college_name: values.college_name,
      workplace: values.workplace,
      designation: values.designation,
      salary_range: values.salary_range
    };
    console.log(data);
    if (data) showConfirm(data);
  };

  const showConfirm = (data: any) => {
    confirm({
      title: ' Please confirm your info ',
      content: ` Live in ${data.city}, Belong to ${data.community} community and your height is ${
        data.height
      }cm`,
      cancelText: 'Edit',
      onOk() {
        console.log('OK');
        history.push('/user/create/success');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const organizationList = async (string: string) => {
    if(string?.length <= 2) return ;
      const {data} = await axios.get(`https://crunchbase-crunchbase-v1.p.rapidapi.com/odm-organizations?query=${string}`, {
        "headers": {
          "x-rapidapi-host": "crunchbase-crunchbase-v1.p.rapidapi.com",
          "x-rapidapi-key": "30d4f44f9amsh4be02b077a8efeap141676jsn26324e109037"
        }
      });
      if(data?.data?.items?.length){
        setOrganization(optionListFromCrushbase(data.data.items));
        console.log(organization);
      }
  };


  return (
    <AuthLayout>
      <Steps current={1} direction="horizontal" className="newuser-steps">
        <Steps.Step title="" description="" />
        <Steps.Step />
        <Steps.Step />
        <Steps.Step />
      </Steps>
      <br />
      <br />

      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        size="large"
        form={form}
      >
        <br />
        <Typography>
          <Title level={4} className="text-center text-muted">
            {' '}
            <LineOutlined /> <HomeOutlined /> {} Let’s talk about home{' '}  <LineOutlined />
          </Title>
        </Typography>
        <br />

        <Typography>
          <Title level={4}>Where do you live? </Title>
        </Typography>
        <Form.Item
          name="city"
          rules={[{ required: true, message: 'Please input your city name!' }]}
        >
          <Input placeholder="Enter City Name" />
        </Form.Item>

      
        <br />

        <Typography>
          <Title level={4}>What’s your community?</Title>
        </Typography>
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

        <br />
        <Typography>
          <Title level={4} className="text-center text-muted">
            <LineOutlined /> <UserOutlined /> Tell us about yourself <LineOutlined />
          </Title>
        </Typography>
        <br />

        <Typography>
          <Title level={4}>How tall are you? </Title>
          <Paragraph>
            We have noticed that members do not respond to Profiles with hidden height{' '}
          </Paragraph>
        </Typography>
        <Form.Item
          name="height"
          rules={[{ required: true, message: 'Please input your height in cm!' }]}
        >
          <Select placeholder="Select height">
            {Array.apply(0, Array(96)).map((x, i) => (
              <Select.Option value={i + 120} key={i}>
                {i + 120} cm
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        /> */}
        <br />

        <Typography>
          <Title level={4}>What’s your marital status?</Title>
        </Typography>
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

        <br />
        <Typography>
          <Title level={4} className="text-center text-muted">
            <LineOutlined /> <SafetyCertificateOutlined /> Academic Background <LineOutlined />
          </Title>
        </Typography>
        <br />

        <Typography>
          <Title level={4}>What’s the highest level you attained?</Title>
        </Typography>
        <Form.Item name="highest_attained">
          <Radio.Group buttonStyle="solid" defaultValue="Undergrad">
            <Radio.Button value="School">School</Radio.Button>
            <Radio.Button value="Undergrad">Undergrad</Radio.Button>
            <Radio.Button value="Postgrad">Postgrad</Radio.Button>
            <Radio.Button value="Doctrate">Doctrate</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {/* <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        /> */}
        <br />

        <Typography>
          <Title level={4}>Where did you go to college? </Title>
        </Typography>
        <Form.Item
          name="college_name"
          rules={[{ required: true, message: 'Please input your college name!' }]}
        >
          <AutoComplete options={[]} placeholder="College" />
        </Form.Item>
        {/* <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        /> */}
        <br />
        <Typography>
          <Title level={4} className="text-center text-muted">
            <LineOutlined /> <ShoppingOutlined /> Work life details <LineOutlined />
          </Title>
        </Typography>
        <br />

        <Typography>
          <Title level={4}>Where do you work? </Title>
        </Typography>
        <Form.Item
          name="workplace"
          rules={[{ required: true, message: 'Please input your workplace!' }]}
        >
          <AutoComplete options={organization} placeholder="Workplace" onChange={(value:string) => organizationList(value)} />
        </Form.Item>
        {/* <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        /> */}
        <br />

        <Typography>
          <Title level={4}>And what’s your designation? </Title>
        </Typography>
        <Form.Item
          name="designation"
          rules={[{ required: true, message: 'Please input your designation!' }]}
        >
          <AutoComplete options={occupationsData} placeholder="Designation" onSearch={onSearchOrganization} />
        </Form.Item>
        {/* <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        /> */}
        <br />

        <Typography>
          <Title level={4}>Your salary range? </Title>
        </Typography>
        <Form.Item
          name="salary_range"
          rules={[{ required: true, message: 'Please Select your salary range!' }]}
        >
          <Select placeholder="Select salary range">
            <Select.Option value="10000"> {'<'} 10,000/month</Select.Option>
            <Select.Option value="10000-30000">10,000 to 30,000</Select.Option>
            <Select.Option value="30000-60000">30,000 to 60,000</Select.Option>
            <Select.Option value="60000-90000">60,000 to 90,000</Select.Option>
            <Select.Option value="90000-100000">90,000 to 100,000</Select.Option>
            <Select.Option value="90000-100000">100,000</Select.Option>
            <Select.Option value="100K-150K">100K to 150K</Select.Option>
            <Select.Option value="150K-200K">150K to 200K</Select.Option>
            <Select.Option value="200K-300K">200K to 300K</Select.Option>
            <Select.Option value="300K-400K">300K to 400K</Select.Option>
            <Select.Option value="400K-500K">400K to 500K</Select.Option>
         <Select.Option value="500K">500K {'<'}</Select.Option>
          </Select>
        </Form.Item>
        {/* <Switch
          checkedChildren="Visible"
          unCheckedChildren={<LockOutlined />}
          defaultChecked
          className="form-switch"
          disabled={true}
        /> */}

<Form.Item style={{display:'block'}}>
              <Button type="primary" htmlType="submit" shape="circle"  
                style={{float:'right'}}
              icon={<RightOutlined />}></Button>
            </Form.Item>
      </Form>
    </AuthLayout>
  );
}



const optionListFromCrushbase = (data:any) =>{
  if(!data) return [];
  let result:Array<{value:string}> = [];
   data?.map((item:any) => 
    result.push({value:`${item?.properties?.name} (${item?.properties?.homepage_url})`})
   );
 return result ?? [];
}

