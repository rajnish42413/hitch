import React, { useEffect } from 'react';
import { Button, Card, Collapse, Layout, Typography } from 'antd';
import AppLayout from '../../layouts/app';
import { CaretRightOutlined } from '@ant-design/icons';
import TopHeader from '../find/Header';
import { IAppState } from '@redux/reducers';
import { connect } from 'react-redux';
import Price from '../../components/Price';

const { Content } = Layout;

// const success = () => {
//   Modal.success({
//     content: 'Already Subscribe Platinum Plan !',
//   });
// };

const UserAccount = (props: any) => {
  const { user } = props;

  const handlePayment = (amount: number, plan: string) => {
    let options = {
      key: 'rzp_test_74vbGHcjiyPSZF',
      key_secret: '1Nl1t3O3BXmmRBTgKfzm8uyR',
      amount: +amount * 100, // 2000 paise = INR 20, amount in paisa
      name: 'PAKKIJODI',
      description: `Purchase PakkiJodi ${plan} Memebership plan`,
      handler: function (response: any) {
        console.log(response);
        alert(response.razorpay_payment_id);
      },
      prefill: {
        name: user.name,
        email: user?.email,
        contact: user.countryCode + user?.phone,
      },
      notes: {
        address: 'Hello World',
      },
    };

    let rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <AppLayout appendPageTitle="Account">
      <TopHeader backHeadertitle="Account" backTo="/profile" backHeader={true} />
      <Content style={{ padding: '20px' }}>
        <Typography style={{ padding: '20px', marginTop: 0, textAlign: 'center' }}>
          <Typography.Title level={4}>
            <span style={{ color: '#F1C40F' }}>Gold</span> 3 Months
          </Typography.Title>
        </Typography>
        <Card hoverable={false} className="user-detail-card">
          <span className="span w-100">
            <Price amount={2425} withoutDiscount={4850} />
          </span>
          <span className="span border-none">Unlimited Messages</span>
          <span className="span border-none">3 Users</span>
          <Button block className="btn-gold-member" onClick={() => handlePayment(2425, 'Gold')}>
            Continue{' '}
          </Button>
          <Collapse
            defaultActiveKey={[]}
            className="user-card-collapase"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? -90 : 90} />}
          >
            {/* <Collapse.Panel header=" " key="1">
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
            </Collapse.Panel> */}
          </Collapse>
        </Card>
        <br /> <br />
        <Typography style={{ padding: '20px', marginTop: 0, textAlign: 'center' }}>
          <Typography.Title level={4}>
            <span style={{ color: '#F1C40F' }}>Platinum</span> 3 Months
          </Typography.Title>
        </Typography>
        <Card hoverable={false} className="user-detail-card">
          <span className="span w-100">
            <Price amount={2975} withoutDiscount={5950} />
          </span>
          <span className="span border-none">Unlimited Messages</span>
          <span className="span border-none">7 Users</span>
          <Button block className="btn-gold-member" onClick={() => handlePayment(2975, 'Platinum')}>
            Continue
          </Button>
          <Collapse
            defaultActiveKey={[]}
            className="user-card-collapase"
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? -90 : 90} />}
          >
            {/* <Collapse.Panel header=" " key="1">
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
            </Collapse.Panel> */}
          </Collapse>
        </Card>
      </Content>
    </AppLayout>
  );
};
const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps)(UserAccount);
