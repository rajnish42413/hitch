import React, { Dispatch, useEffect, useState } from 'react';
import { Button, message, Result, Alert, Modal, Card, Layout } from 'antd';
import AppLayout from '../../layouts/app';
import Icon, { LeftOutlined, RightOutlined, HeartFilled } from '@ant-design/icons';
import { colors } from '@constants/general';
import TopHeader from './Header';
import UserProfileDetail from '../../components/UserProfileDetail';
import Axios from 'axios';
import { IProfile } from '../../schemas/IProfile';
import Loader from '../../components/loader/Loader';
import { connect } from 'react-redux';
import { IUser } from '../../schemas/IUser';
import { IAction, SetTourVisibility, SetUser } from '@redux/actions';
import { IAppState } from '@redux/reducers';
import { ReactComponent as HeartSvg } from '../../assets/icons/Heart_wh.svg';
import { ReactComponent as JodiHeartSvg } from '../../assets/icons/Heart_Red.svg';

const Home = (props: any) => {
  const [list, setlist] = useState([] as Array<IProfile>);
  const [loading, setloading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [suggestion, setSuggestion] = useState(false);
  const isFirstTime = props?.tourVisibal;
  const [tooltip, setTooltip] = useState(isFirstTime ? 'profile-detail' : '');

  const fetchProfiles = async () => {
    setloading(true);
    const { data } = await Axios.get(`profiles`);
    if (data) {
      setlist(data?.data);
      setloading(false);
    }
  };

  useEffect(() => {
    if (isFirstTime) {
      props.setTourVisibal(true);
    }
    fetchProfiles();
  }, [isFirstTime, props]);

  const onNext = () => {
    setloading(true);
    setCurrent(nextItem(current, list.length));
    setloading(false);
  };

  const onPrev = () => {
    setloading(true);
    setCurrent(prevItem(current, list.length));
    setloading(false);
  };

  const handleAddShortlist = async (profile_id: number) => {
    setBtnLoading(true);
    let show = message.loading('Action Proccess ...', 0);
    try {
      await Axios.post('shortlists', { profile_id: profile_id });
      setTimeout(show, 0);
      message.success('added to shortlists');
      setBtnLoading(false);
      fetchProfiles();
    } catch (error) {
      setTimeout(show, 0);
      setBtnLoading(false);
      fetchProfiles();
    }
  };

  const handleRemoveProfile = async (profile_id: number) => {
    if (!profile_id) return;
    setBtnLoading(true);
    let show = message.loading('removing ...', 0);
    try {
      await Axios.post(`user/remove-profile`, { profile_id: profile_id });
      setTimeout(show, 0);
      setBtnLoading(false);
      fetchProfiles();
    } catch (error) {
      setTimeout(show, 0);
      setBtnLoading(false);
      fetchProfiles();
    }
  };

  const nextTooltip = (current: string) => {
    switch (current) {
      case 'prefrence':
        setTooltip('shortlist');
        break;
      case 'shortlist':
        props.setTourVisibal(false);
        setTooltip('');
        break;
      case 'profile-detail':
        setTooltip('shortlist');
        break;
      case 'profile-name':
        setTooltip('prefrence');
        break;
      default:
        setTooltip('profile-name');
        break;
    }
  };

  return (
    <AppLayout>
      <TopHeader tooltipVisibal={tooltip} nextTooltip={nextTooltip} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {props.user?.profile && renderUserStatus(props.user.profile.status, props.setUser)}
          {list[current] ? (
            <>
              <UserPagination
                onNext={onNext}
                onPrevous={onPrev}
                suggestion={() => setSuggestion(!suggestion)}
              />
              <div data-tut="profile-photo">
                <UserProfileDetail profile={list[current]} />
              </div>

              <Layout.Footer className="find-actions-buttons">
                <div className="main">
                  <div className="actions-buttons">
                    <button
                      className="btn-pass"
                      onClick={() => handleRemoveProfile(list[current]?.id)}
                      disabled={props.user.status === 1 ? (btnLoading ? true : false) : true}
                    >
                      Pass
                    </button>
                    <button
                      className="btn-accept"
                      onClick={() => handleAddShortlist(list[current]?.id)}
                      disabled={props.user.status === 1 ? (btnLoading ? true : false) : true}
                    >
                      {' '}
                      <HeartFilled /> Are you the one?
                    </button>
                  </div>
                </div>
              </Layout.Footer>

              <Modal
                title=""
                visible={suggestion}
                onCancel={() => setSuggestion(!suggestion)}
                centered
                footer={null}
                width={350}
              >
                <Card className="suggestion-box-modal mt-2" bordered={false}>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <img
                      src={props?.user?.profile?.media[0]?.thumb}
                      alt={props?.user?.name}
                      width="150px"
                      height="150px"
                    />
                    <img
                      src={list[current]?.media?.[0]?.thumb}
                      alt={list[current]?.name}
                      width="150px"
                      height="150px"
                    />
                  </div>
                  <p style={{ fontWeight: 'bold' }}>
                    <Icon
                      component={JodiHeartSvg}
                      style={{ fontSize: '32px', position: 'relative', top: '10px' }}
                    />{' '}
                    {list[current]?.name} {'&'} {props?.user?.profile?.name}
                  </p>
                </Card>
              </Modal>
            </>
          ) : (
            <Result
              title={`Currently,No matching profiles available.`}
              extra={
                <Button type="primary" key="console" size="middle" href="/profile">
                  Go To Profile
                </Button>
              }
            />
          )}
        </>
      )}
    </AppLayout>
  );
};
const mapStateToProps = ({ user, tour }: IAppState) => {
  return {
    user: user.data,
    tourVisibal: tour.visible,
  };
};

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setUser: (data: IUser) => dipatch(SetUser(data)),
    setTourVisibal: (data: boolean) => dipatch(SetTourVisibility(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const UserPagination = (props: any) => {
  return (
    <div className="user-pagination">
      <Button
        shape="circle"
        icon={<LeftOutlined style={{ color: colors['white-color'] }} />}
        size="large"
        style={{ backgroundColor: '#C1C1C1' }}
        onClick={props.onPrevous}
        data-tut="second-step"
      />
      <div className="suggestion-box" onClick={props.suggestion}>
        <h3>
          <Icon component={HeartSvg} style={{ fontSize: '25px' }} />
          See Your PakkiJodi!
        </h3>
      </div>

      <Button
        shape="circle"
        icon={<RightOutlined style={{ color: colors['white-color'] }} />}
        size="large"
        style={{ backgroundColor: '#C1C1C1' }}
        onClick={props.onNext}
        data-tut="third-step"
      />
    </div>
  );
};

function nextItem(i: number, len: number) {
  i = i + 1;
  i = i % len;
  return i;
}

function prevItem(i: number, len: number) {
  if (i === 0) {
    i = 1;
  }
  i = i - 1;
  return i;
}

export const renderUserStatus = (status: number, setUser: any) => {
  console.log(status);
  const getUser = async () => {
    const { data } = await Axios.get('user');
    setUser(data);
  };

  if (status === 0) {
    return (
      <Alert
        message={`Your Profile is under processing !`}
        type="warning"
        closable
        className="mt-1"
        description={
          <Button type="link" size="small" onClick={() => getUser()}>
            Refresh
          </Button>
        }
      />
    );
  }
  if (status === 2) {
    return <Alert message="Your Profile is under verification !" type="warning" closable />;
  }
  if (status === 3) {
    return (
      <Alert
        message="Profile Detail not completed , Your Profile is not completed yet.You can update profile from profile setting tab"
        description={
          <Button type="link" size="small" onClick={() => getUser()}>
            Refresh
          </Button>
        }
        type="info"
        showIcon
        className="mt-1"
        closable
      />
    );
  }
  if (status === 4) {
    return (
      <Alert
        message="Your Profile is under re-verification !"
        type="warning"
        closable
        className="mt-1"
        description={
          <Button type="link" size="small" onClick={() => getUser()}>
            Refresh
          </Button>
        }
      />
    );
  }

  if (status === 5) {
    return (
      <Alert
        message="Your Profile rejected by system"
        type="error"
        closable
        className="mt-1"
        description={
          <Button type="link" size="small" onClick={() => getUser()}>
            Refresh
          </Button>
        }
      />
    );
  }
  return null;
};
