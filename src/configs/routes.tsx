import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import * as authToken from '@utils/userAuth';
import Ploader from '../components/loader/PLoader';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

import ProfileGender from '../screens/user/create/profileGender';
import ProfileName from '../screens/user/create/profileName';
import ProfileDOB from '../screens/user/create/ProfileDOB';
import ProfileHeight from '../screens/user/create/ProfileHeight';
import ProfileCity from '../screens/user/create/ProfileCity';
import ProfileCommunity from '../screens/user/create/ProfileCommunity';
import GoodGoing from '../screens/user/create/GoodGoing';
import ProfileEducation from '../screens/user/create/ProfileEducation';
import WellDone from '../screens/user/create/WellDone';
import ProfileWorkplace from '../screens/user/create/ProfileWorkplace';
import GreatJob from '../screens/user/create/GreatJob';

const NotFoundPage = React.lazy(() => import('../screens/home/pages/notFound'));
const UserCreatedWelcome = React.lazy(() => import('../screens/user/success'));
const UserImage = React.lazy(() => import('../screens/media/image'));
const MediaUpload = React.lazy(() => import('../screens/media/upload'));
const UserIntro = React.lazy(() => import('../screens/user/intro'));
const Shortlist = React.lazy(() => import('../screens/shortlist/index'));
const UserProfile = React.lazy(() => import('../screens/user/profile/index'));
const UserImageManage = React.lazy(() => import('../screens/user/profile/imageManage'));
const UserDetail = React.lazy(() => import('../screens/user/profile/deatil'));
const Preference = React.lazy(() => import('../screens/user/profile/preference'));
const CandidateProfile = React.lazy(() => import('../screens/shortlist/candidateProfile'));
const CandidateLikeProfile = React.lazy(() => import('../screens/shortlist/candidateLikeProfile'));
const FAQ = React.lazy(() => import('../screens/contact/faq'));
const UserAccount = React.lazy(() => import('../screens/user/account'));
const ProfileUsers = React.lazy(() => import('../screens/user/profileUser'));
const UserChat = React.lazy(() => import('../screens/user/chat/index'));
const Privacy = React.lazy(() => import('../screens/home/pages/privacy'));
const Terms = React.lazy(() => import('../screens/home/pages/terms'));
const SafetyTips = React.lazy(() => import('../screens/home/pages/safetyTips'));
const CommunityGuidelines = React.lazy(() => import('../screens/home/pages/commynity'));
const ReportProfile = React.lazy(() => import('../screens/report'));
const PorfileDetail = React.lazy(() => import('../screens/profiles/detail'));
const Login = React.lazy(() => import('../screens/auth/Login'));
const Home = React.lazy(() => import('../screens/find/Find'));
const MobileVerification = React.lazy(() => import('../screens/auth/MobileVerification'));
const VerifyPhone = React.lazy(() => import('../screens/auth/VerifyPhone'));
const Welcome = React.lazy(() => import('../screens/user/welcome'));
const CreateUserStepOne = React.lazy(() => import('../screens/user/create/Step-1'));
const CreateUserStepTwo = React.lazy(() => import('../screens/user/create/Step-2'));
const FaqHome = React.lazy(() => import('../screens/home/pages/faq'));
const LandingPage = React.lazy(() => import('../screens/home'));
const ContactDetail = React.lazy(() => import('../screens/home/pages/contact'));
const Support = React.lazy(() => import('../screens/home/pages/support'));
const Jobs = React.lazy(() => import('../screens/home/pages/jobs'));
const ProfileFor = React.lazy(() => import('../screens/user/create/profileFor'));

const Routes = (props: any) => (
  <BrowserRouter>
    <React.Suspense fallback={<Ploader />}>
      <Switch>
        {/* public routes */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/terms" component={Terms} />

        <Route exact path="/safety-tips" component={SafetyTips} />
        <Route exact path="/community-guidelines" component={CommunityGuidelines} />
        <Route exact path="/faq" component={FaqHome} />
        <Route exact path="/contact" component={ContactDetail} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/jobs" component={Jobs} />

        {/* /open pages */}
        <Route path="/profiles/:id" component={PorfileDetail} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/phone-number" component={MobileVerification} />
        <PublicRoute path="/verify-phone-number" component={VerifyPhone} />
        <PublicRoute path="/profile-for" component={ProfileFor} />

        {/* privates routes */}
        <PrivateRoute path="/user/create/profile-for" component={ProfileFor} />
        <PrivateRoute path="/user/create/profile-gender" component={ProfileGender} />
        <PrivateRoute path="/user/create/profile-name" component={ProfileName} />
        <PrivateRoute path="/user/create/profile-dob" component={ProfileDOB} />
        <PrivateRoute path="/user/create/profile-height" component={ProfileHeight} />
        <PrivateRoute path="/user/create/profile-location" component={ProfileCity} />
        <PrivateRoute path="/user/create/profile-community" component={ProfileCommunity} />
        <PrivateRoute path="/user/create/good-going" component={GoodGoing} />
        <PrivateRoute path="/user/create/profile-education" component={ProfileEducation} />
        <PrivateRoute path="/user/create/well-done" component={WellDone} />
        <PrivateRoute path="/user/create/profile-workspace" component={ProfileWorkplace} />
        <PrivateRoute path="/user/create/great-job" component={GreatJob} />

        <PrivateRoute path="/user/create/step-1" component={CreateUserStepOne} />
        <PrivateRoute path="/user/create/step-2" component={CreateUserStepTwo} />
        <PrivateRoute path="/user/create/success" component={UserCreatedWelcome} />

        <PrivateRoute path="/user/welcome" component={Welcome} />
        <PrivateRoute path="/user/images" component={UserImage} />
        <PrivateRoute path="/upload-image" component={MediaUpload} />
        <PrivateRoute path="/user/introduction" component={UserIntro} />
        <PrivateRoute path="/user/report-profile" component={ReportProfile} />

        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/profile-image-upload" component={UserImageManage} />
        <PrivateRoute path="/profile" component={UserProfile} />
        <PrivateRoute path="/user/detail" component={UserDetail} />
        <PrivateRoute path="/profile-users" component={ProfileUsers} />

        <PrivateRoute path="/shortlisted" component={Shortlist} />
        <PrivateRoute path="/shortlist/user/:id" component={CandidateProfile} />

        <PrivateRoute path="/preference" component={Preference} />
        <PrivateRoute path="/likes/user/:id" component={CandidateLikeProfile} />
        <PrivateRoute path="/account" component={UserAccount} />

        <PrivateRoute path="/users/:id/chat" component={UserChat} />

        <PrivateRoute path="/help" component={FAQ} />

        {/* //404 */}
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  React.useState(nprogress.start());
  useEffect(() => {
    nprogress.done();
    return () => {
      nprogress.start();
    };
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken.get() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
};

const PublicRoute = ({ component: Component, ...rest }: any) => {
  React.useState(nprogress.start());

  useEffect(() => {
    nprogress.done();
    return () => {
      nprogress.start();
    };
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        authToken.get() ? (
          <Redirect
            to={{
              pathname: '/home',
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default Routes;
