import React from 'react';
import AuthHeader from './auth/header';
import { Layout } from 'antd';

import './styles/app.less';
import './styles/auth.less';

interface Iprops {
  style?: Object;
  children: any;
  goBack?: boolean;
  header?: boolean;
}
export default function AuthLayout(props: Iprops) {
  const goBack = props.goBack || true;
  const header = props.header;
  const customStyle = {
    backgroundColor: '#EEE0CA',
    padding: '0 1rem',
  };
  const style = { ...customStyle, ...props.style };
  return (
    <Layout>
      {header && <AuthHeader goBack={goBack} />}
      <Layout.Content className="main main-container" style={style}>
        {props.children}
      </Layout.Content>
    </Layout>
  );
}
