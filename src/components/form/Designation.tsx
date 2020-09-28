import { AutoComplete, Form } from 'antd';
import React, { useState } from 'react';
import { occupations } from '../../constants/occupation.json';

interface IOption {
    value: string;
}

interface IProps {
    initialValue?: string | Number;
}
export default function Designation(props:IProps) {
    const [occupationsData, setOccupations] = useState(occupations);

    const onSearchOrganization = (searchText: string) => {
        let data = occupations?.filter((element: IOption) => {
            return element.value.toLowerCase().includes(searchText.toLowerCase());
        });
        setOccupations(data);
    }
    return (
        <Form.Item
            name="designation"
            rules={[{ required: true, message: 'Please input your designation!' }]}
            initialValue={props?.initialValue}
        >
            <AutoComplete options={occupationsData} placeholder="Designation" onSearch={onSearchOrganization} />
        </Form.Item>
    )
}
