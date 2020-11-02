import React, { Dispatch } from 'react';
import { Button, Layout, List, Modal, Typography, message, Tag } from 'antd';
import TopHeader from '../../find/Header';
//import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Link, useHistory } from 'react-router-dom';
import Icon, { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';

import Loader from '../../../components/loader/Loader';
import * as authToken from '@utils/userAuth';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import { IUser } from '../../../schemas/IUser';
import Axios from 'axios';
import AppLayout from '../../../layouts/app';
import { ReactComponent as AddSvg } from '../../../assets/icons/add.svg';
import { ReactComponent as HelpSvg } from '../../../assets/icons/help.svg';
import { ReactComponent as SettingSvg } from '../../../assets/icons/setting.svg';
import { ReactComponent as OutSvg } from '../../../assets/icons/logout.svg';
import ProfileVerificationStatus from '../../../components/ProfileStatus';

const { Content } = Layout;

const UserProfile = (props: any) => {
  const { user } = props;
  const photos = user?.profile?.media;

  const history = useHistory();

  // const onSortEnd = ({ oldIndex, newIndex }: any) => {
  //   setPhotos(arrayMove(photos, oldIndex, newIndex));
  //   photos?.forEach((image: IImage, index: number) => {
  //     image.index = index;
  //   });
  //   handleReOrder(photos);
  // };

  // const handleReOrder = async (photos: Array<IImage>) => {
  //   if (!photos) return;
  //   const { data } = await Axios.put(`profile/images`, { media: photos });
  //   if (data.data) props.setUser(data.data);
  // };

  const handleLogout = async () => {
    Modal.confirm({
      title: 'Do you Want to Logout?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk() {
        submitLogout();
      },
      onCancel() {},
    });
  };

  const submitLogout = async () => {
    let show = message.loading('Action Proccess ...', 0);
    const { data } = await Axios.post('logout');
    if (data) {
      setTimeout(show, 0);
      message.success('Logout Successfully');
      authToken.clearAll();
      history.push('/');
    }
  };

  return (
    <AppLayout appendPageTitle={user?.profile?.name}>
      <TopHeader />
      {user ? (
        <Content>
          {user.profile && (
            <ProfileVerificationStatus
              status={user?.profile?.status}
              setUser={props.setUser}
              goToProfile={false}
            />
          )}
          <div style={{ padding: '1rem' }}>
            <div className="user-profile-box flex-row">
              {photos[0]?.small ? (
                <img src={photos[0]?.small} alt={user.name} height="80px" width="80px" />
              ) : (
                <UserOutlined style={{ fontSize: '5em' }} />
              )}
              <Typography>
                <Typography.Title level={4}>{user.name}</Typography.Title>
                <p>{user?.profile?.detail?.city}</p>
                <p>
                  <Tag color={'green'}>{user.sub_role}</Tag>
                  {/* <Tag>{user.profile.gender}</Tag> */}
                </p>
              </Typography>
            </div>
            <Link to="/user/detail">
              <Button block className="btn-red">
                View/ Edit Profile
              </Button>
            </Link>
          </div>

          <List className="profile-buttons">
            <List.Item>
              <Link to="/profile-users">
                <Button type="text" block>
                  <Icon component={AddSvg} style={{ fontSize: '2rem' }} /> Add friends/family
                </Button>
              </Link>
            </List.Item>
            <List.Item>
              <Link to="/account">
                <Button type="text" block>
                  <Icon component={SettingSvg} style={{ fontSize: '2rem' }} /> Account settings
                </Button>
              </Link>
            </List.Item>
            <List.Item>
              <Link to="/help">
                <Button type="text" block>
                  <Icon component={HelpSvg} style={{ fontSize: '2rem' }} /> Help{' '}
                </Button>
              </Link>
            </List.Item>
            <List.Item>
              <Link to="/preference">
                <Button type="text" block>
                  <Icon component={SettingSvg} style={{ fontSize: '2rem' }} />
                  Profile Preference
                </Button>
              </Link>
            </List.Item>
            {user.role === 'profile' && user.sub_role === 'self' && (
              <List.Item>
                <Link to="/profile/questions">
                  <Button type="text" block>
                    <Icon component={HelpSvg} style={{ fontSize: '2rem' }} />
                    Match Calculater Q {'&'} A
                  </Button>
                </Link>
              </List.Item>
            )}
            <List.Item>
              <Button type="text" block onClick={handleLogout}>
                <Icon component={OutSvg} style={{ fontSize: '2rem' }} /> Logout
              </Button>
            </List.Item>
          </List>
        </Content>
      ) : (
        <Loader />
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

// const SortableList = SortableContainer((props: any) => {
//   const images = props.images;
//   const profile_id = props.profile_id;
//   const totalLeft: number = 6 - +(props.images ? props.images?.length : 0);
//   const history = useHistory();
//   return (
//     <Row gutter={16} className="mt-1" style={{ padding: '20px' }}>
//       {images?.map((value: any, index: number) => (
//         <SortableItem
//           key={value.id}
//           index={index}
//           value={value}
//           distance={2}
//           pressDelay={100}
//           profile_id={profile_id}
//           sortIndex={value.index}
//         />
//       ))}

//       {totalLeft
//         ? Array(totalLeft)
//             .fill(null)
//             .map((_, index: number) => (
//               <Col span={8} className="mb-1 image" key={index}>
//                 <Button
//                   type="text"
//                   block
//                   className="image-upload-box"
//                   onClick={() => history.push('/profile-image-upload', { profile_id: profile_id })}
//                 >
//                   <PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} />
//                 </Button>
//               </Col>
//             ))
//         : null}
//     </Row>
//   );
// });

// const SortableItem = SortableElement(({ value, profile_id }: any) => {
//   const history = useHistory();
//   return (
//     profile_id && (
//       <Col span={8} className="mb-1 image">
//         <Button type="text" block style={{ padding: 0 }} className="image-upload-image-box">
//           <img
//             src={value.thumb}
//             alt={value.caption}
//             className="image-upload-image-box"
//             onClick={() =>
//               history.push('/profile-image-upload', { profile_id: profile_id, image: value })
//             }
//             loading={value.thumb}
//           />
//         </Button>
//       </Col>
//     )
//   );
// });
