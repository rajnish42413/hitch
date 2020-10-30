import React from 'react';
import './styles/app.less';
import './styles/style.less';
import Layout from 'antd/lib/layout';
import CacheClear from '../components/cacheClear';
import HelmetConfig from '../components/HelmetConfig';

interface Iprops {
  backgroundColor?: string;
  children: any;
  mainConatinerClass?: string;
  helmet?: boolean;
}
export default function AppLayout({
  mainConatinerClass = '',
  backgroundColor,
  children,
  helmet,
}: Iprops) {
  return (
    <Layout className="pj-app-layout">
      <Layout.Content className={`main main-container ${mainConatinerClass}`}>
        {helmet && <HelmetConfig />}
        <CacheClear />
        {children}
      </Layout.Content>
    </Layout>
  );
}
