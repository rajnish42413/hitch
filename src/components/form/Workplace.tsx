import { AutoComplete, Form } from 'antd';
import Axios from 'axios';
import React, { useState } from 'react';

interface IOption {
  value: string;
}
interface IProps {
  initialValue?: string | Number;
}

export default function Workplace(props: IProps) {
  const [organization, setOrganization] = useState([] as Array<IOption>);

  const organizationList = async (string: string) => {
    if (string?.length <= 2) return;
    const { data } = await Axios.get(
      `https://crunchbase-crunchbase-v1.p.rapidapi.com/odm-organizations?query=${string}`,
      {
        headers: {
          'x-rapidapi-host': 'crunchbase-crunchbase-v1.p.rapidapi.com',
          'x-rapidapi-key': '30d4f44f9amsh4be02b077a8efeap141676jsn26324e109037',
        },
      }
    );
    if (data?.data?.items?.length) {
      setOrganization(data.data.items);
    }
  };
  return (
    <Form.Item
      name="workplace"
      rules={[{ required: true, message: 'Please input your workplace!' }]}
      initialValue={props?.initialValue ? props.initialValue : ''}
    >
      <AutoComplete placeholder="Workplace" onChange={(value: string) => organizationList(value)}>
        {organization.map((data: any, i: number) => (
          <AutoComplete.Option key={i} value={`${data?.properties?.name}`}>
            {`${data?.properties?.name} (${data?.properties?.homepage_url})`}
          </AutoComplete.Option>
        ))}
      </AutoComplete>
    </Form.Item>
  );
}
