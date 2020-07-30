import { Col, Row } from 'antd';
import React from 'react';
import './style.scss';
import { colors } from '@constants/general';

interface Iprops {
  backgroundColor?: string;
  children: any;
}
export default function AppLayout(props: Iprops) {
  return (
    <main className="main">
      <Row justify="center" align="middle">
        <Col
          xs={24}
          sm={24}
          md={14}
          lg={14}
          xl={16}
          style={{
            minHeight: '85vh',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors['white-color'],
            margin: '4rem 0',
            overflowX: 'hidden'
          }}
        >
          {props.children}
        </Col>
      </Row>
    </main>
  );
}
