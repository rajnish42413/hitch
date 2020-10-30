import React from 'react';
import { Button, Col, Layout, Popover, Row } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, PaperClipOutlined, IdcardOutlined } from '@ant-design/icons';

interface IProps {
  nextTooltip?: any;
  tooltipVisibal?: string;
}

const BottomFooter = (props: IProps) => {
  const content = (title: string, current: string, okText?: string) => {
    return (
      <div>
        <p>{title}</p>
        <br />
        <Button size="small" type="primary" onClick={() => props.nextTooltip(current)}>
          {okText ? okText : 'OK'}
        </Button>
      </div>
    );
  };

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
            <Popover
              content={() => content('You can see shortlisted profiles from this tab', 'shortlist')}
              visible={props.tooltipVisibal === 'shortlist' ? true : false}
            >
              <Link to="/shortlisted">
                <Button type="text" block size="large">
                  <PaperClipOutlined /> <br />
                  Shortlist
                </Button>
              </Link>
            </Popover>
          </Col>
          <Col span={8}>
            <Popover
              content={() =>
                content('You can see profile detail from this tab', 'profile-detail', 'Done')
              }
              visible={props.tooltipVisibal === 'profile-detail' ? true : false}
            >
              <Link to="/profile">
                <Button type="text" block size="large">
                  <IdcardOutlined /> <br />
                  Profile
                </Button>
              </Link>
            </Popover>
          </Col>
        </Row>
      </div>
    </Layout.Footer>
  );
};

export default BottomFooter;
