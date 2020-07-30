import React, { Component } from 'react';
import Common from "./layouts/App";
import { Result, Icon, Button,Badge } from 'antd';
import { Link } from "react-router-dom";
import { ITopping ,Topping} from "../models/Pizza";


interface IProps {
    toppings:ITopping;
}

export default class Description extends Component<IProps>{

render() {
	
  return (
         <>
               <p className="description">
                 {this.props.toppings.map((topping:Topping, i:number) =>
                   <Badge key={i} status="processing" text={topping.name}></Badge>
                 )}
              </p>
        </>
    )
}
}
