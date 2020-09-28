import React from 'react';
import { Row, Col, Button, Layout } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

interface IProps {
  title?: string;
  goBack?: true | false;
}

export default function AuthHeader(props: IProps) {
  const history = useHistory();
  const { goBack } = props;

  const handleBackBtn = () => {
    history.go(-1);
  };

  return (
    <HeaderSkelaton>
      <Row>
        <Col span={16}>
          {goBack && (
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              size="middle"
              onClick={handleBackBtn}
            />
          )}
        </Col>
      </Row>
    </HeaderSkelaton>
  );
}

export const HeaderSkelaton = (props: any) => {
  return (
    <Layout.Header className="home-header">
      <div className="main">{props.children}</div>
    </Layout.Header>
  );
};
