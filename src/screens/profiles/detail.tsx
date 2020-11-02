import React, { useEffect, useState } from 'react';
import { Col, Layout, Row, Button, Alert, Result } from 'antd';
import AppLayout from '../../layouts/app';
import UserProfileDetail from '../../components/UserProfileDetail';
import { HeaderSkelaton } from '../find/Header';
import { Link, useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Loader from '../../components/loader/Loader';
import { IProfile } from '../../schemas/IProfile';
import * as authToken from '@utils/userAuth';
import { convertToSlug } from '@utils/helpers';
import { ITag } from '../../schemas/ITag.d';

const { Content } = Layout;

export default function PorfileDetail(props: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({} as IProfile);
  const [tag, settag] = useState({} as ITag);
  const token = authToken.get();
  const { id }: any = useParams();
  const history = useHistory();
  const profile_id = id;

  const getData = async () => {
    try {
      const { data } = await Axios.get<IProfile>(`profiles/${profile_id}`);
      const t = {
        PageName: `${data.name} | PakkiJodi`,
        URL: `https://www.pakkijodi.com/profiles/${data.id}?name=${convertToSlug(data.name)}`,
        Title: `${data.name} on PakkiJodi`,
        MetaKeywords: `${data.name} , Matrimony, Marriage, Free Matrimonial Sites, Match Making`,
        MetaDescription: `${data.name} on PakkiJodi`,
        CanonicalTag: 'https://pakkijodi.com/',
        RobotTag: 'noindex nofollow',
        alternateHreflangTag: 'https://pakkijodi.com/',
        image: data?.media?.[0].thumb,
      };
      settag(t);
      setProfile(data);
      setLoading(false);
    } catch (error) {
      setProfile({} as IProfile);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return !loading ? (
    <AppLayout customeTag={tag}>
      <TopHeader profile={profile.name ? profile.name : 'Profile Detail'} />
      {!token && (
        <Alert
          message="Please Login ! , to perform more action on this profile"
          type="warning"
          closable
          style={{ marginBottom: '1em' }}
          description={
            <Button type="link" size="small" onClick={() => history.push('/')}>
              Login
            </Button>
          }
        />
      )}
      <Content>
        {profile?.id ? (
          <UserProfileDetail profile={profile} />
        ) : (
          <Result
            title="Profile not found"
            subTitle="Sorry, something went wrong."
            extra={
              <Button type="primary" href="/">
                Back Home
              </Button>
            }
          />
        )}
      </Content>
    </AppLayout>
  ) : (
    <Loader />
  );
}

interface IHeaderProps {
  profile: string;
}
const TopHeader = (props: IHeaderProps) => {
  return (
    <HeaderSkelaton>
      <Row>
        <Col span={24}>
          <Link to="/home">
            <Button type="link" className="user-name-tile">
              <ArrowLeftOutlined /> <h3>{props.profile}</h3>
            </Button>
          </Link>
        </Col>
      </Row>
    </HeaderSkelaton>
  );
};
