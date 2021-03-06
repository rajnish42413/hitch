import React, { useState } from 'react';
import { AutoComplete, Form, Select, Typography } from 'antd';
import { colleges } from '../../constants/collegesData.json';
import { IEducation } from '../../schemas/IProfile';
const { Option } = AutoComplete;

interface IProps {
  initialValue?: IEducation;
  field?: any;
}

export default function College(props: IProps) {
  const [list, setlist] = useState([] as Array<any>);

  const handleSearch = (keyword: string) => {
    if (!keyword) return;
    let data = colleges?.filter((element: any) => {
      return element?.CollegeName.toLowerCase().includes(keyword.toLowerCase());
    });
    setlist(data);
  };

  return (
    <>
      <Typography>
        <Typography.Title level={4}>What’s highest level of education attained?</Typography.Title>
      </Typography>

      <Form.Item
        {...props.field}
        key={0}
        name={props.field ? [props.field.name, 'max_education'] : 'max_education'}
        fieldKey={props.field ? [props.field.fieldKey, 'max_education'] : 'max_education'}
        rules={[{ required: true, message: 'Please Select your highest attained!' }]}
        initialValue={props.initialValue?.edu_level}
      >
        <Select placeholder="Highest Attained">
          <Select.Option value="School">School</Select.Option>
          <Select.Option value="Undergrad">Undergrad</Select.Option>
          <Select.Option value="Postgrad">Postgrad</Select.Option>
          <Select.Option value="Doctrate">Doctrate</Select.Option>
        </Select>
      </Form.Item>

      <Typography>
        <Typography.Title level={4}>And the name of college? </Typography.Title>
      </Typography>

      <Form.Item
        {...props.field}
        key={1}
        name={props.field ? [props.field.name, 'college_name'] : 'college_name'}
        fieldKey={props.field ? [props.field.fieldKey, 'college_name'] : 'college_name'}
        rules={[{ required: true, message: 'Please input your college name!' }]}
        initialValue={props.initialValue?.college_name}
      >
        <AutoComplete placeholder="College" onSearch={handleSearch}>
          {list &&
            list.map((college: any) => (
              <Option key={college.id} value={college.CollegeName}>
                {college.CollegeName}
              </Option>
            ))}
        </AutoComplete>
      </Form.Item>
    </>
  );
}
