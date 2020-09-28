import React from 'react';
import { Typography, Divider } from 'antd';
import PageSkeleton from '../pageSkeleton';

const { Title, Paragraph } = Typography;

export default function Privacy() {
  return (
    <PageSkeleton className="pj-white" defaultLoginModal={false} defaultSideBar={false}>
      <div className="container">
        <Typography>
          <Title>Privacy Policy</Title>
          <Title level={3}>OUR COMMITMENT TO YOU</Title>
          <Paragraph>
            At PakkiJodi, your privacy is our top priority. It is the core of the way we build the
            product you love, so that you can fully trust us and render your focus on building
            meaningful connections in search of your life partner.
          </Paragraph>
          <Paragraph>
            We appreciate the trust you have put in us when you provide us with your personal
            information and we surely do not take that for granted.
          </Paragraph>
          <Paragraph>
            We promise not to compromise with your privacy.​ We have designed our product keeping
            your privacy in mind. With the amalgamation of various experts in the fields of legal,
            security, engineering, and product design, we make sure that no decision related to your
            privacy is taken without your consent.
          </Paragraph>
          <Paragraph>
            We strive to be transparent while processing your data.​ We understand that insufficient
            information and overly complicated language are common issues in companies’ privacy
            policies. So, as a result, we have taken a different approach: we have formulated our
            Privacy Policy and other documentation in much simpler language; just to give you a
            better and a clear picture of our practices.
          </Paragraph>
          <Paragraph>
            We make sure your personal information is secure.​ We have allotted different teams to
            keep your data safe and secure. We constantly update our security to enhance the safety
            of your personal information. So, be assured, your data is in safe hands!
          </Paragraph>
          <Paragraph>
            We do not recommend to share your contact number or bank account details unless you wish
            to do so.
          </Paragraph>
          <Title level={3}>INFORMATION WE COLLECT</Title>
          <Paragraph>
            It goes without saying, we can’t accelerate meaningful connections without some personal
            information about you, such as basic profile details and the types of people you’d like
            to meet (partner preferences). We also collect generated information as you use our
            services, like access logs, as well as information from third parties; when you access
            our services through a social media account. If you want to learn more, refer to the
            more detailed explanation mentioned below.
          </Paragraph>
          <Paragraph>
            <i>Information you give us</i>
          </Paragraph>
          <Paragraph>
            You choose to give us certain information while using our services. This includes:
          </Paragraph>
          <ul>
            <li>
              <Paragraph>
                Once you Sign Up and create an account, you provide us with your login credentials,
                as well as some basic details necessary for the product to work, like your gender
                and date of birth. We do not share anything on social media on your behalf.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                When you complete your profile, you can share additional information, such as
                details on your personality, lifestyle, interests, and other details, as well as
                photos with us. To add a photo, you may allow us to access your camera or photo
                album too. Some of the information you provide us may be “sensitive” in certain
                jurisdictions, like your racial or ethnic origins, sexual orientation, and religious
                beliefs. By choosing to provide this information, you consent to share the data for
                our processing purposes.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                When you authenticate your phone number, it is used for verification purposes &amp;
                our customer success team to contact you in case it requires. Your contact number is
                safe with us and will not be shared with any other user.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                When you subscribe to a paid service or make a purchase directly from us (on
                platforms such as iOS or Android), you consent to provide us or our payment service
                provider with your account details, such as your debit or credit card number or
                other financial data.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                When you participate in survey(s) or other contest(s), you consent to your willing
                participation and responses to our questions and testimonials. We collect the
                information you use to register or enter the contest(s).
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                If you contact our customer care team for any query, we collect the information you
                provide during the session. Sometimes, we monitor or record these interactions for
                training purposes to ensure quality service.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                If you ask us to communicate with/to other people (for example, if you instruct us
                to send an email on your behalf to one of your friends), we collect the information
                related to those people in order to complete your request.
              </Paragraph>
            </li>
            <li>
              <Paragraph>
                Also, we process your chats with other users as well as the content you publish at
                our app, as part of the operation of the services. Your chats are absolutely secured
                and no data is shared.
              </Paragraph>
            </li>
          </ul>
          <Divider />
        </Typography>
      </div>
    </PageSkeleton>
  );
}
