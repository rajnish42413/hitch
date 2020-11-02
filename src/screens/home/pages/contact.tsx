import React from 'react';
import { Typography, Divider } from 'antd';
import PageSkeleton from '../pageSkeleton';
const { Title, Paragraph } = Typography;

export default function ContactDetail() {
  return (
    <PageSkeleton
      className="pj-white"
      defaultLoginModal={false}
      defaultSideBar={false}
      pageTitle="Contact Us"
    >
      <div className="container">
        <Typography>
          <Title>Contact Us</Title>
          <Paragraph>
            Got something you want to talk about? Contact us or email us and we promise to get back
            to you as soon as we can.
          </Paragraph>
          <Divider />
          <Title level={4}>HELP / SUPPORT</Title>
          <Paragraph>
            <p>For all things technical and app-related.</p>
            <p>Contact Us or reach us by facsimile at xxxx xxx xxx </p>
          </Paragraph>
          <Divider />

          <Title level={4}> PARTNERSHIPS </Title>
          <Paragraph>
            Interested in partnering with PakkiJodi? <br />
            partners@pakkijodi.com
          </Paragraph>
          <Divider />

          <Title level={4}> PRESS</Title>
          <Paragraph>
            Interested in including PakkiJodi in your next article or blog? <br />
            press@pakkijodi.com
          </Paragraph>
          <Divider />

          <Title level={4}> AD SALES</Title>
          <Paragraph>
            Interested in advertising on PakkiJodi? <br />
            adsales@pakkijodi.com
          </Paragraph>
          <Divider />
          <Title level={4}> SUCCESS STORIES </Title>
          <Paragraph>
            Did you meet the most important person in your life on PakkiJodi? Tell us about it.
            <br />
            PakkiJodiStories@pakkijodi.com
          </Paragraph>
          <Divider />
        </Typography>
      </div>
    </PageSkeleton>
  );
}
