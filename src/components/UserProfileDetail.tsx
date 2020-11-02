import React, { useEffect, useState } from 'react';
import { Button, Carousel, Col, Row, Spin, Typography } from 'antd';
import { IEducation, IProfile } from '../schemas/IProfile';
import { getAge, getHeightWithLabelFromValue, getZodiac } from '@utils/helpers';
import Icon, { ShareAltOutlined } from '@ant-design/icons';
import Loader from './loader/Loader';
import moment from 'moment';
import ShareProfile from './ShareProfile';

import { ReactComponent as WorkSvg } from '../assets/icons/work-icon.svg';
import { ReactComponent as EduSvg } from '../assets/icons/college.svg';
import { ReactComponent as HeartSvg } from '../assets/icons/heart.svg';
import { ReactComponent as DOBSvg } from '../assets/icons/DOB.svg';
import { ReactComponent as AboutSvg } from '../assets/icons/created_by.svg';
import { ReactComponent as AgeSvg } from '../assets/icons/age.svg';
import { ReactComponent as ZodicAvg } from '../assets/icons/zodiacsign.svg';
import { IHandle } from '../schemas/IProfileHandles';
import Axios from 'axios';

interface IProps {
  profile: IProfile;
  shareButton?: boolean;
}

export default function UserProfileDetail({ profile, shareButton = false }: IProps) {
  const user = profile;
  const [profileSocial, setProfileSocial] = useState({} as IHandle);
  const [socialLoading, setSocialLoading] = useState(true);

  const getData = async () => {
    const { data } = await Axios.get(`profiles/${profile.id}/socials`);
    setProfileSocial(data);
    setSocialLoading(false);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user ? (
    <>
      {profileCarasole(user, shareButton)}
      <ProfileDetail user={user} socialLoading={socialLoading} profileSocial={profileSocial} />
    </>
  ) : (
    <Loader />
  );
}

interface IPorifleDetail {
  user: IProfile;
  socialLoading: boolean;
  profileSocial: IHandle;
}
const ProfileDetail = ({ user, socialLoading, profileSocial }: IPorifleDetail) => {
  if (!user) return <> </>;
  return (
    <ul className="profile-detail-list">
      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <Icon component={WorkSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title
                level={4}
              >{`${user.detail?.designation} at ${user.detail?.workplace}`}</Typography.Title>
              <p>
                earns{' > '}
                {user?.detail?.salary_range} per annum
              </p>
            </Typography>
          </Col>
        </Row>
      </li>

      {user?.educations?.map((education: IEducation, i: number) => (
        <li key={i}>
          <Row justify="space-between" className="title-row" align="middle">
            <Col span={8} className="text-center">
              <Icon component={EduSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
            </Col>
            <Col span={16}>
              <Typography>
                <Typography.Title level={4}>{education?.edu_level}</Typography.Title>
                <p>{education?.college_name}</p>
              </Typography>
            </Col>
          </Row>
        </li>
      ))}

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <Icon component={HeartSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Mariatal status</Typography.Title>
              <p>{user.detail?.marital_status}</p>
            </Typography>
          </Col>
        </Row>
      </li>

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <Icon component={DOBSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Date of birth </Typography.Title>
              {user?.date_of_birth && `${moment(user.date_of_birth).format('DD-MMM-YYYY')}`}
            </Typography>
          </Col>
        </Row>
      </li>

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <Icon component={AgeSvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Age</Typography.Title>
              <p>{`${getAge(moment(user.date_of_birth).format('DD-MM-YYYY'))} yrs`}</p>
            </Typography>
          </Col>
        </Row>
      </li>

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <Icon component={ZodicAvg} style={{ fontSize: '2rem', color: 'transparent' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Zodiac Sign</Typography.Title>
              <p>{getZodiac(user.date_of_birth)}</p>
            </Typography>
          </Col>
        </Row>
      </li>

      <li>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <Icon component={AboutSvg} style={{ fontSize: '2rem' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>About me</Typography.Title>
              <p>{user.detail?.intro}</p>
            </Typography>
          </Col>
        </Row>
      </li>
      <li style={{ paddingBottom: '2rem' }}>
        <Spin spinning={socialLoading}>
          {profileSocial && (
            <Row justify="space-between" className="title-row" align="middle">
              <Col span={8} className="text-center">
                {' '}
                <ShareAltOutlined style={{ fontSize: '2rem' }} />{' '}
              </Col>
              <Col span={16}>
                <Typography>
                  <Typography.Title level={4}>Social profiles</Typography.Title>
                </Typography>
              </Col>

              <Col span={24}>
                <Button
                  block
                  className="mt-2 facebook"
                  type="text"
                  href={profileSocial?.facebook}
                  target="_blank"
                  disabled={!profileSocial?.facebook}
                >
                  {user.name}’s Facebook
                </Button>

                <Button
                  block
                  className="mt-1 instagram"
                  style={{ textTransform: 'capitalize' }}
                  href={profileSocial.instagram}
                  target="_blank"
                  disabled={!profileSocial?.instagram}
                >
                  {user.name}’s Instagram
                </Button>

                <Button
                  block
                  className="mt-1 linkedin"
                  href={profileSocial.linkedin}
                  target="_blank"
                  disabled={!profileSocial?.linkedin}
                >
                  {user.name}’s Linkedin
                </Button>
              </Col>
            </Row>
          )}
        </Spin>
      </li>
    </ul>
  );
};

const profileCarasole = (profile: IProfile | undefined, shareButton: boolean) => {
  if (!profile) return;
  return (
    <div className="profile-carousel">
      <Carousel style={{ zIndex: 0 }} autoplay dots={false}>
        {profile?.media?.map((image: any, index: number) => (
          <img className="carousel-img" src={image?.medium} key={index} alt={profile.name} />
        ))}
      </Carousel>
      <div className="profile-detail-box">
        {shareButton && (
          <div className="mt-1 flex-row mx-1" style={{ flexDirection: 'row-reverse' }}>
            <ShareProfile name={profile.name} profile_id={profile.id} />
          </div>
        )}
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
