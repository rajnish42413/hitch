import React, { useState } from 'react';
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
