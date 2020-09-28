import { AutoComplete, Form } from 'antd';
import React, { useState } from 'react';
import {frequent} from '../../constants/community.json';
const { Option } = AutoComplete;

interface IProps {
  initialValue?: string | Number;
}
export default function Community(props:IProps) {
  const [list, setlist] = useState([] as Array<any>);

  const handleSearch = (keyword: string) => {
    if (!keyword) return;
     let data = frequent?.filter((element: any) => {
        return element?.text.toLowerCase().includes(keyword.toLowerCase());
     });
    setlist(data);
  };

    return (
        <Form.Item
        name="community"
        rules={[{ required: true, message: 'Please Select community!' }]}
        initialValue={props?.initialValue}
      >
        <AutoComplete placeholder="Community" onSearch={handleSearch}>
         {list &&
           list.map((community: any) => (
             <Option key={community.id} value={community.text}>
               {community.text}
            </Option>
          ))}
      </AutoComplete>
      </Form.Item>
    )
}
