import React from 'react';
import { Button, Col, Divider, Drawer, Row } from 'antd';
import { Link } from 'react-router-dom';
import './sidebar.less';
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterSquareFilled,
} from '@ant-design/icons';
const logo = require('../../assets/images/pakkijodi-logoH-white.png');
const playStore = require('../../assets/images/apple-store.svg');
const appStore = require('../../assets/images/google-store.svg');

interface IProps {
  visible: boolean | undefined;
  setVisible(data: boolean): any;
}
export default function PopMenu({ visible, setVisible }: IProps) {
  return (
    <Drawer
      height={'auto'}
      placement="top"
      closable={true}
      onClose={() => setVisible(!visible)}
      visible={visible}
    >
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="header-brand">
            <Link to="/">
              <img src={logo} alt="logo" height="120px" />
            </Link>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Button className="btn-store">
            <img src={appStore} alt="apple-store" />
          </Button>
          <Button className="btn-store">
            <img src={playStore} alt="google-store" />
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <LinksCard title="Company">
          <li>
            <Link to="/jobs"> Jobs</Link>
          </li>
          <li>
            <Link to="/contact"> Contacts</Link>
          </li>
        </LinksCard>
        <LinksCard title="community">
          <li>
            <a href="https://blog.pakkijodi.com/"> Blog </a>
          </li>
          <li>
            <Link to="/support">Support</Link>
          </li>
        </LinksCard>

        <LinksCard title="Legal">
          <li>
            <Link to="/privacy"> Privacy</Link>
          </li>
          <li>
            <Link to="/terms">Terms</Link>
          </li>

          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </LinksCard>
        {/* <LinksCard title="About Us">
          <li>
            <h2 className="text-muted mt-1">
              Collaborative platform for your family to help them select the newest member into
              their family
            </h2>
          </li>
        </LinksCard> */}
      </Row>
      <Divider />
      <Row>
        <Col span={24} className="social-icons">
          <h3 style={{ display: 'inline-block' }}>Stay Social</h3>
          <FacebookFilled />
          <InstagramFilled />
          <TwitterSquareFilled />
          <LinkedinFilled />
        </Col>
      </Row>
    </Drawer>
  );
}

const LinksCard = (props: any) => (
  <Col className="sidebar-links" xs={12} sm={12} md={6} lg={6} xl={6}>
    <h3>{props.title}</h3>
    <ul>{props.children}</ul>
  </Col>
);
