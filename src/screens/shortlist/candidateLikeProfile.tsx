import React, { useEffect, useState } from 'react';
import { Dropdown, Layout, Menu, Button, message, Result } from 'antd';
import AppLayout from '../../layouts/app';
import UserProfileDetail from '../../components/UserProfileDetail';
import TopHeader, { MenuIcon } from '../find/Header';
import { useHistory, useLocation } from 'react-router-dom';
import { colors } from '@constants/general';
import Axios from 'axios';
import { CloseOutlined, HeartFilled } from '@ant-design/icons';
import Loader from '../../components/loader/Loader';
import { IProfile } from '../../schemas/IProfile';

const { Content } = Layout;

export default function CandidateLikeProfile(props: any) {
  const [profile, setProfile] = useState({} as IProfile);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const history = useHistory();

  const {
    match: { params },
  } = props;
  const { data_id } = location.state;

  const getData = async () => {
    const { data } = await Axios.get<IProfile>(`profiles/${params?.id}`);
    setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterMenu = (
    <Menu className="filter-box">
      <Menu.Item key="0">
        <button
          className="text-center"
          style={{ color: colors['danger-color'] }}
          onClick={() => handleReject(profile?.id, reload)}
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
      <TopHeader
        backHeader={true}
        backHeadertitle={profile?.name}
        rightMenu={
          <Dropdown overlay={filterMenu} trigger={['click']} placement="bottomRight">
            <MenuIcon />
          </Dropdown>
        }
      />
      {loading ? (
        <Loader />
      ) : profile ? (
        <Content>
          {/* <UserPagination onNext={onNext} onPrevous={onPrev} /> */}
          <UserProfileDetail profile={profile} />
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
                  onClick={() => handleReject(data_id, reload)}
                  style={{ width: '50%' }}
                >
                  <CloseOutlined /> Reject
                </button>
                <button
                  className="btn-accept"
                  onClick={() => handleAccept(data_id, getData)}
                  style={{ width: '50%' }}
                >
                  {' '}
                  <HeartFilled /> Like back
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
    </AppLayout>
  );
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
