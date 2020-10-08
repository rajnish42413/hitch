import React, { Dispatch } from 'react';
import { Button, Carousel, Col, Layout, Row, Typography } from 'antd';
import AppLayout from '../../../layouts/app';
import {
  HeartOutlined,
  IdcardOutlined,
  SafetyOutlined,
  SmileOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import TopHeader from '../../../screens/find/Header';
import { IProfile, IEducation } from '../../../schemas/IProfile';
import { getHeightWithLabelFromValue } from '@utils/helpers';
import { IUser } from '../../../schemas/IUser';
import { useHistory } from 'react-router-dom';

const { Content } = Layout;

const UserDetail = (props: any) => {
  const { user } = props;

  return (
    <AppLayout>
      <TopHeader
        backHeader={true}
        backHeadertitle={user ? user.name : 'Profile Detail'}
        backTo="/profile"
      />
      <Content>
        {profileCarasole(user)}
        <ProfileDetail user={user} />
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
}
const ProfileDetail = ({ user }: IPorifleDetail) => {
  const history = useHistory();
  console.log(user);

  if (!user) return <></>;
  const profile = user.profile;
  return (
    <ul className="profile-detail-list">
      <li style={{ backgroundColor: '#E8E8E8' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <IdcardOutlined style={{ fontSize: '2rem' }} />
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
        <li style={{ backgroundColor: '#E0E0E0' }} key={i}>
          <Row justify="space-between" className="title-row" align="middle">
            <Col span={5} className="text-center">
              <SafetyOutlined style={{ fontSize: '2rem' }} />
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

      <li style={{ backgroundColor: '#D9D9D9' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <HeartOutlined style={{ fontSize: '2rem' }} />
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

      <li style={{ backgroundColor: '#E0E0E0' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <SmileOutlined style={{ fontSize: '2rem' }} />
          </Col>
          <Col span={16}>
            <Typography>
              <Typography.Title level={4}>Food choices</Typography.Title>
              <p>{'Vegetarian'}</p>
            </Typography>
          </Col>
          <Col span={3}>{/* <Button type="text">Edit</Button> */}</Col>
        </Row>
      </li>

      <li style={{ backgroundColor: '#D9D9D9' }}>
        <Row justify="space-between" className="title-row" align="middle">
          <Col span={5} className="text-center">
            <StarOutlined style={{ fontSize: '2rem' }} />
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
          {profile.name}’s Facebook
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
