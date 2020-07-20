import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import AuthLayout from '../../layouts/auth';
import './media.scss';
import { PlusOutlined } from '@ant-design/icons';
import { colors } from '../../constants/general';
import { RightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const UserImage = (props: any) => {
  const history = useHistory();
  const redirect = () => {
    history.push('/upload-image');
  };
  return (
    <AuthLayout>
      <div>
        <Typography>
          <Title level={3}>Pair your photos with captions </Title>
          <Paragraph>Drag to reorder </Paragraph>
        </Typography>
      </div>
      <Row gutter={16} className="mt-1">
        {[1, 2, 3, 4, 5, 6].map((i: number) => (
          <Col span={8} className="mb-1">
            <Button type="text" block className="image-upload-box" onClick={redirect}>
              <PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} />
            </Button>
          </Col>
        ))}

        <Col span={24}>
          <Typography className="image-upload-hint">
            <Paragraph>
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
      />
    </AuthLayout>
  );
};

export default UserImage;
