import React, { useState } from 'react';
import { Row, Col, Modal, Button, Layout } from 'antd';
import Icon from '@ant-design/icons';
import './Home.less';

const MenuIcon = (props: any) => <Icon component={MenuSvg} {...props} />;

const TopHeader = (props: any) => {
  const [visible, setVisible] = useState(false);
  const handleCancel = (e: any) => {
    setVisible(false);
  };
  return (
    <>
      <HeaderSkelaton>
        <Row>
          <Col span={16}>
            <div className="user-name-tile">
              <h3>Rajnish Singh</h3>
            </div>
          </Col>
          <Col className="right-menu-icon" span={8}>
            <Button type="text" onClick={() => setVisible(true)}>
              <MenuIcon />
            </Button>
          </Col>
        </Row>
      </HeaderSkelaton>
      <Modal visible={visible} onCancel={handleCancel} footer={null}>
        <div className="mt-2" />
        <Button size="large" block danger>
          Report
        </Button>
        <div className="mt-2" />
        <Button size="large" block>
          Remove
        </Button>
        <div className="mt-2" />
      </Modal>
    </>
  );
};

export default TopHeader;

const MenuSvg = () => (
  <svg width="5" height="35" viewBox="0 0 5 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 34.5518H5V28.7932H0V34.5518ZM0 20.155H5V14.3964H0V20.155ZM0 0V5.75864H5V0H0Z"
      fill="black"
    />
  </svg>
);

export const HeaderSkelaton = (props: any) => {
  return (
    <Layout.Header className="home-header">
      <div className="main">
        <Row justify="center" align="middle">
          <Col xs={24} sm={24} md={14} lg={14} xl={16}>
            {props.children}
          </Col>
        </Row>
      </div>
    </Layout.Header>
  );
};
