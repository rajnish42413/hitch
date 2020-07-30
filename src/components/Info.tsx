import React, { Component } from 'react';
import Common from "./layouts/App";
import { Result, Icon, Button } from 'antd';
import { Link } from "react-router-dom";


export default class Info extends Component{

render() {
	
  return (
         <Common >
     <Result
         status="404"
         title="Thank You"
         subTitle="Great, we have place your order we will contact you soon !"
         extra={<Button type="primary"><Link to="/" >Back Home</Link></Button>}
       />
        </Common>
    )
}
}
