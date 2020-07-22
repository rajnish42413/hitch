import { colors } from '@constants/general';
import { Col, Row } from 'antd';
import React from 'react';
import './style.scss';

interface Iprops{
  backgroundColor?: string;
  children:any
}
export default function AuthLayout(props: Iprops) {
  return (
    <main className="main">
       <div style={{ backgroundColor: props?.backgroundColor ?? colors['white-color'], width: '100%', minHeight: '100vh' }}>
       <Row justify="center" align="middle">
        <Col
          xs={20}
          sm={20}
          md={12}
          lg={12}
          xl={14}
          style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' ,paddingTop:'2rem' }}
        >
          {props.children}
        </Col>
      </Row>
      </div>
    </main>
  );
}
