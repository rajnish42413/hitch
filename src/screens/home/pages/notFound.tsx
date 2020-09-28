import { Button, Result } from 'antd';
import React from 'react';

export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      style={{ marginTop: '2rem' }}
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  );
}
