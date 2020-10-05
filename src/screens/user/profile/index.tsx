import React, { Dispatch, useState } from 'react';
import { Button, Layout, List, Modal, Typography, message } from 'antd';
import TopHeader from '../../find/Header';
//import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Link, useHistory } from 'react-router-dom';
import Icon, { ExclamationCircleOutlined } from '@ant-design/icons';
import { FB_APP_ID } from '@constants/general';
import {
  FacebookMessengerShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from 'react-share';
import Loader from '../../../components/loader/Loader';
import * as authToken from '@utils/userAuth';
import CopyToClipboard from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import '../../media/media.scss';
import { renderUserStatus } from '../../../screens/find/Find';
import { IAction, SetUser } from '@redux/actions';
import { IUser } from '../../../schemas/IUser';
import Axios from 'axios';
import { convertToSlug } from '@utils/helpers';
import AppLayout from '../../../layouts/app';
import { ReactComponent as AddSvg } from '../../../assets/icons/add.svg';
import { ReactComponent as HelpSvg } from '../../../assets/icons/help.svg';
import { ReactComponent as SettingSvg } from '../../../assets/icons/setting.svg';
import { ReactComponent as OutSvg } from '../../../assets/icons/logout.svg';
const { Content } = Layout;

const UserProfile = (props: any) => {
  const [webShare, setWebShare] = useState(false);
  const { user } = props;
  const photos = user?.profile?.media;
  const profile_id = user && (user.profile.id ? user.profile.id : user?.id);

  const url =
    profile_id && user.profile
      ? `https://www.pakkijodi.com/profiles/${profile_id}?name=${convertToSlug(
          user?.profile?.name
        )}`
      : '';

  const share_text = user.profile ? `Want to know about ${user?.profile?.name} on PAKKIJODI.` : '';

  // const [loading, setLoading] = useState(false);

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

  // const handleShare = async () => {
  //   setLoading(true);
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: share_text,
  //         text: share_text,
  //         url: url,
  //       })
  //       .then(() => {
  //         setLoading(false);
  //         console.log('Thanks for sharing!');
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         console.log(`Couldn't share because of`, err.message);
  //       });
  //   } else {
  //     setWebShare(true);
  //     setLoading(false);
  //   }
  // };

  return (
    <AppLayout>
      <TopHeader />
      {user ? (
        <Content>
          {renderUserStatus(user.status, props.setUser)}
          <div style={{ padding: '1rem' }}>
            <div className="user-profile-box flex-row">
              <img src={photos[0]?.small} alt={user.name} height="80px" width="80px" />
              <Typography>
                <Typography.Title level={4}>{user.name}</Typography.Title>
                <p>{user?.profile?.detail?.city}</p>
              </Typography>
            </div>
            <Link to="/user/detail">
              <Button block type="text" className="btn-red">
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
              <Button type="text" block onClick={handleLogout}>
                <Icon component={OutSvg} style={{ fontSize: '2rem' }} /> Logout
              </Button>
            </List.Item>
          </List>

          <Modal
            title="Share"
            visible={webShare}
            onCancel={() => setWebShare(false)}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: true }}
            footer={null}
          >
            <CopyToClipboard text={url} onCopy={() => message.success('copied')}>
              <Button block type="dashed" className="mb-1">
                Copy Link
              </Button>
            </CopyToClipboard>

            <WhatsappShareButton
              url={url}
              title={share_text}
              separator=":: "
              className="mb-1 btn-block"
            >
              Share on Whatsapp
            </WhatsappShareButton>

            <FacebookMessengerShareButton url={url} appId={FB_APP_ID} className="mb-1 btn-block">
              {' '}
              Share on FacebookMessenger
            </FacebookMessengerShareButton>
            <FacebookShareButton quote={`${share_text}`} className="mb-1 btn-block" url={url}>
              Share on Facebook
            </FacebookShareButton>
          </Modal>
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
