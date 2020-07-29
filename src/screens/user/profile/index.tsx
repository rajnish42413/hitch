import React, { useEffect, useState } from 'react';
import { Button, Col, Layout, List, Row, Typography } from 'antd';
import AppLayout from '../../../layouts/app';
import BottomFooter from '../../home/Footer';
import { HeaderSkelaton } from '../../home/Header';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Link, useHistory } from 'react-router-dom';
import { PlusOutlined, ArrowLeftOutlined, ShareAltOutlined } from '@ant-design/icons';
import { colors } from '@constants/general';

const { Content } = Layout;

const UserProfile = (props: any) => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = React.useState([
    {
      id: 1,
      image: 'https://source.unsplash.com/user/erondu/60x60',
      caption: 'test 1',
      starred: true
    },
    {
      id: 2,
      image: 'https://source.unsplash.com/user/rajnish/60x60',
      caption: 'test 2'
    },
    {
      id: 3,
      image: 'https://source.unsplash.com/user/aman/60x60',
      caption: 'test 3'
    },
    {
      id: 4,
      image: 'https://source.unsplash.com/user/shivam/60x60',
      caption: 'test 4'
    },
    {
      id: 5,
      image: '',
      caption: 'test 5'
    },
    {
      id: 6,
      image: '',
      caption: 'test 6'
    }
  ]);

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setPhotos(arrayMove(photos, oldIndex, newIndex));
  };

  const getData = async () => {
    setLoading(true);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [loading]);

  return (
    <AppLayout>
      <ProfileTopHeader
        rightButton={
          <>
            <ShareAltOutlined /> Share{' '}
          </>
        }
        rightButtonColor="#3498DB"
      />
      <Content>
        <Row gutter={16} style={{ margin: '20px' }}>
          <SortableList items={photos} onSortEnd={onSortEnd} />
          <h3 style={{ color: colors['mutted-color'], fontSize: '0.8em' }}>Drag to Reorder</h3>
          <Col span={24}>
            <Typography className="image-upload-hint">
              <Typography.Paragraph>
                Tap a photo to add a caption and make your profile stand out even more{' '}
              </Typography.Paragraph>
            </Typography>
          </Col>
          <Col span={24}>
            <List
              bordered
              dataSource={listdata}
              renderItem={item => (
                <List.Item>
                  <Link to={item.link}>
                    <Button type="text">{item.name}</Button>
                  </Link>
                </List.Item>
              )}
              className="profile-buttons"
            />
          </Col>
        </Row>
      </Content>
      <BottomFooter />
    </AppLayout>
  );
};
export default UserProfile;

interface IProfileHeaderProps {
  title?: string;
  goToback?: string;
  rightButton?: any;
  rightButtonColor?: string;
}

export const ProfileTopHeader = (props: IProfileHeaderProps) => {
  const history = useHistory();
  const goBack = () => {
    if (props.goToback) {
      history.push(props.goToback);
    }
  };
  return (
    <HeaderSkelaton>
      <Row>
        <Col span={16}>
          <Button type="link" className="user-name-tile" onClick={goBack}>
            {props.goToback && <ArrowLeftOutlined />} <h3>{props.title || 'Profile Settings'}</h3>
          </Button>
        </Col>
        <Col className="right-menu-icon" span={8}>
          {props.rightButton && (
            <Button
              type="link"
              style={{ color: props.rightButtonColor || colors['black-color'] }}
              size="large"
            >
              {props.rightButton}
            </Button>
          )}
        </Col>
      </Row>
    </HeaderSkelaton>
  );
};

const SortableList = SortableContainer(({ items }: any) => {
  return (
    <Row gutter={16} className="mt-1">
      {items.map((value: any, index: number) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </Row>
  );
});

const SortableItem = SortableElement(({ value }: any) => {
  const history = useHistory();
  return (
    <Col span={8} className="mb-1 image">
      {value.image ? (
        <Link to="/upload-image">
          <img
            src={value.image}
            alt={value.image}
            className="image-upload-image-box"
            onLoad={onLoad}
          />
        </Link>
      ) : (
        <Button
          type="text"
          block
          className="image-upload-box"
          onClick={() => history.push('/profile/image/1')}
        >
          <PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} />
        </Button>
      )}
    </Col>
  );
});

const listdata = [
  { name: 'Profile', link: '/user/detail' },
  { name: 'Profile Users ', link: '/user-profile' },
  { name: 'Preference', link: '/preference' },
  { name: 'Account', link: '/account' },
  { name: 'Help', link: '/help' }
];

const onLoad = (event: any) => {
  event.target.classList.add('loaded');
};
