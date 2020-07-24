import React, { useEffect, useState } from 'react';
import { Layout, Switch } from 'antd';
import AppLayout from '../../../layouts/app';
import BottomFooter from '../../home/Footer';
import { ProfileTopHeader } from '../profile/index';
import UserProfileDetail from '../../../components/UserProfileDetail';
import EditProfile from './edit';

const { Content } = Layout;
enum PType {
  'edit',
  'detail'
}
const UserDetail = (props: any) => {
  const [pageType, setPageType] = useState(PType.detail);

  // const getData = async (page: number) => {
  //   // const { data } = await axios.get<IMedia>(`http://127.0.0.1:8000/api/media?page=${page}`);
  //   // setMedia(data);
  // };

  useEffect(() => {}, [pageType]);

  return (
    <AppLayout>
      <ProfileTopHeader title="Rajnish Singh" goToback="/profile" />
      <Content>
        <Switch
          checkedChildren="View"
          unCheckedChildren="Edit"
          defaultChecked
          style={{ display: 'block', margin: '1rem' }}
          onChange={() => setPageType(pageType === PType.edit ? PType.detail : PType.edit)}
        />
        {pageType === PType.detail && <UserProfileDetail />}
        {pageType === PType.edit && <EditProfile />}
      </Content>
      <BottomFooter />
    </AppLayout>
  );
};
export default UserDetail;
