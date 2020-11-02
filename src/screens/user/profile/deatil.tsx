import React, { Dispatch, useEffect, useState } from 'react';
import { Button, Carousel, Col, Layout, Row, Spin, Typography } from 'antd';
import AppLayout from '../../../layouts/app';
import Icon, { ShareAltOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import TopHeader from '../../../screens/find/Header';
import { IProfile, IEducation } from '../../../schemas/IProfile';
import { getAge, getHeightWithLabelFromValue, getZodiac } from '@utils/helpers';
import { IUser } from '../../../schemas/IUser';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import ShareProfile from '../../../components/ShareProfile';

// import { ReactComponent as StarSvg } from '../../../assets/icons/star.svg';
import { ReactComponent as WorkSvg } from '../../../assets/icons/work-icon.svg';
import { ReactComponent as EduSvg } from '../../../assets/icons/college.svg';
import { ReactComponent as HeartSvg } from '../../../assets/icons/heart.svg';
import { ReactComponent as DOBSvg } from '../../../assets/icons/DOB.svg';
import { ReactComponent as AboutSvg } from '../../../assets/icons/created_by.svg';
import { ReactComponent as AgeSvg } from '../../../assets/icons/age.svg';
import { ReactComponent as ZodicAvg } from '../../../assets/icons/zodiacsign.svg';

import { IHandle } from '../../../schemas/IProfileHandles.d';
import Axios from 'axios';

const { Content } = Layout;

const UserDetail = (props: any) => {
  const { user } = props;
  const [profileSocial, setProfileSocial] = useState({} as IHandle);
  const [socialLoading, setSocialLoading] = useState(true);
  const history = useHistory();
  const handleEditPhotos = () => {
    history.push('/user/images', { backTo: '/profile', hideBottomButton: true });
    return;
  };

  const getData = async () => {
    const { data } = await Axios.get('social-handles');
    setProfileSocial(data);
    setSocialLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppLayout mainConatinerClass="mb-0" appendPageTitle={user?.profile?.name}>
      <TopHeader
        backHeader={true}
        backHeadertitle={user ? user.name : 'Profile Detail'}
        backTo="/profile"
      />
      <Content>
        {profileCarasole(user.profile, handleEditPhotos)}
        <ProfileDetail user={user} socialLoading={socialLoading} profileSocial={profileSocial} />
      </Content>
    </AppLayout>
  );
};

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setUser: (data: IUser) => dipatch(SetUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);

interface IPorifleDetail {
  user: IUser;
  socialLoading: boolean;
  profileSocial: IHandle;
}
const ProfileDetail = ({ user, socialLoading, profileSocial }: IPorifleDetail) => {
  const history = useHistory();
  if (!user) return <></>;
  const profile = user.profile;
  return (
    <ul className="profile-detail-list">
      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <Icon component={WorkSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title
                level={4}
              >{`${profile.detail?.designation} at ${profile.detail?.workplace}`}</Typography.Title>
              <p>
                earns{' > '}
                {profile?.detail?.salary_range} per annum
              </p>
            </Typography>
          </Col>
          <Col span={3}>
            <Button
              type="text"
              onClick={() => history.push('/user/create/profile-workspace', { edit: true })}
            >
              Edit
            </Button>
          </Col>
        </Row>
      </li>

      {profile.educations?.map((education: IEducation, i: number) => (
        <li key={i}>
          <Row justify="space-between" className="title-row" align="middle">
            <Col span={5} className="text-center">
              <Icon component={EduSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
            </Col>
            <Col span={16}>
              <Typography>
                <Typography.Title level={4}>{education?.edu_level}</Typography.Title>
                <p>{education?.college_name}</p>
              </Typography>
            </Col>
            <Col span={3}>
              <Button
                type="text"
                onClick={() =>
                  history.push('/user/create/profile-education', {
                    edit: true,
                    education: education,
                  })
                }
              >
                Edit
              </Button>
            </Col>
          </Row>
        </li>
      ))}

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <Icon component={HeartSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Mariatal status</Typography.Title>
              <p>{profile.detail?.marital_status}</p>
            </Typography>
          </Col>
          <Col span={3}>
            {' '}
            <Button
              type="text"
              onClick={() =>
                history.push('/user/create/profile-maritial-status', {
                  edit: true,
                })
              }
            >
              Edit
            </Button>
          </Col>
        </Row>
      </li>

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <Icon component={DOBSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={19}>
            <Typography>
              <Typography.Title level={4}>Date of birth </Typography.Title>
              {user?.date_of_birth && `${moment(user.date_of_birth).format('DD-MMM-YYYY')}`}
            </Typography>
          </Col>
        </Row>
      </li>

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <Icon component={AgeSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={19}>
            <Typography>
              <Typography.Title level={4}>Age</Typography.Title>
              <p>{`${getAge(moment(user.date_of_birth).format('DD-MM-YYYY'))} yrs`}</p>
            </Typography>
          </Col>
        </Row>
      </li>

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <Icon component={ZodicAvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Zodiac Sign</Typography.Title>
              <p>{getZodiac(user.date_of_birth)}</p>
            </Typography>
          </Col>
          <Col span={3}>{/* <Button type="text">Edit</Button> */}</Col>
        </Row>
      </li>

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <Icon component={AboutSvg} style={{ fontSize: '2rem' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>About me</Typography.Title>
              <p>{profile.detail?.intro}</p>
            </Typography>
          </Col>
          <Col span={3}>
            <Button
              type="text"
              onClick={() =>
                history.push('/user/introduction', {
                  edit: true,
                })
              }
            >
              Edit
            </Button>
          </Col>
        </Row>
      </li>
      <li style={{ paddingBottom: '2rem' }}>
        <Spin spinning={socialLoading}>
          {profileSocial && (
            <Row justify="space-between" className="title-row" align="middle">
              <Col span={5} className="text-center">
                {' '}
                <ShareAltOutlined style={{ fontSize: '2rem' }} />{' '}
              </Col>
              <Col span={16}>
                <Typography>
                  <Typography.Title level={4}>Social profiles</Typography.Title>
                </Typography>
              </Col>
              <Col span={3}>
                <Button
                  type="text"
                  onClick={() =>
                    history.push('/user/create/social-handles', {
                      edit: true,
                    })
                  }
                >
                  Edit
                </Button>
              </Col>
              <Col span={24}>
                {profileSocial.facebook && (
                  <Button
                    block
                    className="mt-2 facebook"
                    type="text"
                    href={profileSocial.facebook}
                    target="_blank"
                  >
                    {profile.name}’s Facebook
                  </Button>
                )}

                {profileSocial.instagram && (
                  <Button
                    block
                    className="mt-1 instagram"
                    style={{ textTransform: 'capitalize' }}
                    href={profileSocial.instagram}
                    target="_blank"
                  >
                    {profile.name}’s Instagram
                  </Button>
                )}

                {profileSocial.linkedin && (
                  <Button
                    block
                    className="mt-1 linkedin"
                    href={profileSocial.linkedin}
                    target="_blank"
                  >
                    {profile.name}’s Linkedin
                  </Button>
                )}
              </Col>
            </Row>
          )}
        </Spin>
      </li>
    </ul>
  );
};

const profileCarasole = (profile: IProfile | undefined, handleEditPhotos: any) => {
  if (!profile) return;

  return (
    <div className="profile-carousel">
      <Carousel style={{ zIndex: 0 }} autoplay dots={false}>
        {profile?.media?.map((image: any, index: number) => (
          <img className="carousel-img" src={image?.medium} key={index} alt={profile.name} />
        ))}
      </Carousel>
      <div className="profile-detail-box">
        <div className="mt-1 flex-row mx-1">
          <div>
            <button className="ant-btn btn-white-round" onClick={handleEditPhotos}>
              Edit Photos
            </button>
            <Link className="ant-btn btn-white-round" style={{ marginLeft: '1em' }} to="/user/edit">
              Edit Basic Detail
            </Link>
          </div>
          <ShareProfile name={profile.name} profile_id={profile.id} />
        </div>

        <Row justify="space-between" className="title-row" align="middle">
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>{profile.name}</Typography.Title>
              <p>{`${profile?.detail?.community} in ${profile?.detail?.city}`}</p>
            </Typography>
          </Col>
          <Col span={8} className="text-center">
            <Typography>
              <Typography.Title level={4} style={{ textAlign: 'right' }}>
                {getHeightWithLabelFromValue(profile.detail?.height)}
              </Typography.Title>
            </Typography>
          </Col>
        </Row>
      </div>
    </div>
  );
};
