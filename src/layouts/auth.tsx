import React from 'react';
import AuthHeader from './auth/header';
import { Layout } from 'antd';
import CacheClear from '../components/cacheClear';
import './styles/app.less';
import './styles/auth.less';

interface Iprops {
  style?: Object;
  children: any;
  goBack?: boolean;
  header?: boolean;
  classsName?: string;
}
export default function AuthLayout(props: Iprops) {
  const goBack = props.goBack || true;
  const header = props.header;
  const customStyle = {
    backgroundColor: '#eee0ca',
    padding: '0 1rem',
  };
  const style = { ...customStyle, ...props.style };
  document.body.style.backgroundColor = '#eee0ca';
  return (
    <Layout className="pj-auth-layout">
      {header && <AuthHeader goBack={goBack} />}
      <Layout.Content className="main" style={style}>
        <CacheClear />

        {props.children}
      </Layout.Content>
    </Layout>
  );
}
