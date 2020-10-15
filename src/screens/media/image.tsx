import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import AuthLayout from '../../layouts/auth';
import { PlusOutlined } from '@ant-design/icons';
import { colors } from '../../constants/general';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { useHistory, useLocation } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import './media.scss';
import { IUser } from '../../schemas/IUser';
import Axios from 'axios';
import AuthFooter from '../../layouts/auth/footer';

const { Title, Paragraph } = Typography;

const UserImage = (props: any) => {
  const history = useHistory();
  const [user, setUser] = useState({} as IUser);
  const [photos, setPhotos] = useState(user?.profile?.media);
  const { state } = useLocation();
  const hideBottomButton = state?.hideBottomButton || false;

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setPhotos(arrayMove(photos ? photos : [], oldIndex, newIndex));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await Axios(`user`);
      setUser(data);
    };
    fetchUser();
  }, []);

  return (
    <AuthLayout header={true}>
      {user ? (
        <>
          <Typography>
            <Title level={4}>Pair your photos with captions </Title>
            <Paragraph>Drag to reorder </Paragraph>
          </Typography>
          <SortableList images={user?.profile?.media} onSortEnd={onSortEnd} user={user} />
          <Row gutter={16}>
            <Col span={24}>
              <Typography className="image-upload-hint">
                <Paragraph>
                  Tap a photo to add a caption and make your profile stand out even more{' '}
                </Paragraph>
              </Typography>
              <p className="text-danger" style={{ marginBottom: '4rem' }}>
                Add photos to activate profile{' '}
              </p>
            </Col>
          </Row>

          {!hideBottomButton && (
            <AuthFooter>
              <Button
                block
                onClick={() =>
                  history.push('/user/introduction', { profile_id: user?.profile?.id })
                }
                className="btn-dark"
              >
                Good to go!
              </Button>
            </AuthFooter>
          )}
        </>
      ) : (
        <Loader />
      )}
    </AuthLayout>
  );
};

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};
export default connect(mapStateToProps)(UserImage);

const SortableList = SortableContainer((props: any) => {
  const images = props.images;
  const { profile } = props.user;
  const totalLeft: number = 6 - +(props.images ? props.images?.length : 0);
  const history = useHistory();
  return (
    <Row gutter={16} className="mt-1">
      {images?.map((value: any, index: number) => (
        <SortableItem key={`item-${index}`} index={index} value={value} user={props.user} />
      ))}

      {totalLeft
        ? Array(totalLeft)
            .fill(null)
            .map((_, index: number) => (
              <Col span={8} className="mb-1 image" key={index}>
                <Button
                  type="text"
                  block
                  className="image-upload-box"
                  onClick={() =>
                    history.push('/upload-image', {
                      image: null,
                      profile_id: profile ? profile.id : props.user.id,
                    })
                  }
                >
                  <PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} />
                </Button>
              </Col>
            ))
        : null}
    </Row>
  );
});

const SortableItem = SortableElement(({ value, user }: any) => {
  const history = useHistory();
  const { profile } = user;
  return (
    user &&
    value && (
      <Col span={8} className="mb-1 image">
        <Button type="text" block style={{ padding: 0 }} className="image-upload-image-box">
          <img
            src={value.thumb}
            alt={value.caption}
            className="image-upload-image-box"
            onClick={() =>
              history.push('/upload-image', {
                profile_id: profile ? profile.id : user.id,
                image: value,
              })
            }
            loading={value.thumb}
          />
        </Button>
      </Col>
    )
  );
});
