import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined, HeartFilled } from '@ant-design/icons';
import './landing.less';
import HelmetConfig from '../../components/HelmetConfig';
import { ITag } from '../../schemas/ITag.d';

const PopMenu = React.lazy(() => import('./popMenu'));
const LoginButtons = React.lazy(() => import('../../components/form/LoginButtons'));
const logo = require('../../assets/images/pakkijodi-logoH-white.png');
const playStore = require('../../assets/images/apple-store.svg');
const appStore = require('../../assets/images/google-store.svg');

interface IProps {
  homePage?: boolean;
  children?: any;
  className: string;
  defaultLoginModal?: boolean;
  defaultSideBar?: boolean;
  pageTitle?: string;
  customeTag?: ITag;
}
const PageSkeleton = React.forwardRef((props: IProps, ref: any) => {
  const [loginModal, setLoginModal] = useState(props.defaultLoginModal);
  const [visible, setVisible] = useState(props.defaultSideBar);

  return (
    <main className={props.className}>
      <HelmetConfig appendPageName={props.pageTitle} customeTags={props.customeTag} />
      <Header
        triggerLoginMoal={() => setLoginModal(!loginModal)}
        triggerSideBar={() => setVisible(!visible)}
      />

      {props.homePage && (
        <div className="pj-content">
          <Row>
            <Col span={12} className="content-box">
              <div className="landing-title-box">
                <h1>Let’s Get You Married!</h1>
                <p>
                  Collaborative platform for your family to help them select the newest member into
                  their family
                </p>
                <p>
                  <small>
                    {' '}
                    By clicking Join, you agree to our Terms. Learn how we process your data in our
                    Privacy Policy and Cookies Policy.{' '}
                  </small>
                </p>
                <Button
                  onClick={() => setLoginModal(!loginModal)}
                  type="primary"
                  block
                  style={{ maxWidth: '412px' }}
                >
                  Sign Up
                </Button>
              </div>
            </Col>
            <Col span={12} className="banner-box"></Col>
          </Row>
        </div>
      )}

      {props.children}
      <Modal centered visible={loginModal} onCancel={() => setLoginModal(false)} footer={null}>
        <div className="login-box">
          <HeartFilled style={{ fontSize: '2rem', color: '#E95C56' }} />
          <h3 className="title">Get Started</h3>

          <p>
            By clicking <span>Log in</span>, you agree to our , Learn how we process your data in
            our
            <a className="mx-1" href="/">
              Privacy Policy
            </a>
            and
            <a className="mx-1" href="https://policies.tinder.com/cookie-policy?lang=en">
              Cookie Policy
            </a>
            .
          </p>
          <LoginButtons type="pop" />
          <hr />
          <h3>get the app!</h3>
          <Button className="btn-store">
            <img src={appStore} alt="apple-store" />
          </Button>
          <Button className="btn-store">
            <img src={playStore} alt="google-store" />
          </Button>
        </div>
      </Modal>
      <PopMenu visible={visible} setVisible={(data: boolean) => setVisible(data)} />
    </main>
  );
});

export default PageSkeleton;

const Header = ({ triggerLoginMoal, triggerSideBar }: any) => {
  return (
    <header className="pj-header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/">
            <img src={logo} alt="logo" height="120px" />
          </Link>
        </div>
        <div>
          <Button type="link" onClick={() => triggerSideBar()} style={{ padding: 0 }}>
            <MenuOutlined style={{ color: '#000', fontSize: '2rem' }} />
          </Button>
        </div>
      </div>
    </header>
  );
};
