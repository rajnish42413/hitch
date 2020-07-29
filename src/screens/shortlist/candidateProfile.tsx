import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Layout, Row, Menu, Button } from 'antd';
import AppLayout from '../../layouts/app';
import BottomFooter from '../home/Footer';
import UserProfileDetail from '../../components/UserProfileDetail';
import { HeaderSkelaton } from '../home/Header';
import { Link } from 'react-router-dom';
import { colors } from '@constants/general';
import Axios from 'axios';
import Icon, { PhoneOutlined, CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { callMenu } from './index';
import Loader from '../loader/Loader';

const { Content } = Layout;

export default function CandidateProfile(props: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({} as IShortList);

  const { match: { params } } = props;

  const getData = async () => {
    const { data } = await Axios.get<IShortList>(
      `https://5f11a9a565dd950016fbda11.mockapi.io/shortlist/${params?.id}`
    );
    setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppLayout>
      <TopHeader profile={profile} />
      {loading ? <Loader /> :
        <Content>
          <UserProfileDetail />

          <div className="detail-likes-button-group">

            <Button
              shape="circle"
              size="large"
              className="button-shortlist-and-likes"
              danger
              style={{ position: 'absolute', bottom: '-12px', left: '-12px' }}
            >
              <CloseOutlined />
            </Button>
            <Dropdown overlay={callMenu} trigger={['click']} placement="topRight" >
              <Button
                shape="circle"
                size="large"
                type="link"
                className="button-shortlist-and-likes"
                style={{
                  position: 'absolute',
                  bottom: '-12px',
                  right: '-12px',
                  borderColor: colors['primary-color']
                }}
                onClick={e => e.preventDefault()}
              >
                <PhoneOutlined />
              </Button>
            </Dropdown>
          </div>
        </Content>}
      <BottomFooter />
    </AppLayout>
  );
}

interface IHeaderProps {
  profile: IShortList;
}
const TopHeader = (props: IHeaderProps) => {
  return (
    <HeaderSkelaton>
      <Row>
        <Col span={16}>
          <Link to="/shortlisted">
            <Button type="link" className="user-name-tile">
              <ArrowLeftOutlined /> <h3>{props.profile?.name}</h3>
            </Button>
          </Link>
        </Col>
        <Col className="right-menu-icon" span={8}>
          <Dropdown overlay={filterMenu} trigger={['click']} placement="bottomRight">
            <span onClick={e => e.preventDefault()}>
              <MenuIcon />{' '}
            </span>
          </Dropdown>
        </Col>
      </Row>
    </HeaderSkelaton>
  );
};

const filterMenu = (
  <Menu className="filter-box">
    <Menu.Item key="0">
      <button className="text-center" style={{ color: colors['danger-color'] }}>
        Remove
      </button>
    </Menu.Item>
    <Menu.Item key="1">
      <button className="text-center">Report</button>
    </Menu.Item>
  </Menu>
);

const MenuIcon = (props: any) => <Icon component={MenuSvg} {...props} />;
const MenuSvg = () => (
  <svg width="5" height="35" viewBox="0 0 5 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 34.5518H5V28.7932H0V34.5518ZM0 20.155H5V14.3964H0V20.155ZM0 0V5.75864H5V0H0Z"
      fill="black"
    />
  </svg>
);
