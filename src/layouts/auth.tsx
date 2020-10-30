import React from 'react';
import AuthHeader from './auth/header';
import { Layout } from 'antd';
import CacheClear from '../components/cacheClear';
import HelmetConfig from '../components/HelmetConfig';
import './styles/app.less';
import './styles/auth.less';

interface Iprops {
  style?: Object;
  children: any;
  goBack?: boolean;
  header?: boolean;
  classsName?: string;
  helmet?: boolean;
}
export default function AuthLayout({
  style,
  children,
  goBack = true,
  header,
  classsName,
  helmet = true,
}: Iprops) {
  const customStyle = {
    padding: '0 1rem',
  };
  const dom_style = { ...customStyle, ...style };
  return (
    <Layout className="pj-auth-layout">
      {helmet && <HelmetConfig />}
      {header && <AuthHeader goBack={goBack} />}
      <Layout.Content className="main" style={dom_style}>
        <CacheClear />
        {children}
      </Layout.Content>
    </Layout>
  );
}
