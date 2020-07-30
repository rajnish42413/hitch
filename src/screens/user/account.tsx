import React from 'react';
import { Card, Layout } from 'antd';
import AppLayout from '../../layouts/app';
import BottomFooter from '../home/Footer';
import { ProfileTopHeader } from './profile/index';

const { Content } = Layout;

const UserAccount = (props: any) => {
  return (
    <AppLayout>
      <ProfileTopHeader title="Account" goToback="/profile" />
      <Content style={{ padding: '20px' }}>
        <Card>
          <h1>Comming Soon</h1>
        </Card>
      </Content>
      <BottomFooter />
    </AppLayout>
  );
};
export default UserAccount;
