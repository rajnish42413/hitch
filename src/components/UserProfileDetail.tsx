import React from 'react';
import { Carousel, Col, Row, Typography } from 'antd';
import { IEducation, IProfile } from '../schemas/IProfile';
import { getAge, getHeightWithLabelFromValue } from '@utils/helpers';
import {
  HeartOutlined,
  IdcardOutlined,
  SafetyOutlined,
  SmileOutlined,
  StarOutlined,
  BookOutlined,
} from '@ant-design/icons';
import Loader from './loader/Loader';
import moment from 'moment';
import ShareProfile from './ShareProfile';

interface IProps {
  profile: IProfile;
  shareButton?: boolean;
}

export default function UserProfileDetail({ profile, shareButton = false }: IProps) {
  const user = profile;
  return user ? (
    <>
      {profileCarasole(user, shareButton)}
      {profileDetail(user)}
    </>
  ) : (
    <Loader />
  );
}

const profileDetail = (user: IProfile) => {
  if (!user) return;
  return (
    <ul className="profile-detail-list">
      <li style={{ backgroundColor: '#E8E8E8' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <IdcardOutlined style={{ fontSize: '2rem' }} />
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
        <li style={{ backgroundColor: '#E0E0E0' }} key={i}>
          <Row justify="space-between" className="title-row" align="middle">
            <Col span={8} className="text-center">
              <SafetyOutlined style={{ fontSize: '2rem' }} />
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

      <li style={{ backgroundColor: '#D9D9D9' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <HeartOutlined style={{ fontSize: '2rem' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Mariatal status</Typography.Title>
              <p>{user.detail?.marital_status}</p>
            </Typography>
          </Col>
        </Row>
      </li>

      <li style={{ backgroundColor: '#E0E0E0' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <BookOutlined style={{ fontSize: '2rem' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Date of birth </Typography.Title>
              {user?.date_of_birth && `${moment(user.date_of_birth).format('DD-MMM-YYYY')}`}
            </Typography>
          </Col>
        </Row>
      </li>

      <li style={{ backgroundColor: '#D9D9D9' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <HeartOutlined style={{ fontSize: '2rem' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Age</Typography.Title>
              <p>{`${getAge(moment(user.date_of_birth).format('DD-MM-YYYY'))} yrs`}</p>
            </Typography>
          </Col>
        </Row>
      </li>

      <li style={{ backgroundColor: '#E0E0E0' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <SmileOutlined style={{ fontSize: '2rem' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Food choices</Typography.Title>
              <p>{'Vegetarian'}</p>
            </Typography>
          </Col>
        </Row>
      </li>

      <li style={{ backgroundColor: '#D9D9D9' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={8} className="text-center">
            <StarOutlined style={{ fontSize: '2rem' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>About me</Typography.Title>
              <p>{user.detail?.intro}</p>
            </Typography>
          </Col>
        </Row>
      </li>
      {/* <li style={{ backgroundColor: '#E0E0E0' }}>
        <Typography className="text-center my-2">
          <Typography.Title>Social profiles</Typography.Title>
        </Typography>
        <Button
          block
          className="mt-2"
          type="text"
          style={{ textTransform: 'capitalize', backgroundColor: '#185EB1' }}
        >
          {user.name}’s Facebook
        </Button>
        <Button
          block
          className="mt-1"
          style={{ textTransform: 'capitalize', color: '#000' }}
          type="primary"
        >
          {user.name}’s Instagram
        </Button>
      </li> */}
    </ul>
  );
};

const profileCarasole = (profile: IProfile | undefined, shareButton: boolean) => {
  if (!profile) return;
  return (
    <div
      style={{
        width: '100%',
        height: '385px',
        position: 'relative',
        borderRadius: '11px 11px 0 0',
      }}
    >
      <Carousel style={{ zIndex: 0 }} autoplay dots={false}>
        {profile?.media?.map((image: any, index: number) => (
          <img width="100%" height={385} src={image?.small} key={index} alt={profile.name} />
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
