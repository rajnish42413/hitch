import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Layout, Row, Menu, Button, message, Result } from 'antd';
import AppLayout from '../../layouts/app';
import BottomFooter from '../find/Footer';
import UserProfileDetail from '../../components/UserProfileDetail';
import { HeaderSkelaton } from '../find/Header';
import { Link, useHistory } from 'react-router-dom';
import { colors } from '@constants/general';
import Axios from 'axios';
import Icon, {
  CloseOutlined,
  HeartFilled,
  ArrowLeftOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import Loader from '../../components/loader/Loader';
import { IShortlist } from '../../schemas/Shortlist';

const { Content } = Layout;

export default function CandidateLikeProfile(props: any) {
  const [list, setlist] = useState([] as Array<IShortlist>);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const history = useHistory();

  const {
    match: { params },
  } = props;
  console.log(params);

  const getData = async () => {
    const { data } = await Axios.get(`likes`);
    setlist(data);
    // if (data && params) {
    //   setCurrent(data.findIndex((x: any) => x.id === params.id));
    // }
    console.log(data);
    setCurrent(0);
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

  const filterMenu = (
    <Menu className="filter-box">
      <Menu.Item key="0">
        <button
          className="text-center"
          style={{ color: colors['danger-color'] }}
          onClick={() => handleReject(list[current]?.id, reload)}
        >
          Remove
        </button>
      </Menu.Item>
      <Menu.Item key="1">
        <button className="text-center">Report</button>
      </Menu.Item>
    </Menu>
  );

  const reload = () => {
    history.replace('/shortlisted');
  };

  return (
    <AppLayout>
      <TopHeader title={list[current]?.profile?.name} menu={filterMenu} />
      {loading ? (
        <Loader />
      ) : list?.length ? (
        <Content>
          <UserPagination onNext={onNext} onPrevous={onPrev} />
          <UserProfileDetail profile={list[current]?.profile} />
          {/* <div className="detail-likes-button-group">
            <Button
              shape="circle"
              size="large"
              danger
              className="button-shortlist-and-likes"
              onClick={() => handleReject(list[current]?.id, reload)}
            >
              <CloseOutlined />
            </Button>

            <Button
              shape="circle"
              size="large"
              type="link"
              className="button-shortlist-and-likes"
              onClick={() => handleAccept(list[current]?.id, getData)}
            >
              <HeartFilled />
            </Button>
          </div> */}
          <Layout.Footer className="find-actions-buttons">
            <div className="main">
              <div className="actions-buttons">
                <button
                  className="btn-pass"
                  onClick={() => handleReject(list[current]?.id, reload)}
                >
                  <CloseOutlined />
                </button>
                <button
                  className="btn-accept"
                  onClick={() => handleAccept(list[current]?.id, getData)}
                >
                  {' '}
                  <HeartFilled /> Accept Like
                </button>
              </div>
            </div>
          </Layout.Footer>
        </Content>
      ) : (
        <Result
          title={`No data available for  likes`}
          extra={
            <Button
              type="primary"
              key="console"
              size="middle"
              onClick={() => history.replace('/shortlisted')}
            >
              Go To Shortlists
            </Button>
          }
        />
      )}
      <BottomFooter />
    </AppLayout>
  );
}

interface IHeaderProps {
  title: any;
  menu: React.ReactElement;
}
const TopHeader = (props: IHeaderProps) => {
  return (
    <HeaderSkelaton>
      <Row>
        <Col span={16}>
          <Link to="/shortlisted">
            <Button type="link" className="user-name-tile">
              <ArrowLeftOutlined /> <h3>{props.title && props.title}</h3>
            </Button>
          </Link>
        </Col>
        <Col className="right-menu-icon" span={8}>
          <Dropdown overlay={props.menu} trigger={['click']} placement="bottomRight">
            <span onClick={(e) => e.preventDefault()}>
              <MenuIcon />{' '}
            </span>
          </Dropdown>
        </Col>
      </Row>
    </HeaderSkelaton>
  );
};

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

const handleReject = async (id: number, reload: Function) => {
  if (!id) return;
  const url = `likes/${id}`;
  let show = message.loading('Action Proccess ...', 0);
  await Axios.delete(url);
  setTimeout(show, 0);
  reload();
  message.success('Removed Successfully');
};

const handleAccept = async (id: number, reload: Function) => {
  if (!id) return;
  let show = message.loading('Action Proccess ...', 0);
  await Axios.put(`likes/${id}`, { status: 1 });
  setTimeout(show, 0);
  reload();
  message.success('Profile Accepted');
};
