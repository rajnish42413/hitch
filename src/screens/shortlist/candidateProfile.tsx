import React, { useEffect, useState } from 'react';
import { Dropdown, Layout, Menu, Button, message, Drawer, Divider } from 'antd';
import AppLayout from '../../layouts/app';
import UserProfileDetail from '../../components/UserProfileDetail';
import TopHeader, { MenuIcon } from '../find/Header';
import { useHistory, useLocation } from 'react-router-dom';
import { colors } from '@constants/general';
import Axios from 'axios';
import Icon, { PhoneFilled, MessageFilled, PhoneOutlined } from '@ant-design/icons';
import Loader from '../../components/loader/Loader';
import { IMember, IProfile } from '../../schemas/IProfile';
import { ReactComponent as DeleteSvg } from '../../assets/icons/delete.svg';

const { Content } = Layout;
// enum PType {
//   'profile',
//   'chat',
// }

export default function CandidateProfile(props: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({} as IProfile);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null as any);
  const location = useLocation();
  const history = useHistory();
  const { data_id } = location.state;
  const { members } = profile;

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
    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filterMenu = (
    <Menu className="filter-box">
      <Menu.Item key="0">
        <button
          className="text-center"
          style={{ color: colors['danger-color'] }}
          onClick={() => handleReject(data_id, reload)}
        >
          Remove
        </button>
      </Menu.Item>
      <Menu.Item key="1">
        <button className="text-center">Report</button>
      </Menu.Item>
    </Menu>
  );

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
        onClick={() => handleReject(data_id, reload)}
      >
        <Icon component={DeleteSvg} style={{ fontSize: '42px' }} /> Delete Match
      </Button>
    </div>
  );

  const msg = `Hello ${profile.name} , we got match on PakkiJodi.com`;

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
        <Content>
          {/* <Switch
            checkedChildren="PROFILE"
            unCheckedChildren="CHAT"
            defaultChecked
            onChange={() => setPType(pType === PType.profile ? PType.chat : PType.chat)}
            style={{ display: 'block', margin: '1rem' }}
          /> */}

          <UserProfileDetail profile={profile} />
          {data_id && (
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
                  >
                    <PhoneFilled color="#fff" /> Call
                  </Button>

                  <a
                    className="btn-accept"
                    style={{ width: '50%' }}
                    href={`https://wa.me/+91${profile.phone}?text=${encodeURI(msg)}`}
                  >
                    {' '}
                    <MessageFilled color="#fff" /> Message
                  </a>
                </div>
              </div>
            </Layout.Footer>
          )}
        </Content>
      )}
      <ContactMenu visible={drawerOpened} setVisibal={setDrawerOpened} content={drawerContent} />
    </AppLayout>
  );
}

interface IHeaderProps {
  profile: IProfile;
  menu: React.ReactElement;
}
// const TopHeader = (props: IHeaderProps) => {
//   return (
//     <HeaderSkelaton>
//       <Row>
//         <Col span={16}>
//           <Link to="/shortlisted">
//             <Button type="link" className="user-name-tile">
//               <ArrowLeftOutlined /> <h3>{props.profile?.name}</h3>
//             </Button>
//           </Link>
//         </Col>
//         <Col className="right-menu-icon" span={8}>
//           <Dropdown overlay={props.menu} trigger={['click']} placement="bottomRight">
//             <span onClick={(e) => e.preventDefault()}>
//               <MenuIcon />{' '}
//             </span>
//           </Dropdown>
//         </Col>
//       </Row>
//     </HeaderSkelaton>
//   );
// };

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
