import React from 'react';
import Icon, { UserOutlined } from '@ant-design/icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Button from 'antd/lib/button';
import Layout from 'antd/lib/layout';
import { Row, Col, Popover } from 'antd';
import { ReactComponent as BackSvg } from '../../assets/icons/back.svg';

interface IProps {
  backHeadertitle?: string;
  backHeader?: boolean;
  backTo?: string;
  rightMenu?: any;
  nextTooltip?: any;
  tooltipVisibal?: string;
}
const TopHeader = (props: IProps) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const goBack = () => {
    if (props.backTo) {
      history.push(props.backTo);
    } else {
      history.go(-1);
    }
  };

  const content = (title: string, current: string, okText?: string) => {
    return (
      <div>
        <p>{title}</p>
        <br />
        <Button
          size="small"
          type="text"
          onClick={() => props.nextTooltip(current)}
          className="btn-red"
        >
          {okText ? okText : 'OK'}
        </Button>
      </div>
    );
  };

  return (
    <HeaderSkelaton>
      {props.backHeader ? (
        <Row>
          <Col span={16}>
            <Button type="link" className="user-name-tile" onClick={goBack}>
              <Icon component={BackSvg} style={{ fontSize: '1.2rem' }} />{' '}
              <h3>{props.backHeadertitle || 'Go Back'}</h3>
            </Button>
          </Col>
          <Col span={8} className="right-menu-icon">
            {props.rightMenu && props.rightMenu}
          </Col>
        </Row>
      ) : (
        <ul className="flex-row flex-justify-start app-navbar">
          <li>
            <Popover
              content={() =>
                content('You can see profile detail from this tab', 'profile-detail', 'Done')
              }
              visible={props.tooltipVisibal === 'profile-detail' ? true : false}
              placement="bottomLeft"
            >
              <Link to="/profile">
                <Button
                  className={`nav-icon ${pathname === '/profile' && 'active'}`}
                  type="text"
                  shape="circle"
                  size="small"
                >
                  <UserOutlined />
                </Button>
              </Link>
            </Popover>
          </li>
          <li>
            <Link to="/home" className={`nav-link ${pathname === '/home' && 'active'}`}>
              Profiles
            </Link>
          </li>
          <li>
            <Popover
              content={() => content('You can see shortlisted profiles from this tab', 'shortlist')}
              visible={props.tooltipVisibal === 'shortlist' ? true : false}
              placement="bottomLeft"
            >
              <Link
                to="/shortlisted"
                className={`nav-link ${pathname === '/shortlisted' && 'active'}`}
              >
                Shortlists
              </Link>
            </Popover>
          </li>
        </ul>
      )}
    </HeaderSkelaton>
  );
};

export default TopHeader;

export const HeaderSkelaton = (props: any) => {
  return (
    <Layout.Header className="home-header">
      <div className="main">{props.children}</div>
    </Layout.Header>
  );
};

export const MenuIcon = (props: any) => <Icon component={MenuSvg} {...props} />;
const MenuSvg = () => (
  <svg
    id="Capa_1"
    width="25"
    height="25"
    viewBox="0 0 515.555 515.555"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m303.347 18.875c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0" />
    <path d="m303.347 212.209c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0" />
    <path d="m303.347 405.541c25.167 25.167 25.167 65.971 0 91.138s-65.971 25.167-91.138 0-25.167-65.971 0-91.138c25.166-25.167 65.97-25.167 91.138 0" />
  </svg>
);
