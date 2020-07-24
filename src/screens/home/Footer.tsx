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
                  <Button type="text" block size="large">
                    Find
                  </Button>
                </Link>
              </Col>
              <Col span={8}>
                <Link to="/shortlisted">
                  <Button type="text" block size="large">
                    Shortlist
                  </Button>
                </Link>
              </Col>
              <Col span={8}>
                <Link to="/profile">
                  <Button type="text" block size="large">
                    Profile
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  );
};

export default BottomFooter;
