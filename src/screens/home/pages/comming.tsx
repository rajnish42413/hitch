import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function CommingSoon() {
  const history = useHistory();
  return (
    <Result
      status="500"
      title="Comming Soon"
      subTitle="This page is under construction ,We Should be back shortly. Thank you for your patience."
      style={{ marginTop: '2rem' }}
      extra={
        <Button type="primary" onClick={() => history.go(-1)}>
          Go Back
        </Button>
      }
    />
  );
}
