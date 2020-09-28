import React from 'react';
import { Button, Col, Layout, Row } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, PaperClipOutlined, IdcardOutlined } from '@ant-design/icons';

const BottomFooter = (props: any) => {
  return (
    <Layout.Footer className="home-footer">
      <div className="main">
        <Row>
          <Col span={8}>
            <Link to="/home">
              <Button type="text" block size="large">
                <SearchOutlined /> <br />
                Find
              </Button>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/shortlisted">
              <Button type="text" block size="large">
                <PaperClipOutlined /> <br />
                Shortlist
              </Button>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/profile">
              <Button type="text" block size="large">
                <IdcardOutlined /> <br />
                Profile
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  );
};

export default BottomFooter;
