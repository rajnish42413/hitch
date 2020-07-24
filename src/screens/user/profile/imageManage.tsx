import React from 'react';
import ImageUploader from '../../../components/Uploader';
import AppLayout from '../../../layouts/app';
import { ProfileTopHeader } from '../profile/index';
import { Layout } from 'antd';

export default function UserImageManage(props: any) {
  console.log(props.match.params.id);
  return (
    <AppLayout>
      <ProfileTopHeader goToback="/profile" />
      <Layout.Content style={{ margin: '20px' }}>
        <ImageUploader />
      </Layout.Content>
    </AppLayout>
  );
}
