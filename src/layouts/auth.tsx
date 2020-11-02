import React from 'react';
import AuthHeader from './auth/header';
import { Layout } from 'antd';
import CacheClear from '../components/cacheClear';
import HelmetConfig from '../components/HelmetConfig';
import { ITag } from '../schemas/ITag.d';
import './styles/app.less';
import './styles/auth.less';

interface Iprops {
  style?: Object;
  children: any;
  goBack?: boolean;
  header?: boolean;
  classsName?: string;
  customeTag?: ITag;
  appendPageTitle?: string;
}
export default function AuthLayout({
  style,
  children,
  goBack = true,
  header,
  appendPageTitle = '',
  customeTag,
}: Iprops) {
  const customStyle = {
    padding: '0 1rem',
  };
  const dom_style = { ...customStyle, ...style };
  return (
    <>
      <HelmetConfig appendPageName={appendPageTitle} customeTags={customeTag} />
      <Layout className="pj-auth-layout">
        {header && <AuthHeader goBack={goBack} />}
        <Layout.Content className="main" style={dom_style}>
          <CacheClear />
          {children}
        </Layout.Content>
      </Layout>
    </>
  );
}
