import React from 'react';
import { Typography, Divider, Collapse } from 'antd';
import PageSkeleton from '../pageSkeleton';
import { CaretRightOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export default function FaqHome() {
  const title = 'FAQ';
  return (
    <PageSkeleton
      className="pj-white"
      defaultLoginModal={false}
      defaultSideBar={false}
      pageTitle={title}
    >
      <div className="container">
        <Typography>
          <Title>FAQ</Title>
          <Title level={3}>OUR COMMITMENT TO YOU</Title>
          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
          >
            <Panel header="What is PakkiJodi.com?" key="1">
              <Paragraph>
                PakkiJodi.com is India’s first AI powered matchmaking app & website. Based on
                six-dimensional personality analysis & couples’ relationships data, PakkiJodi
                predicts a compatible match for modern Indian professionals. When two beautiful
                souls with common interests, beliefs, personalities & values come together, we
                believe it is a ‘Match Made in AI Heaven’.
              </Paragraph>
            </Panel>
            <Panel header="How is PakkiJodi different from other platforms?" key="2">
              <Paragraph>
                PakkiJodi can be termed as a modern matrimony app. It serves to its premium pool of
                age group; 25-35 years, who are looking for a serious relationship with an intent to
                get married within a year or two. Unlike traditional matchmaking & matrimony sites,
                PakkiJodi.com provides hassle free experience & AI compatible matches with these two
                unique features: Premium network of professionals: Get connected with professionals
                working at top notch companies like Google, Amazon, Adobe, Accenture etc. and
                send/accept their request based on your compatibility score with them to end your
                exhaustive search of finding a life partner. True Compatibility Scores: We calculate
                your compatibility score based on six personality traits - emotional, social,
                intellectual, relationship, physical and moral values. You are matched with people
                with similar personality and like-mindedness to have quality conversations and
                eventually settle down.
              </Paragraph>
            </Panel>
            <Panel header="How does PakkiJodi calculate compatibility?" key="3">
              <Paragraph>
                Our AI has developed six-dimensional compatibility analysis for PakkiJodi which
                addresses the basic lifestyle and preferences of an individual. While creating a
                profile, personality traits are captured through a series of questions curated by
                the professors of Cambridge. The questionnaire brings out the personality traits
                like kindness, dominance, social, quarrelsome etc. and is attentively designed and
                positioned in a way to improve the user experience. PakkiJodi AI engine is focussed
                on six personality dimensions: relationships, social, intellectual, emotional,
                values and physical level. A person is matched based on their individual
                compatibility score (87% on emotional, 91% on intellectual, 73% on values etc.) as
                well as overall compatibility score (88% total compatibility). As users interact
                with the matches and the compatibility percentage gets more attuned to the user’s
                preferences, it provides more personalized matches over time.
              </Paragraph>
            </Panel>
            <Panel header="How do I create a profile on PakkiJodi?" key="4">
              <Paragraph>Step 1: Sign Up through Facebook</Paragraph>
              <Paragraph>Step 2: Answer quick personality questions</Paragraph>
              <Paragraph>Step 3: Fill in your details like Name, Education, City etc.</Paragraph>
              <Paragraph>Step 4: Upload your pictures following these guidelines</Paragraph>
              <Paragraph>Step 5: State your partner preferences</Paragraph>
              <Paragraph>
                Step 6: View your instant 25 matches and check your compatibility score
              </Paragraph>
              <Paragraph>
                Step 7: Send connection requests to the profiles you like and let’s get started!
              </Paragraph>
            </Panel>
            <Panel header="Can I use PakkiJodi for free?" key="5">
              <Paragraph>
                PakkiJodi.com app and website are free to use. Once you register, you get upto 25
                instant AI curated matches & up to 10 compatible matches daily. You can also send 10
                free requests to the profiles you wish to connect. So, hop onto the journey of
                finding “the one”.
              </Paragraph>
            </Panel>
            <Panel header="What is PakkiJodi Premium?" key="6">
              <Paragraph>
                <p>
                  PakkiJodi Premium upgrade helps you find your compatible one with added benefits
                  like:
                </p>
                <ol>
                  <li>
                    <strong>Unlimited connection requests</strong> <br />
                    Increase your chances 5 times more of making connections
                  </li>
                  <li>
                    <strong>Profile boost</strong> <br />
                    Jump the queue to get noticed &amp; connect with 10 times more matches
                  </li>
                  <li>
                    <strong>Crown badge</strong> <br />
                    Stand out to your matches &amp; get more connections
                  </li>
                  <li>
                    <strong>Pro-tips from our experts</strong> <br />
                    Get guidance on profile improvement from our inhouse team
                  </li>
                </ol>
                <p>
                  You can upgrade to premium at just INR 1249/- for 30 days and enjoy the above
                  mentioned benefits.
                </p>
                <p>
                  You can even claim premium benefits for free by inviting your female friends to
                  sign up on PakkiJodi. For every female friend registered with a verified profile,
                  receive 1 week free subscription to PakkiJodi Premium
                </p>
              </Paragraph>
            </Panel>
          </Collapse>
          <Divider />
        </Typography>
      </div>
    </PageSkeleton>
  );
}
