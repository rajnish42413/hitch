import React from 'react';
import './style.scss';

export default function AuthLayout(props: any) {
  return <main className="main">{props.children}</main>;
}
