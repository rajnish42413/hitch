import React from 'react';
import './styles/app.less';
import './styles/style.less';
import Layout from 'antd/lib/layout';
import CacheClear from '../components/cacheClear';
import HelmetConfig from '../components/HelmetConfig';
import { ITag } from '../schemas/ITag.d';

interface Iprops {
  backgroundColor?: string;
  children: any;
  mainConatinerClass?: string;
  customeTag?: ITag;
  appendPageTitle?: string;
}

export default function AppLayout({
  mainConatinerClass = '',
  children,
  appendPageTitle = '',
  customeTag,
}: Iprops) {
  return (
    <>
      <HelmetConfig appendPageName={appendPageTitle} customeTags={customeTag} />
      <Layout className="pj-app-layout">
        <Layout.Content className={`main main-container ${mainConatinerClass}`}>
          <CacheClear />
          {children}
        </Layout.Content>
      </Layout>
    </>
  );
}
