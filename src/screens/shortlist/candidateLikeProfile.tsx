import React, { useEffect, useState } from 'react';
import { Dropdown, Layout, Menu, Button, message, Result } from 'antd';
import AppLayout from '../../layouts/app';
import UserProfileDetail from '../../components/UserProfileDetail';
import TopHeader, { MenuIcon } from '../find/Header';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { CloseOutlined, HeartFilled } from '@ant-design/icons';
import Loader from '../../components/loader/Loader';
import { IProfile } from '../../schemas/IProfile';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';

const { Content } = Layout;

function CandidateLikeProfile(props: any) {
  const [profile, setProfile] = useState({} as IProfile);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const user = props.user;
  const userProfile = user?.profile;

  const {
    match: { params },
  } = props;

  const getData = async () => {
    const { data } = await Axios.get<IProfile>(`profiles/${params?.id}`);
    setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    if (!userProfile) {
      return history.go(-1);
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectReport = {
    pathname: '/user/report-profile',
    state: { profile_id: userProfile.id },
  };

  const filterMenu = (
    <Menu className="filter-box">
      <Menu.Item key="0" onClick={() => handleReject(profile?.id, reload)}>
        Remove
      </Menu.Item>
      {userProfile && (
        <Menu.Item key="1">
          <Link to={redirectReport}>Report</Link>
        </Menu.Item>
      )}
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
          {profile && <UserProfileDetail profile={profile} />}
          <Layout.Footer className="find-actions-buttons">
            <div className="main">
              <div className="actions-buttons">
                <Button
                  className="btn-pass"
                  onClick={() => handleReject(user.id, reload)}
                  style={{ width: '50%' }}
                  disabled={userProfile.status !== 1}
                >
                  <CloseOutlined /> Reject
                </Button>
                <Button
                  className="btn-accept"
                  onClick={() => handleAccept(user.id, getData)}
                  style={{ width: '50%' }}
                  disabled={userProfile.status !== 1}
                >
                  {' '}
                  <HeartFilled /> Like back
                </Button>
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

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};
export default connect(mapStateToProps)(CandidateLikeProfile);

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
