import React from 'react';
import { Typography } from 'antd';
import PageSkeleton from '../pageSkeleton';
import { Link } from 'react-router-dom';
const { Title, Paragraph } = Typography;

export default function Terms() {
  return (
    <PageSkeleton className="pj-white" defaultLoginModal={false} defaultSideBar={false}>
      <div className="container">
        <Typography>
          <Title>Terms & Conditions</Title>
          <Paragraph>
            Welcome to PakkiJodi's Terms and Conditions ("Terms"). This is a contract between you
            and PakkiJodi.com (parent company “Infinite forest, Inc.”) and we want you to know your
            rights before you use the PakkiJodi application ("App"). Please take a few moments to
            read and understand these Terms before enjoying the App, as once you access, view or use
            the App on desktop or smartphone, you will be legally bound by these Terms. You can also
            refer to our “Privacy Policy” to clear all your doubts.
          </Paragraph>

          <Title level={3}>PakkiJodi RULES</Title>
          <Paragraph>
            <ol>
              <li>
                <Title level={3}>PakkiJodi RULES</Title>
                <Paragraph>
                  Before using our App, you will need to register with us with an account
                  ("Account"). In order to create a verified account, you must be:
                </Paragraph>
                <ol>
                  <li>At Least 18 years old; and</li>
                  <li>Legally permitted to use the App by the laws of your home country.</li>
                  <li>You should have a Facebook account to activate the PakkiJodi’s account.</li>
                  <li>You should be a working individual.</li>
                </ol>
                <Paragraph>
                  When you create an Account using your Facebook login details, you authorize us to
                  access, display and use specific information(s) from your Facebook account (e.g.
                  profile picture, relationship status and location). For more information about the
                  data we use and how we use it, please check our{' '}
                  <a href="/privacy-policy">Privacy Policy​</a>​.
                </Paragraph>
                <Paragraph>Deleting your account:</Paragraph>
                <Paragraph>
                  You'll have great connections on PakkiJodi, but if you ever feel the need to
                  leave, you can delete your Account at any time by going to the 'Profile' tab when
                  you are logged in and clicking on the 'Privacy option&gt; deactivate/close my
                  account’. Your Account will be deleted immediately and all of your account
                  information will be immediately removed from the App. If you wish to login to your
                  account again, you will be required to create a fresh account. If you wish to
                  deactivate your account for a break, you can click on “deactivate link in privacy
                  option”. Infinite forest, Inc. reserve the right at our sole discretion to suspend
                  any Account, or make use of any operational, technological, legal or other means
                  available to enforce the Terms (including without limitation blocking specific IP
                  addresses), at any time without liability and without the need to give the user
                  prior notice.
                </Paragraph>
                <Paragraph>
                  Certain portions of the App may not be accessible if you have not registered for a
                  free Account but can unlock the features if you upgrade to premium.
                </Paragraph>
                <Paragraph>
                  We do not recommend to share your contact number or bank account details unless
                  you wish to do so.
                </Paragraph>
              </li>
              <li>
                <Title level={3}>TYPES OF CONTENT</Title>
                <Paragraph>
                  There are three types of content that you will be able to access on the App:
                </Paragraph>
                <ol>
                  <li>content that you upload and provide ("Your Content");</li>
                  <li>content that other members provide ("Member Content"); and</li>
                  <li>content that we provide ("PakkiJodi’s Content").</li>
                </ol>
                <Paragraph>
                  There is a certain kind of content we can't allow on PakkiJodi:
                </Paragraph>
                <Paragraph>
                  We want our users to be able to express themselves as elaborately as possible and
                  post all sorts of things on PakkiJodi, but we have to impose restrictions on
                  certain content due to our policy. Content such as:
                </Paragraph>
                <ul>
                  <li>
                    contains language or imagery which could be deemed offensive or is likely to
                    harass, upset, embarrass, alarm or annoy any other person;
                  </li>
                  <li>
                    is obscene, sexy, pornographic, violent or otherwise could offend human dignity;
                  </li>
                  <li>
                    is abusive, insulting or threatening, discriminatory or which promotes or
                    encourages racism, sexism, hatred or bigotry;
                  </li>
                  <li>
                    encourages any illegal including, without limitation, terrorism, inciting racial
                    hatred or the submission of which in itself constitutes committing a criminal
                    offence;
                  </li>
                  <li>is defamatory or libellous;</li>
                  <li>
                    relates to industrial activities (including,, sales, competitions and
                    advertising, links to different websites or premium line phone numbers);
                  </li>
                  <li>involves the transmission of "junk" mail or "spam";</li>
                  <li>
                    contains any spy ware, adware, viruses, corrupt files, worm programmes or
                    different malicious code designed to interrupt, harm or limit the practicality
                    of or disrupt any computer code, hardware, telecommunications, networks, servers
                    or different instrumentation, computer virus or other material designed to
                    wreck, interfere with, wrongly intercept or deprive any information or personal
                    data whether or not from PakkiJodi or otherwise;
                  </li>
                  <li>
                    itself, or the posting of that, infringes any third party's rights (including,
                    while not limited to, material possession rights and privacy rights);
                  </li>
                  <li>shows another person irregardless that person’s consent.</li>
                </ul>
                <Title level={3}>Your Content</Title>
                <Paragraph>
                  As Your Content is unique, you are accountable and liable for Your Content and
                  will indemnify, defend, and hold us harmless from any claims made in association
                  with Your Content.
                </Paragraph>
                <Paragraph>
                  You should follow the secure rules while displaying your information online. For
                  instance, you should not display any personal contact or banking information on
                  your profile page may it be yours or of someone in relation to you or any other
                  person (for example, names, home addresses or postcodes, telephone numbers, email
                  addresses, URLs, credit/debit card or other banking details). If you do choose to
                  reveal any personal information about yourself, via email or otherwise, it is at
                  your own risk.
                </Paragraph>
                <Paragraph>
                  As PakkiJodi is a public community, Your Content will be visible to other users of
                  the App around the nation - so make sure you are comfortable sharing Your Content
                  before you post it. As such, you agree that Your Content may be viewed by other
                  users and any profile viewers, if you participate in any contest by PakkiJodi. By
                  uploading Your Content on PakkiJodi, you warrant to us that you have all necessary
                  rights to do so, and automatically grant us a non-exclusive, royalty free,
                  perpetual, nation-wide licence to use Your Content in any way.
                </Paragraph>
                <Paragraph>
                  We have the right to remove, edit, limit or block access to any of Your Content at
                  any time, and we have no obligation to display or review Your Content.
                </Paragraph>
                <Title level={3}>Member Content</Title>
                <Paragraph>
                  Other members of PakkiJodi will also share content by uploading it through the
                  App. Member Content belongs to the user(s) who posted the content on the app and
                  his/her content is visible to the other members.
                </Paragraph>
                <Paragraph>
                  You do not have any rights to other users' Member Content, and you may only use
                  other PakkiJodi users' personal information to the extent that your use of it
                  matches PakkiJodi's purpose of allowing people to meet one another. You may not
                  use different users' data for industrial functions, to spam, to harass, or to make
                  unlawful threats. We reserve the right to terminate your Account if you misuse
                  other users' information.
                </Paragraph>
                <Paragraph>
                  Member Content is subject to the terms and conditions of Sections 512(c) and/or
                  512(d) of the Digital Millennium Copyright Act 1998.
                </Paragraph>
                <Title level={3}>PakkiJodi’s Content</Title>
                <Paragraph>
                  Any other text, content, graphics, user interfaces, trademarks, logos, sounds,
                  artwork, and other intellectual property appearing on PakkiJodi are owned,
                  controlled or licensed by us and are protected by copyright, and other
                  intellectual property law rights. All rights, titles and interests to Our Content
                  remains with us at all times.
                </Paragraph>
                <Paragraph>
                  Content, without the right to sublicense, under the following conditions:
                </Paragraph>
                <ol>
                  <li>
                    you shall not use, sell, modify Our Content except as permitted by the
                    functionality of the App;
                  </li>
                  <li>you shall not use our name in metatags, keywords and/or hidden text;</li>
                  <li>
                    you shall not create derivative works from Our Content or commercially exploit
                    Our Content, in whole or in part, in any way; and
                  </li>
                  <li>you shall use Our Content for lawful purposes solely.</li>
                </ol>
                <Paragraph>We reserve all other rights.</Paragraph>
              </li>
              <li>
                <Title level={3}>RESTRICTIONS ON THE APP</Title>
                <Paragraph>Do’s (You should agree with):</Paragraph>
                <ul>
                  <li>
                    comply with all applicable laws, including without limitation, privacy laws,
                    intellectual property laws, anti-spam laws, equal opportunity laws and
                    regulatory requirements;
                  </li>
                  <li>use your real name on your profile;</li>
                </ul>
                <Paragraph>Don'ts (You agree that you will not):</Paragraph>
                <ul>
                  <li>
                    act in an unlawful manner including being dishonest, abusive or discriminatory;
                  </li>
                  <li>
                    misrepresent your identity, your current or previous positions, salary,
                    qualifications or affiliations with a person or entity;
                  </li>
                  <li>disclose information that you do not have the consent to disclose;</li>
                  <li>create a pyramid scheme, fraud or other similar practice.</li>
                </ul>
                <Paragraph>
                  We don't like users misbehaving in the PakkiJodi community. Therefore, you can
                  report any abuse or complain about Member Content by contacting us, outlining the
                  abuse or complaint. You can also report a user directly from a profile or in chat
                  by clicking the 'Block &amp; Report' option.
                </Paragraph>
                <Paragraph>
                  Also, we don't appreciate users doing foul things to PakkiJodi as well - our team
                  have worked really hard on the creation, so scraping or replicating any part of
                  the App without our prior consent is prohibited. This includes by any means that
                  (automated or otherwise) aside from our presently offered, published interfaces -
                  unless you are specifically allowed to try it in a separate agreement with us.
                </Paragraph>
              </li>
              <li>
                <Title level={3}>PRIVACY</Title>
                <Paragraph>
                  For information about how PakkiJodi collects, uses, and shares your personal data,
                  please check out our ​<Link to="/privacy">Privacy Policy​</Link> – this is some
                  important stuff. By using PakkiJodi, you agree that we can use such data in
                  accordance with our privacy policy.
                </Paragraph>
              </li>
              <li>
                <Title level={3}>THIRD PARTY STORES; PREMIUM SERVICES; IN-APP PURCHASES</Title>
                <Paragraph>
                  The App may be linked with third-party owned and/or operated platforms and
                  services, e.g., Apple (iTunes, etc.), Google, Facebook, Twitter, etc. (each, a
                  “Third Party Platform”) and may require you to login such Third Party Platforms
                  and provide certain account credentials and other information in order to access
                  the App. By using the App, you agree to comply with any applicable terms or
                  conditions promulgated by any provider of a Third Party Platform (e.g., Facebook’s
                  Terms of Use, iTunes Store Terms of Use, etc.) We may make certain products and
                  services available to users of the App in consideration of a subscription fee or
                  other fees (“Premium Services”), including the ability to purchase products,
                  services and extra features, such as the ability to extend your matches. If you
                  choose to use Premium Services or make In-App purchases, you agree that additional
                  terms may apply to your use and purchase of such Premium Services and In-App
                  products, and such further terms are incorporated herein by reference.
                </Paragraph>
                <Paragraph>
                  You may purchase Premium Services and In-App product through the subsequent
                  payment strategies ( “Premium Payment Method”): (a) creating a sale through the
                  Apple App Store ®, Google Play or other mobile or web application platforms or
                  storefronts authorized by us (each, a “Third Party Store”), (b) paying with your
                  credit card, debit card, or PayTm account, which will be processed by a third
                  party processor. Once you've requested a Premium Service or In-App Product, you
                  authorize us to charge your chosen Premium Payment Method and your payment is
                  non-refundable. If payment isn't received by us from your chosen Premium Payment
                  methodology, you agree to promptly pay all amounts due upon demand by us.
                </Paragraph>
                <Paragraph>
                  If you want to cancel or change your Premium Payment Method at any time, you can
                  do so via the payment settings option under your profile. Your subscription to
                  PakkiJodi Premium Services will automatically renew until you decide to cancel in
                  accordance with such terms. In the event of a conflict between a 3rd Party Store’s
                  terms and conditions and these Terms, the terms and conditions of the Third Party
                  Store or service supplier shall govern and control. We aren't accountable and
                  don't have any liability whatsoever for product or services you acquire through
                  the Third Party Store. If you choose to make an In-App Purchase, you will be
                  prompted to enter details for your account with the Third Party Store you are
                  using (e.g., Android, Apple, etc.) (“your Mobile Platform Account”), and your
                  Mobile Platform Account will be charged for the Premium Service or In-App Product
                  in accordance with the terms disclosed at the time of purchase, as well because
                  the general terms applicable to any or all alternative in-app purchases through
                  your Mobile Platform Account (e.g., Android, Apple, etc.). Premium Services and
                  In-App Products may include one-time purchases as well as monthly subscriptions
                  (e.g., a one-month subscription, three-month subscription, six-month subscription,
                  etc.) to additional account features. At the end of the free trial period (if
                  any), you will be charged the price for the subscription and will continue to be
                  charged until you cancel your subscription.
                </Paragraph>
                <Paragraph>
                  Please note that for Premium Services and In-App product created on a subscription
                  basis, your subscription will automatically renew for the same subscription period
                  as you initially purchased (e.g.,
                </Paragraph>
                <Paragraph>
                  if you creates an In-App Product for a six-month subscription, your subscription
                  will be automatically renewed for an additional six-months). To avoid any charges
                  for additional periods, you must cancel it before the end of the trial period,
                  subscription period or renewal, as applicable, in accordance with the terms and
                  conditions of your Mobile Platform Account and therefore the terms and conditions
                  of any applicable Third Party Store. The pricing may vary due to a number of
                  factors, such as promotional offers, loyalty bonuses and other discounts that
                  might apply to your age group. In all cases, we are not responsible and have no
                  liability whatsoever for any payment processing errors (including card processing,
                  identity verification, analysis and regulatory compliance) or fees or other
                  service-related problems, including those issues that may arise from inaccurate
                  account information, or products or goods you obtain through your Mobile Platform
                  Account or Third Party Stores.
                </Paragraph>
                <Paragraph>
                  Furthermore, descriptions and images of, and references to, products or services
                  (including Premium Services or In-App Products) do not imply our or any of our
                  affiliates' endorsement of such products or services. Moreover, PakkiJodi and its
                  third party operational service providers reserve the right, with or without prior
                  notice, for any or no reason, to change product descriptions, images, and
                  references; to limit the offered amount of any product; to honor, or impose
                  conditions on the honoring of any coupon code, promotional code or other similar
                  promotions; to bar any user from conducting any or all transaction(s); and/or to
                  refuse to produce any user with any product. Also, if we terminate your use of or
                  registration to the App because you have breached some Terms, you shall not be
                  entitled to a refund of any unused portion of any fees, payments or other
                  consideration.
                </Paragraph>
                <Paragraph>
                  We encourage you to review the terms and conditions of the applicable third party
                  payment processors, Third Party Store or Mobile Platform Account before you buy
                  any In-App product or Premium Service purchases.
                </Paragraph>
              </li>
              <li>
                <Title level={3}>PUSH NOTIFICATIONS; LOCATION-BASED FEATURES</Title>
                <Paragraph>
                  We may provide you with emails, text messages, push notifications, alerts and
                  other messages related to the App and/or the PakkiJodi services, such as
                  enhancements, offers, products, events, and other promotions. After downloading
                  the App, you may be asked to simply accept or deny push notifications/alerts. If
                  you deny, you will not receive any push notifications/alerts. If you allow it,
                  push notifications/alerts will be automatically sent to you.
                </Paragraph>
                <Paragraph>
                  If you no longer wish to receive push notifications/alerts from the App, you may
                  opt out by changing your notification settings on your mobile device. With respect
                  to other types of messaging or communications, such as emails, text etc., you can
                  unsubscribe by either following the specific instructions included in such
                  communications, or by emailing us with your request at feedback@PakkiJodi.com
                </Paragraph>
                <Paragraph>
                  The App may allow access to available opportunities for you to view certain
                  content and receive other products, services or other materials based on your
                  location. To make these opportunities out there for you, the App will determine
                  your location using one or more reference points, such as GPS, Bluetooth and/or
                  software within your mobile device.
                </Paragraph>
                <Paragraph>
                  If you've set your mobile device to disable GPS, Bluetooth or other location
                  determining software or do not authorize the App to access your location data, you
                  will not be able to access such location-specific content, products, services and
                  materials.
                </Paragraph>
                <Paragraph>
                  For additional information regarding the App uses and your data, please browse our{' '}
                  <Link to="/privacy">Privacy Policy​</Link>​.
                </Paragraph>
              </li>
            </ol>
          </Paragraph>
        </Typography>
      </div>
    </PageSkeleton>
  );
}
