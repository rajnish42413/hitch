import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Layout, Row, Menu, Button, Switch } from 'antd';
import AppLayout from '../../layouts/app';
import BottomFooter from '../home/Footer';
import UserProfileDetail from '../../components/UserProfileDetail';
import { HeaderSkelaton } from '../home/Header';
import { Link } from 'react-router-dom';
import { colors } from '@constants/general';
import Axios from 'axios';
import Icon, {
  CloseOutlined,
  HeartOutlined,
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import Chat from './chat';
import Loader from '../loader/Loader';

const { Content } = Layout;
enum PType {
  'chat',
  'profile'
}

export default function CandidateLikeProfile(props: any) {
  const [list, setlist] = useState([] as Array<IShortList>);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [pageType, setPageType] = useState(PType.profile);

  const {
    match: { params }
  } = props;

  const getData = async () => {
    const { data } = await Axios.get(`https://5f11a9a565dd950016fbda11.mockapi.io/shortlist`);
    setlist(data);
    if (data && params) {
      setCurrent(data.findIndex((x: any) => x.id === params.id));
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onNext = () => {
    setLoading(true);
    setCurrent(nextItem(current, list.length));
    setLoading(false);
  };

  const onPrev = () => {
    setLoading(true);
    setCurrent(prevItem(current, list.length));
    setLoading(false);
  };

  return (
    <AppLayout>
      <TopHeader profile={list[current]} />
      <Switch
        checkedChildren="PROFILE"
        unCheckedChildren="CHAT"
        defaultChecked
        style={{ display: 'block', margin: '1rem' }}
        onChange={() => setPageType(pageType === PType.chat ? PType.profile : PType.chat)}
      />
      {loading ? <Loader /> :
      pageType === PType.profile ? (
        <Content>
          <UserPagination onNext={onNext} onPrevous={onPrev} />
          <UserProfileDetail />
          <div className="detail-likes-button-group">
            <Button shape="circle" size="large" danger className="button-shortlist-and-likes">
              <CloseOutlined />
            </Button>

            <Button
              shape="circle"
              size="large"
              type="link"
              className="button-shortlist-and-likes"
              onClick={e => e.preventDefault()}
            >
              <HeartOutlined />
            </Button>
          </div>
        </Content>
      ) : (
        <Chat />
      )}
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
              <ArrowLeftOutlined /> <h3>{props.profile && props.profile.name}</h3>
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

const UserPagination = (props: any) => {
  return (
    <div className="user-pagination">
      <Button
        shape="circle"
        icon={<LeftOutlined style={{ color: colors['white-color'] }} />}
        size="large"
        style={{ backgroundColor: '#C1C1C1' }}
        onClick={props.onPrevous}
      />
      <div className="suggestion-box">
        <h3>Suggestion here</h3>
      </div>
      <Button
        shape="circle"
        icon={<RightOutlined style={{ color: colors['white-color'] }} />}
        size="large"
        style={{ backgroundColor: '#C1C1C1' }}
        onClick={props.onNext}
      />
    </div>
  );
};

const MenuIcon = (props: any) => <Icon component={MenuSvg} {...props} />;
const MenuSvg = () => (
  <svg width="5" height="35" viewBox="0 0 5 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 34.5518H5V28.7932H0V34.5518ZM0 20.155H5V14.3964H0V20.155ZM0 0V5.75864H5V0H0Z"
      fill="black"
    />
  </svg>
);

function nextItem(i: number, len: number) {
  i = i + 1;
  if (i >= len) {
    return len - 1;
  }
  return i;
}

function prevItem(i: number, len: number) {
  if (i === 0) {
    i = 1;
  }
  i = i - 1;
  return i;
}
