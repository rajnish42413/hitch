import React from 'react';
import { Redirect } from 'react-router-dom';

export const PrivateRoute = (props) => (
  localStorage.getItem('token') ? (
     props.children
  ): <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
);
