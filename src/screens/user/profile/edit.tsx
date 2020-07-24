import React, { useEffect } from 'react';
import { Card } from 'antd';

export default function EditProfile() {
  const getData = async (page: number) => {
    // const { data } = await axios.get<IMedia>(`http://127.0.0.1:8000/api/media?page=${page}`);
    // setMedia(data);
  };

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <Card style={{ margin: '20px' }}>
      <h1>Comming Soon</h1>
    </Card>
  );
}
