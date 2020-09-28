import Layout from 'antd/lib/layout';
import React from 'react';

export default function AuthFooter(props: any) {
  return <Layout.Footer style={{ textAlign: 'center' }}>{props.children}</Layout.Footer>;
}
