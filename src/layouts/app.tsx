import React from 'react';
import './styles/app.less';
import './styles/style.less';
import Layout from 'antd/lib/layout';
import CacheClear from '../components/cacheClear';

interface Iprops {
  backgroundColor?: string;
  children: any;
}
export default function AppLayout(props: Iprops) {
  document.body.style.backgroundColor = '#fff';
  return (
    <Layout className="pj-app-layout">
      <Layout.Content className="main main-container">
        <CacheClear />
        {props.children}
      </Layout.Content>
    </Layout>
  );
}
