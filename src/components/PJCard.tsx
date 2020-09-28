import React from 'react';
import { Button, Spin, Typography, Row, Col, Divider, message } from 'antd';
import { PhoneOutlined, LoadingOutlined } from '@ant-design/icons';
import { IMember } from '../schemas/IProfile.d';
import { Link } from 'react-router-dom';
import { getHeightWithLabelFromValue } from '@utils/helpers';
import { MenuIcon } from '../screens/find/Header';
import { IShortlist } from '../schemas/Shortlist';
import Icon from '@ant-design/icons';
import { ReactComponent as LikeUSvg } from '../assets/icons/u_like.svg';
import { ReactComponent as LikeBySvg } from '../assets/icons/like_by.svg';
import { ReactComponent as Matchvg } from '../assets/icons/match.svg';
import { ReactComponent as DeleteSvg } from '../assets/icons/delete.svg';
import Axios from 'axios';

interface ISProps {
  data: IShortlist;
  reload: Function;
  setDrawerOpened: Function;
  setDrawerContent: Function;
  profile_id: number;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function PJCard({
  data,
  reload,
  setDrawerOpened,
  setDrawerContent,
  profile_id,
}: ISProps) {
  const { profile } = data;
  const { detail, members } = profile;

  const redirect = {
    pathname: `/shortlist/user/${profile.id}`,
    state: { data_id: data.id },
  };

  const callMenu = (
    <div className="filter-box" style={{ border: 'none' }}>
      {members?.length ? (
        members.map((member: IMember) => (
          <Button
            type="text"
            className="btn-text mt-1 text-left"
            href={`tel:${member.phone}`}
            key={member.id}
            block
          >
            <span>
              <PhoneOutlined />
            </span>{' '}
            Call {profile.name}’s {member.sub_role}
          </Button>
        ))
      ) : (
        <Button type="text" className="btn-text text-left" href={`tel:${profile.phone}`} block>
          <span className="circle-icon">
            <PhoneOutlined />
          </span>
          {profile.sub_role !== 'self'
            ? `Call ${profile.name + '’s ' + profile.sub_role}`
            : `Call ${profile.name}`}
        </Button>
      )}
      <Divider style={{ margin: '0.5em' }} />
      <Button
        type="text"
        className="btn-text text-left"
        block
        onClick={() => handleReject(data.id, reload)}
      >
        <Icon component={DeleteSvg} style={{ fontSize: '42px' }} /> Delete Match
      </Button>
    </div>
  );

  return (
    <Col span={12} className="thumb-card-01">
      <Spin indicator={antIcon} spinning={profile ? false : true} key={data.id}>
        <Link to={redirect}>
          <div className="image-overlay">
            <img
              alt={'hello caption here'}
              src={
                profile?.image?.thumb ? profile?.image?.thumb : 'https://via.placeholder.com/150'
              }
            />
            <div className="profile-detail-box small">
              <Row justify="space-between" className="title-row" align="middle">
                <Col span={16}>
                  <Typography>
                    <Typography.Title level={5}>{profile.name}</Typography.Title>
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
              <LikeandMatchAttributes data={data} profile_id={profile_id} />
            </div>
          </div>
        </Link>
        <div className="flex-row detail-box">
          <Row justify="space-between" className="title-row" align="middle">
            <Col span={20}>
              <Typography>
                <Typography.Title level={4}>
                  {detail.designation} at {detail.workplace}
                </Typography.Title>
                <p>
                  {'>'}
                  {detail?.salary_range} per annum
                </p>
              </Typography>
            </Col>
            <Col span={4} className="text-center">
              <Typography.Title level={4} style={{ textAlign: 'right' }}>
                <MenuIcon
                  onClick={() => {
                    setDrawerContent(callMenu);
                    setDrawerOpened(true);
                  }}
                />
              </Typography.Title>
            </Col>
          </Row>
        </div>
      </Spin>
    </Col>
  );
}

interface ILProps {
  data: IShortlist;
  profile_id: number;
}
const LikeandMatchAttributes = ({ data, profile_id }: ILProps) => {
  if (data.status === 2) {
    return (
      <div className="likes-attribute-box">
        <Icon component={Matchvg} style={{ fontSize: '1.5rem' }} /> Its a match
      </div>
    );
  }

  if (data.user_profile_id === profile_id) {
    return (
      <div className="likes-attribute-box">
        <Icon component={LikeUSvg} style={{ fontSize: '1.5rem' }} />
        {data.profile.gender === 'female' ? ' You like her' : ' You like him'}
      </div>
    );
  }
  return (
    <div className="likes-attribute-box">
      <Icon component={LikeBySvg} style={{ fontSize: '1.5rem' }} />
      {data.profile.gender === 'female' ? ' She like you' : ' He like you'}
    </div>
  );
};

const handleReject = async (id: number, reload: Function) => {
  const url = `shortlists/${id}`;
  let show = message.loading('Action Proccess ...', 0);
  await Axios.delete(url);
  setTimeout(show, 0);
  reload();
  message.success('Deleted Successfully');
};
