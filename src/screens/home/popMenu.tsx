import React from 'react';
import { Col, Divider, Drawer, Menu, Row } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import './sidebar.less';
import { FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';
import { byCast, byCity, byEducation } from '../../constants/seoMenus.json';
const logo = require('../../assets/images/pakkijodi-logoH-white.png');
const playStore = require('../../assets/images/apple-store.svg');
const appStore = require('../../assets/images/google-store.svg');

interface IProps {
  visible: boolean | undefined;
  setVisible(data: boolean): any;
}

const { SubMenu } = Menu;
export default function PopMenu({ visible, setVisible }: IProps) {
  const history = useHistory();

  const handleClick = ({ key }: any) => {
    if (key) history.push(key);
    return;
  };
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
          <Link className="btn-store" to="/comming-soon">
            <img src={appStore} alt="apple-store" />
          </Link>
          <Link className="btn-store" to="/comming-soon">
            <img src={playStore} alt="google-store" />
          </Link>
        </Col>
      </Row>
      <Divider />
      <Row>
        <LinksCard title="Company">
          <li>
            <Link to="/jobs"> Jobs</Link>
          </li>
          <li>
            <Link to="/contact-us"> Contacts</Link>
          </li>
        </LinksCard>
        <LinksCard title="community">
          <li>
            <a href="https://blog.pakkijodi.com/" target="_blank" rel="noopener noreferrer">
              {' '}
              Blog{' '}
            </a>
          </li>
          <li>
            <Link to="/support">Support</Link>
          </li>
        </LinksCard>

        <LinksCard title="Legal">
          <li>
            <Link to="/privacy-policy"> Privacy</Link>
          </li>
          <li>
            <Link to="/terms-and-conditions">Terms</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </LinksCard>
        <LinksCard title="Matrimonial Profiles by">
          <li>
            <Menu style={{ width: 256 }} mode="vertical" onClick={handleClick}>
              <SubMenu key="sub1" title="Community">
                {byCast.matrimony?.map((arr: any, i: number) => (
                  <Menu.Item key={arr.link}>{arr.title}</Menu.Item>
                ))}
              </SubMenu>
              <SubMenu key="sub2" title="City">
                {byCity.matrimony?.map((arr: any, i: number) => (
                  <Menu.Item key={arr.link}>{arr.title}</Menu.Item>
                ))}
              </SubMenu>
              <SubMenu key="sub3" title="College">
                {byEducation.matrimony?.map((arr: any, i: number) => (
                  <Menu.Item key={arr.link}>{arr.title}</Menu.Item>
                ))}
              </SubMenu>
            </Menu>
          </li>
        </LinksCard>
      </Row>
      <Divider />
      <Row>
        <Col span={24} className="social-icons">
          <h3 style={{ display: 'inline-block' }}>Stay Social</h3>
          <a href="https://www.facebook.com/pakki.jodi.7" target="_blank" rel="noopener noreferrer">
            <FacebookFilled />
          </a>
          <a href="https://www.instagram.com/pakkijodi/" target="_blank" rel="noopener noreferrer">
            <InstagramFilled />
          </a>
          <a href="https://twitter.com/PakkiJodi" target="_blank" rel="noopener noreferrer">
            <TwitterSquareFilled />
          </a>
          {/* <LinkedinFilled /> */}
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
