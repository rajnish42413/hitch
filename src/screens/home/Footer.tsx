import React from 'react';
import { Button, Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';

const BottomFooter = (props: any) => {
  return (
    <Layout.Footer className="home-footer">
      <div className="main">
        <Row justify="center" align="middle">
          <Col xs={24} sm={24} md={14} lg={14} xl={16}>
            <Row>
              <Col span={8}>
                <Link to="/home">
                  <Button
                    type="text"
                    block
                    size="large"
                    style={{ height: '60px', lineHeight: '60px' }}
                  >
                    Find
                  </Button>
                </Link>
              </Col>
              <Col span={8}>
                <Link to="/shortlisted">
                  <Button
                    type="text"
                    block
                    size="large"
                    style={{ height: '60px', lineHeight: '60px' }}
                  >
                    Shortlist
                  </Button>
                </Link>
              </Col>
              <Col span={8}>
                <Button
                  type="text"
                  block
                  size="large"
                  style={{ height: '60px', lineHeight: '60px' }}
                >
                  Profile
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  );
};

export default BottomFooter;
