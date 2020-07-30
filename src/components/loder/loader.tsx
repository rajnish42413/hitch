import React, { Component } from 'react';

import {Spin} from 'antd';

export default class Loader extends Component{

render() {
  return (
        <>
         <div className="loader">
          <Spin size="large" tip="Loading..." />
         </div>
        </>
    )
}
}
