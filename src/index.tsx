import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { message } from 'antd';
import * as serviceWorker from './serviceWorker';
import Routes from './configs/routes';
import * as authToken from '@utils/userAuth';
import { APP_URL } from '@constants/general';
import { Provider } from 'react-redux';
import store from '@redux/store';
import './index.less';

Axios.defaults.headers.common['Accept'] = 'application/json';
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
Axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.baseURL = APP_URL;

Axios.interceptors.request.use(
  async (config) => {
    const token = authToken.get();
    if (!token) {
      return config;
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.Accept = 'application/json';
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    message.destroy();
    if (error.response?.data?.errors) {
      console.log(error.response.data.errors);
    } else {
      message.warning(error.response?.data?.message ?? error.message);
    }
    if (error.response?.status === 401) {
      console.log('401 error');
      authToken.clearAll();
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
