import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import AuthLayout from '../../layouts/auth';
import './media.scss';
import { PlusOutlined } from '@ant-design/icons';
import { colors } from '../../constants/general';
import { RightOutlined } from '@ant-design/icons';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Link, useHistory } from 'react-router-dom';
import CustomStepper from '../../components/CustomStepper';

const { Title, Paragraph } = Typography;

const UserImage = (props: any) => {
  const history = useHistory();
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

  return (
    <AuthLayout>
      <CustomStepper totalSteps={4} active={2} /> <br />
      <div>
        <Typography>
          <Title level={3}>Pair your photos with captions </Title>
          <Paragraph>Drag to reorder </Paragraph>
        </Typography>
      </div>
      <SortableList items={photos} onSortEnd={onSortEnd} />
      <Row gutter={16} className="mt-1">
        <Col span={24}>
          <Typography className="image-upload-hint">
            <Paragraph style={{ color: colors['black-color'] }}>
              Tap a photo to add a caption and make your profile stand out even more{' '}
            </Paragraph>
          </Typography>
          <p className="text-danger">Add photos to activate profile </p>
        </Col>
      </Row>
      <br />
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<RightOutlined />}
        style={{ float: 'right' }}
        htmlType="submit"
        onClick={() => history.push('/user/introduction')}
      />
    </AuthLayout>
  );
};

export default UserImage;

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
          <img src={value.image} alt={value.image} className="image-upload-image-box" />
        </Link>
      ) : (
        <Button
          type="text"
          block
          className="image-upload-box"
          onClick={() => history.push('/upload-image')}
        >
          <PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} />
        </Button>
      )}
    </Col>
  );
});
