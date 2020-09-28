import React, { useEffect, useState } from 'react';
import { Dropdown, Layout, Menu, Button, message } from 'antd';
import AppLayout from '../../layouts/app';
import UserProfileDetail from '../../components/UserProfileDetail';
import TopHeader, { MenuIcon } from '../find/Header';
import { useHistory, useLocation } from 'react-router-dom';
import { colors } from '@constants/general';
import Axios from 'axios';
import { PhoneFilled, CloseOutlined } from '@ant-design/icons';
import Loader from '../../components/loader/Loader';
import { IMember, IProfile } from '../../schemas/IProfile';

const { Content } = Layout;
// enum PType {
//   'profile',
//   'chat',
// }

export default function CandidateProfile(props: any) {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({} as IProfile);
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
    <Menu className="filter-box">
      {members?.length ? (
        members.map((member: IMember) => (
          <Menu.Item key={member.id}>
            <Button href={`tel:${member.phone}`}>{member.sub_role}</Button>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item>
          <Button href={`tel:${profile.phone}`}>{profile.sub_role + ' ' + profile.name}</Button>
        </Menu.Item>
      )}
    </Menu>
  );

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
                  <button className="btn-pass" onClick={() => handleReject(data_id, reload)}>
                    <CloseOutlined />
                  </button>
                  <Dropdown overlay={callMenu} trigger={['click']} placement="topRight">
                    <button className="btn-accept" onClick={(e) => e.preventDefault()}>
                      {' '}
                      <PhoneFilled /> Contact Profile Members
                    </button>
                  </Dropdown>
                </div>
              </div>
            </Layout.Footer>
          )}
        </Content>
      )}
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
