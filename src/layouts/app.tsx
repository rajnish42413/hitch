import React from 'react';
import './styles/app.less';
import './styles/style.less';
import Layout from 'antd/lib/layout';

interface Iprops {
  backgroundColor?: string;
  children: any;
}
export default function AppLayout(props: Iprops) {
  return (
    <Layout className="pj-app-layout">
      <Layout.Content className="main main-container">{props.children}</Layout.Content>
    </Layout>
  );
}
