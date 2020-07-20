import React from 'react';
import { Row, Col, Typography, Button, PageHeader } from 'antd';
import AuthLayout from '../../layouts/auth';
import './media.scss';
import { RightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const { Title, Paragraph } = Typography;

const MediaUpload = (props: any) => {
  const history = useHistory();
  return (
    <AuthLayout>
      <PageHeader
        onBack={() => history.push('/user/images')}
        title="Add Photo"
        style={{ padding: 0 }}
      />
      <Row gutter={16} className="mt-1">
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

export default MediaUpload;
