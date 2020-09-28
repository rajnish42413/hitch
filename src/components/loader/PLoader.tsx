import React, { useEffect } from 'react';
import NProgress from 'nprogress';

interface IProps {}

const Ploader: React.FC<IProps> = props => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  });
  return <></>;
};

export default Ploader;
