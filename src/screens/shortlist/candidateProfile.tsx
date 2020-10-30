import React, { useEffect, useState } from 'react';
import { Dropdown, Layout, Menu, Button, message, Drawer, Divider } from 'antd';
import AppLayout from '../../layouts/app';
import UserProfileDetail from '../../components/UserProfileDetail';
import TopHeader, { MenuIcon } from '../find/Header';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';
import Icon, { PhoneFilled, MessageFilled, PhoneOutlined } from '@ant-design/icons';
import Loader from '../../components/loader/Loader';
import { IMember, IProfile } from '../../schemas/IProfile';
import { ReactComponent as DeleteSvg } from '../../assets/icons/delete.svg';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';

function CandidateProfile(props: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({} as IProfile);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null as any);
  const history = useHistory();

  const { members } = profile;
  const user = props.user;
  const userProfile = user?.profile;

  const {
    match: { params },
  } = props;

  const getData = async () => {
    const { data } = await Axios.get<IProfile>(`profiles/${params?.id}`);
    setProfile(data);
    setLoading(false);
  };

  const reload = () => {
    history.replace('/shortlisted');
  };

  useEffect(() => {
    if (!userProfile) {
      return history.go(-1);
    }
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const redirectReport = {
    pathname: '/user/report-profile',
    state: { profile_id: userProfile.id },
  };
  const filterMenu = (
    <Menu className="filter-box">
      <Menu.Item key="0" onClick={() => handleReject(user?.id, reload)}>
        Remove
      </Menu.Item>
      {userProfile && (
        <Menu.Item key="1">
          <Link to={redirectReport}>Report</Link>
        </Menu.Item>
      )}
    </Menu>
  );

  const callMenu =
    profile && userProfile ? (
      <div className="filter-box" style={{ border: 'none' }}>
        {userProfile.status === 1 ? (
          <>
            {members?.map((member: IMember) => (
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
                Call {profile?.name}’s {member?.sub_role}
              </Button>
            ))}

            <Button type="text" className="btn-text text-left" href={`tel:${profile?.phone}`} block>
              <span className="circle-icon">
                <PhoneOutlined />
              </span>
              {profile.sub_role !== 'self'
                ? `Call ${profile?.name + '’s ' + profile?.sub_role}`
                : `Call ${profile?.name}`}
            </Button>
            <Divider style={{ margin: '0.5em' }} />
          </>
        ) : null}

        <Button
          type="text"
          className="btn-text text-left"
          block
          onClick={() => handleReject(user.id, reload)}
        >
          <Icon component={DeleteSvg} style={{ fontSize: '42px' }} /> Delete Match
        </Button>
      </div>
    ) : (
      <> </>
    );

  const msg = `Hello ${profile.name}, we have a match on PakkiJodi.com`;

  return (
    <AppLayout>
      <TopHeader
        backHeader={true}
        backHeadertitle={profile?.name}
        rightMenu={
          <Dropdown overlay={filterMenu} trigger={['click']} placement="bottomRight">
            <MenuIcon />
          </Dropdown>
        }
      />
      {loading ? (
        <Loader />
      ) : (
        <Layout.Content>
          {profile && <UserProfileDetail profile={profile} shareButton={true} />}
          {userProfile && profile && (
            <Layout.Footer className="find-actions-buttons">
              <div className="main">
                <div className="actions-buttons">
                  <Button
                    className="btn-pass"
                    type="text"
                    onClick={() => {
                      setDrawerContent(callMenu);
                      setDrawerOpened(true);
                    }}
                    style={{ width: '50%' }}
                    disabled={userProfile.status !== 1}
                  >
                    <PhoneFilled color="#fff" /> Call
                  </Button>

                  {userProfile.status === 1 ? (
                    <a
                      className="btn-accept"
                      style={{ width: '50%' }}
                      href={`https://wa.me/+91${profile.phone}?text=${encodeURI(msg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {' '}
                      <MessageFilled color="#fff" /> Message
                    </a>
                  ) : (
                    <Button className="btn-accept" style={{ width: '50%' }} disabled={true}>
                      <MessageFilled color="#fff" /> Message
                    </Button>
                  )}
                </div>
              </div>
            </Layout.Footer>
          )}
        </Layout.Content>
      )}
      <ContactMenu visible={drawerOpened} setVisibal={setDrawerOpened} content={drawerContent} />
    </AppLayout>
  );
}

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};
export default connect(mapStateToProps)(CandidateProfile);

const handleReject = async (id: number, reload: Function) => {
  let show = message.loading('Action Proccess ...', 0);
  await Axios.delete(`shortlists/${id}`);
  setTimeout(show, 0);
  reload();
  message.success('Removed Successfully');
};

interface ICSProps {
  visible: boolean;
  setVisibal: Function;
  members?: Array<any>;
  content: any;
}
const ContactMenu = (props: ICSProps) => {
  return (
    <Drawer
      onClose={() => props.setVisibal(false)}
      title="Options"
      placement="bottom"
      closable={true}
      visible={props.visible}
    >
      {props.content}
    </Drawer>
  );
};
