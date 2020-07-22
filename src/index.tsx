import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.less';
import Home from './screens/home/Home';
import Login from './screens/auth/Login';
import Signup from './screens/signup/Signup';
import Media from './screens/user/Media';
import Axios from 'axios';
import { message } from 'antd';

import * as serviceWorker from './serviceWorker';

// screens
import MobileVerification from './screens/auth/MobileVerification';
import VerifyPhone from './screens/auth/VerifyPhone';
import Welcome from './screens/user/Welcome';
import CreateUserStepOne from './screens/user/create/Step-1';
import CreateUserStepTwo from './screens/user/create/Step-2';
import UserCreatedWelcome from './screens/user/Welcome-Screen-2';
import UserImage from './screens/media/image';
import MediaUpload from './screens/media/upload';
import UserIntro from './screens/user/intro';
import Shortlist from './screens/shortlist/index';


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
      <Route  path="/shortlisted" component={Shortlist} />


      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/media" component={Media} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();


