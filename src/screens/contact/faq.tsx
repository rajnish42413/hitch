import React from 'react';
import { Layout, Typography } from 'antd';
import AppLayout from '../../layouts/app';
import BottomFooter from '../home/Footer';
import { ProfileTopHeader } from '../user/profile/index';

const { Content } = Layout;

export default function FAQ() {
  const data = [
    {
      question: 'Do I get anything FREE?',
      answer: 'You get lots of FREE services when you register .'
    },
    {
      question: 'How much do I have to pay to register on this Matrimonial app',
      answer:
        'Absolutely nothing! Registration on this Matrimonial app is always FREE!!! Register Now with Shaadi.com and post your matrimonial profile.'
    },
    {
      question: 'How long does it take to register and create a matrimonial profile?',
      answer:
        'Registration and profile creation  can be completed in less than 5 minutes. In three easy steps you can register  and post your matrimonial profile on our website.'
    },
    {
      question: 'The form seems to be a bit lengthy. Do I need to fill it entirely?',
      answer:
        'We understand that it may become tedious for you to fill in a long form in one single shot. However, matrimony is serious business making it important to convey detailed information to interested members. The more information you provide about yourself the more likely you are to be contacted by other members . So please do take the time and effort to complete your profile.'
    }
  ];
  return (
    <AppLayout>
      <ProfileTopHeader title="Help" goToback="/profile" />
      <Content style={{ padding: '20px' }}>
        {data.map((item: any, i: number) => (
          <Typography>
            <Typography.Title level={4}>
              {i + 1 + '. '}
              {item.question}
            </Typography.Title>
            <Typography.Paragraph style={{ paddingLeft: '20px' }}>
              {item.answer}
            </Typography.Paragraph>
          </Typography>
        ))}
      </Content>
      <BottomFooter />
    </AppLayout>
  );
}
