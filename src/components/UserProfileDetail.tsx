import React from 'react';
import { Button, Carousel, Col, Row, Typography } from 'antd';
import { IEducation, IProfile } from '../schemas/IProfile';
import { getHeightWithLabelFromValue } from '@utils/helpers';
import {
  HeartOutlined,
  IdcardOutlined,
  SafetyOutlined,
  SmileOutlined,
  StarOutlined,
} from '@ant-design/icons';
import Loader from './loader/Loader';

interface IProps {
  profile: IProfile;
}

export default function UserProfileDetail(props: IProps) {
  const user = props.profile;
  console.log(user);
  return user ? (
    <>
      {profileCarasole(user)}
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
      <li style={{ backgroundColor: '#E0E0E0' }}>
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
      </li>
    </ul>
  );
};

const profileCarasole = (profile: IProfile | undefined) => {
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
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>{profile.name}</Typography.Title>
              <p>Brahmin in Delhi, India</p>
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
