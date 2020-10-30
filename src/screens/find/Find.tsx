import React, { Dispatch, useEffect, useState } from 'react';
import { Button, message, Result, Modal, Card, Layout, Spin } from 'antd';
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
import { Link } from 'react-router-dom';
import ProfileVerificationStatus from '../../components/ProfileStatus';

const Home = (props: any) => {
  const [list, setlist] = useState([] as Array<IProfile>);
  const [loading, setloading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [nextPage, setPage] = useState('');
  const [suggestion, setSuggestion] = useState(false);
  const isFirstTime = props?.tourVisibal;
  const [tooltip, setTooltip] = useState(isFirstTime ? 'profile-detail' : '');

  const fetchProfiles = async (url: string) => {
    setloading(true);
    const { data } = await Axios.get(url);
    if (data) {
      setlist(data?.data);
      setPage(data.next_page_url);
      setloading(false);
    }
  };

  useEffect(() => {
    if (isFirstTime) {
      props.setTourVisibal(true);
    }
    fetchProfiles('profiles');
  }, [isFirstTime, props]);

  const onNext = () => {
    setloading(true);
    setCurrent(nextItem(current, list.length));
    setloading(false);
    if (current === list.length - 1 && nextPage) {
      fetchProfiles(nextPage);
    }
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
      const data = list.filter((item: any) => item.id !== profile_id);
      setlist(data);
      onNext();
      setBtnLoading(false);
    } catch (error) {
      setTimeout(show, 0);
      setBtnLoading(false);
    }
  };

  const handleRemoveProfile = async (profile_id: number) => {
    if (!profile_id) return;
    setBtnLoading(true);
    let show = message.loading('removing ...', 0);
    try {
      await Axios.post(`user/remove-profile`, { profile_id: profile_id });
      setTimeout(show, 0);
      const data = list.filter((item: any) => item.id !== profile_id);
      setlist(data);
      onNext();
      setBtnLoading(false);
    } catch (error) {
      setTimeout(show, 0);
      setBtnLoading(false);
    }
  };

  const nextTooltip = (current: string) => {
    switch (current) {
      case 'prefrence':
        setTooltip('shortlist');
        break;
      case 'shortlist':
        setTooltip('profile-detail');
        break;
      case 'profile-detail':
        props.setTourVisibal(false);
        setTooltip('');
        break;
      case 'profile-name':
        setTooltip('prefrence');
        break;
      default:
        setTooltip('profile-name');
        break;
    }
  };

  const disableActionButton = (): boolean => {
    const { profile } = props?.user;
    if (btnLoading) return true;
    if (profile?.status === 1 || profile?.status === 2 || profile?.status === 4) return false;
    return true;
  };

  return (
    <AppLayout>
      <TopHeader tooltipVisibal={tooltip} nextTooltip={nextTooltip} />
      {loading ? (
        <Loader />
      ) : (
        <>
          {props.user?.profile && (
            <ProfileVerificationStatus
              status={props.user?.profile?.status}
              setUser={props.setUser}
              goToProfile={true}
            />
          )}
          {list[current] ? (
            <Spin spinning={loading}>
              <div className="user-pagination">
                <Button
                  shape="circle"
                  icon={<LeftOutlined style={{ color: colors['white-color'] }} />}
                  size="large"
                  style={{ backgroundColor: '#C1C1C1' }}
                  onClick={onPrev}
                  data-tut="second-step"
                />

                {props.user.role === 'profile' && props.user.sub_role === 'self' ? (
                  props.questions?.user_answer?.for_ideal ? (
                    <Link
                      to={{
                        pathname: `profile/questions`,
                        state: list[current],
                      }}
                      className="suggestion-box"
                    >
                      Calculate Your Matching
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: `profile/${list[current]?.id}/match-statics`,
                        state: list[current],
                      }}
                      className="suggestion-box"
                    >
                      See Your Jodi!
                    </Link>
                  )
                ) : (
                  <Button
                    type="text"
                    className="suggestion-box"
                    onClick={() => setSuggestion(!suggestion)}
                  >
                    <Icon component={HeartSvg} style={{ fontSize: '25px' }} />
                    See Your Jodi!
                  </Button>
                )}

                <Button
                  shape="circle"
                  icon={<RightOutlined style={{ color: colors['white-color'] }} />}
                  size="large"
                  style={{ backgroundColor: '#C1C1C1' }}
                  onClick={onNext}
                  data-tut="third-step"
                />
              </div>
              <div data-tut="profile-photo" style={{ marginBottom: '3rem' }}>
                <UserProfileDetail profile={list[current]} shareButton={true} />
              </div>
              <Layout.Footer className="find-actions-buttons">
                <div className="main">
                  <div className="actions-buttons">
                    <Button
                      className="btn-pass"
                      onClick={() => handleRemoveProfile(list[current]?.id)}
                      disabled={disableActionButton()}
                    >
                      Pass
                    </Button>
                    <Button
                      className="btn-accept"
                      onClick={() => handleAddShortlist(list[current]?.id)}
                      disabled={disableActionButton()}
                    >
                      <HeartFilled /> Are you the one?
                    </Button>
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
                  <Link
                    to={{
                      pathname: `profile/${list[current]?.id}/match-statics`,
                      state: list[current],
                    }}
                    className="mt-1"
                  >
                    <Button type="primary" block>
                      Calculate Your Matching
                    </Button>
                  </Link>
                </Card>
              </Modal>
            </Spin>
          ) : (
            <Result
              title={`Currently,No matching profiles available.`}
              extra={
                <Link to="/profile">
                  <Button type="primary" key="console" size="middle">
                    Go To Profile
                  </Button>
                </Link>
              }
            />
          )}
        </>
      )}
    </AppLayout>
  );
};
const mapStateToProps = ({ user, tour, questions }: IAppState) => {
  return {
    user: user.data,
    tourVisibal: tour.visible,
    questions: questions.data,
  };
};

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setUser: (data: IUser) => dipatch(SetUser(data)),
    setTourVisibal: (data: boolean) => dipatch(SetTourVisibility(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

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
