import React from 'react';
import { Button, Card, Collapse, Layout, Modal, Typography } from 'antd';
import AppLayout from '../../layouts/app';
import { CaretRightOutlined } from '@ant-design/icons';
import TopHeader from '../find/Header';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const success = () => {
  Modal.success({
    content: 'Already Subscribe Platinum Plan !',
  });
};

const UserAccount = (props: any) => {
  return (
    <AppLayout>
      <TopHeader backHeadertitle="Account" backTo="/profile" backHeader={true} />
      <Content style={{ padding: '20px' }}>
        <Typography style={{ padding: '20px', marginTop: 0, textAlign: 'center' }}>
          <Typography.Title level={4}>
            <span style={{ color: '#F1C40F' }}>Gold</span> 3 Months
          </Typography.Title>
        </Typography>
        <Card hoverable={false} className="user-detail-card">
          <span className="span w-100">4,850</span>
          <span className="span border-none">Unlimited Messages</span>
          <span className="span border-none">3 Users</span>
          <Button block className="btn-gold-member" onClick={success}>
            Continue{' '}
          </Button>
          <Collapse
            defaultActiveKey={[]}
            className="user-card-collapase"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? -90 : 90} />}
          >
            <Collapse.Panel header=" " key="1">
              <Typography>
                <Title level={4}>Introduction</Title>
                <Paragraph>
                  In the process of internal desktop applications development, many different design
                  specs and implementations would be involved, which might cause designers and
                  developers difficulties and duplication and reduce the efficiency of development.
                </Paragraph>
                <Paragraph>
                  After massive project practice and summaries, Ant Design, a design language for
                  background applications, is refined by Ant UED Team, which aims to
                  <Text strong>
                    uniform the user interface specs for internal background projects, lower the
                    unnecessary cost of design differences and implementation and liberate the
                    resources of design and front-end development
                  </Text>
                  .
                </Paragraph>
              </Typography>
            </Collapse.Panel>
          </Collapse>
        </Card>
        <br /> <br />
        <Typography style={{ padding: '20px', marginTop: 0, textAlign: 'center' }}>
          <Typography.Title level={4}>
            <span style={{ color: '#C4C4C4' }}>Platinum</span> 3 Months
          </Typography.Title>
        </Typography>
        <Card hoverable={false} className="user-detail-card">
          <span className="span w-100">5,950</span>
          <span className="span border-none">Unlimited Messages</span>
          <span className="span border-none">7 Users</span>
          <Button block className="btn-gold-member" disabled>
            Continue{' '}
          </Button>
          <Collapse
            defaultActiveKey={[]}
            className="user-card-collapase"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? -90 : 90} />}
          >
            <Collapse.Panel header=" " key="1">
              <Typography>
                <Title level={4}>Introduction</Title>
                <Paragraph>
                  In the process of internal desktop applications development, many different design
                  specs and implementations would be involved, which might cause designers and
                  developers difficulties and duplication and reduce the efficiency of development.
                </Paragraph>
                <Paragraph>
                  After massive project practice and summaries, Ant Design, a design language for
                  background applications, is refined by Ant UED Team, which aims to
                  <Text strong>
                    uniform the user interface specs for internal background projects, lower the
                    unnecessary cost of design differences and implementation and liberate the
                    resources of design and front-end development
                  </Text>
                  .
                </Paragraph>
              </Typography>
            </Collapse.Panel>
          </Collapse>
        </Card>
      </Content>
    </AppLayout>
  );
};
export default UserAccount;
