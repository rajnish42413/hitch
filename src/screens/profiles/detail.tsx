import React, { useEffect, useState } from 'react';
import { Col, Layout, Row, Button, message } from 'antd';
import AppLayout from '../../layouts/app';
import UserProfileDetail from '../../components/UserProfileDetail';
import { HeaderSkelaton } from '../find/Header';
import { Link, useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Loader from '../../components/loader/Loader';
import { IProfile } from '../../schemas/IProfile';
import * as authToken from '@utils/userAuth';
import { Helmet } from 'react-helmet';
import { convertToSlug } from '@utils/helpers';

const { Content } = Layout;

export default function PorfileDetail(props: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({} as IProfile);
  const { id }: any = useParams();
  const history = useHistory();
  const profile_id = id;

  const getData = async () => {
    const token = authToken.get();
    if (token) {
      const { data } = await Axios.get<IProfile>(`profiles/${profile_id}`);
      setProfile(data);
      setLoading(false);
    } else {
      if (profile_id) authToken.setProfileRedirect(profile_id);
      message.warning('Login to visit profile');
      setProfile({} as IProfile);
      setLoading(false);
      history.push('/');
    }
  };

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return profile ? (
    <AppLayout>
      <Helmet>
        {profile.name && <title>{profile.name} | PakkiJodi</title>}
        <meta
          property="og:url"
          content={`https://www.pakkijodi.com/profiles/${profile.id}?name=${convertToSlug(
            profile.name
          )}`}
        />

        {profile?.media?.[0].thumb ? (
          <meta property="og:image" content={profile?.media?.[0].thumb} />
        ) : (
          <meta
            property="og:image"
            content="https://www.pakkijodi.com/static/media/pakkijodi-logoH-white.c42b1e31.png"
          />
        )}
      </Helmet>
      <TopHeader profile={profile} />
      {loading ? (
        <Loader />
      ) : (
        <Content>
          <UserProfileDetail profile={profile} />
        </Content>
      )}
    </AppLayout>
  ) : (
    <Loader />
  );
}

interface IHeaderProps {
  profile: IProfile;
}
const TopHeader = (props: IHeaderProps) => {
  return (
    <HeaderSkelaton>
      <Row>
        <Col span={24}>
          <Link to="/home">
            <Button type="link" className="user-name-tile">
              <ArrowLeftOutlined /> <h3>{props.profile?.name}</h3>
            </Button>
          </Link>
        </Col>
      </Row>
    </HeaderSkelaton>
  );
};
