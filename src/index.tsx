import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.less';
import Home from './screens/home/Home';
import Login from './screens/auth/Login';
import Media from './screens/user/media';
import Axios from 'axios';
import { message } from 'antd';

import * as serviceWorker from './serviceWorker';

// screens
import MobileVerification from './screens/auth/MobileVerification';
import VerifyPhone from './screens/auth/VerifyPhone';
import Welcome from './screens/user/welcome';
import CreateUserStepOne from './screens/user/create/Step-1';
import CreateUserStepTwo from './screens/user/create/Step-2';
import UserCreatedWelcome from './screens/user/success';
import UserImage from './screens/media/image';
import MediaUpload from './screens/media/upload';
import UserIntro from './screens/user/intro';
import Shortlist from './screens/shortlist/index';
import UserProfile from './screens/user/profile/index';
import UserImageManage from './screens/user/profile/imageManage';
import UserDetail from './screens/user/profile/deatil';
import Preference from './screens/user/profile/preference';
import CandidateProfile from './screens/shortlist/candidateProfile';
import CandidateLikeProfile from './screens/shortlist/candidateLikeProfile';
import FAQ from './screens/contact/faq';
import UserAccount from './screens/user/account';
import ProfileUsers from './screens/user/profileUser';


// Axios.defaults.headers.common['Accept'] = 'application/json';
// Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// Axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

Axios.interceptors.response.use(response => {
  return response;
}, error => {
  if(error.response?.data?.errors){
    console.log(error.response.data.errors);
  }else{
   message.warning(error.response?.data?.message ?? error.message);
  }
  return Promise.reject(error);
});

ReactDOM.render(
  <Router>
    <Switch>
    <Route exact path="/" component={Login} />
      <Route  path="/phone-number" component={MobileVerification} />
      <Route  path="/verify-phone-number" component={VerifyPhone} />

      <Route  path="/user/create/step-1" component={CreateUserStepOne} />
      <Route  path="/user/create/step-2" component={CreateUserStepTwo} />
      <Route  path="/user/create/success" component={UserCreatedWelcome} />

      <Route  path="/user/welcome" component={Welcome} />
      <Route  path="/user/images" component={UserImage} />
      <Route  path="/upload-image" component={MediaUpload} />
      <Route  path="/user/introduction" component={UserIntro} />

      <Route  path="/home" component={Home} />
      <Route  path="/profile/image/:id" component={UserImageManage} />
      <Route  path="/profile" component={UserProfile} />
      <Route  path="/user/detail" component={UserDetail} />
      <Route  path="/profile-users" component={ProfileUsers} />


      <Route  path="/shortlisted" component={Shortlist} />
      <Route  path="/shortlist/user/:id" component={CandidateProfile} />

      <Route  path="/preference" component={Preference} />
      <Route  path="/likes/user/:id" component={CandidateLikeProfile} />
      <Route  path="/account" component={UserAccount} />


      <Route path="/login" component={Login} />
      <Route  path="/help" component={FAQ} />
      <Route path="/media" component={Media} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


