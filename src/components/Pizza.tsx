import React, { Component }  from 'react' ;
import axios from "axios";
import Common from "./layouts/App";
import Pizza from "../components/Pizza";
import { IPizza } from "../models/Pizza";
import {Form, InputNumber,Radio,Button,Row,Col,message,Modal,Tag} from 'antd';
import Loader from './loder/loader';
import { Link } from "react-router-dom";
import Info  from "./Info";
import { withRouter } from 'react-router-dom';
import Description from "./Description" ;
const { confirm } = Modal;


const size = [
  {
    "name":"S",
    "amount":10,
    "inch": 9
  },
  {
    "name":"M",
    "amount":12,
    "inch":11
  },
  {
    "name":"L",
    "amount":15,
    "inch":13
  },  {
    "name":"XL",
    "amount":20,
    "inch":15
      }
  ];

interface IState {
  pizza?: any ;
  loading:boolean;
  toppings?:any;
  baseUrl:string;
  basePrice:number;
  selectToppings?:any;
  selectSize?:number;
  visible:boolean;
}

interface IProps {
  form?: any ;
  slug? : string;
  value?:any;
  match?:any;
  history ?:any;
}

class Maker extends Component<IProps, IState> {

  constructor(props:IProps) {
    super(props)
    this.redirect = this.redirect.bind(this)
  }

 state = {
    pizza: null,
    pizzaSlug: this.props.slug,
    loading: true,
    toppings:null,
    baseUrl : 'https://backend-pizza.herokuapp.com/',
    basePrice:0,
    selectToppings:[],
    selectSize:9,
    visible:false
  }


  async componentDidMount(){
        const pizza = this.props.match.params.pizza;
        const data  = await axios.get(`/pizza/${pizza}`);
        console.log(data.data);
        const findsize =  size.filter((size)=>{
             return size.inch ==  this.state.selectSize
         });
        this.setState({ pizza: data.data ,basePrice:findsize[0].amount});
        this.getToppings();
   }

   handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err:any, values:any) => {
      if (!err) {
         console.log('Received values of form: ', values);
      }
    });
  };

resetPizza = ()=>{
    this.setState({loading:false,selectSize:9 ,selectToppings:null});
    this.componentDidMount();
    this.setState({loading:true});
}

 async getData(slug:string) {
      let url= 'pizza/'+slug;
        await axios.get(url)
        .then(response => {
          this.setState({ pizza: response.data ,basePrice:response.data.amount});
        })
         .catch(function (err) {
           message.error(err);
       })
   }

 async getToppings() {
    await axios.get('topping')
    .then(response => {
      this.setState({ toppings: [...response.data]});
      this.setState({ loading: false});
    })
    .catch(function (err) {
       message.error(err);
    })
  }

// Add topping
toppingAdd = (value:any) => {
  let basePrice = this.state.basePrice;
  let price = +basePrice +  +value.amount;
   this.setState({basePrice:price ,selectToppings: [...this.state.selectToppings, value]});
   message.success( value.name + ' Added Successfully');
}


  // Select Size
  selectSize = (e:any) => {
      this.setState({loading:true});
      this.setState({selectSize: e.target.value });
       const findsize =  size.filter((size)=>{
         return size.inch ==  e.target.value;
      });
       let price = findsize[0].amount;

       this.state.selectToppings.map((topping:any,i)=> {
         console.log(topping);
          return price = +price +  +topping.amount ;
      });
      this.setState({basePrice:price,loading:false});
      message.success(e.target.value + 'inch Size Updated Successfully');
  }
  

  //Calculate total price
  calculateTotalPrice = () =>
  {
    let total = this.state.basePrice;
     this.state.selectToppings.map((topping:any,i)=> {
          total = +total +  +topping.amount ;
      });
     console.log(total);
      this.setState({basePrice:total});
  };


showConfirm = () => {   
  this.setState({visible:true})
}


redirect(event:any) {
    event.preventDefault();
  let url = "/order-place";
  this.props.history.push(url);  
}

 handleCancel = e => {
    this.setState({
      visible: false,
    });
 };




render() {
 const { getFieldDecorator: decorator }  = this.props.form;
    
    return (
        <>
        <Common >
      {this.state.loading ? <Loader /> :(
            <Row>
               <Col span={24} className="pizzamaker-box" >
                <Row>
                <Col xs={{ span: 22 }} lg={{ span: 16 }} className="pizzamaker-toppings">
                 { this.state.pizza && 
                    <h1 className="pizza-tittle"> { this.state.pizza.name} 
                    <Description toppings={this.state.pizza.toppings} /> </h1>   
                 }
                  <h1 className="pizza-tittle"><b>TOTAL PRICE :</b> $ {this.state.basePrice} </h1>
                      <Form labelCol={{ span: 16 }} wrapperCol={{ span: 8 }} onSubmit={this.handleSubmit}>
                       <Form.Item label="Select Pizza Size" className="select-size">
                               <Radio.Group onChange={this.selectSize} value={this.state.selectSize}>
                                 {size.map((size, i: number) => 
                                    <Radio value={size.inch} key={i}>{size.inch} inch</Radio>
                                 )}
                                </Radio.Group>
                       </Form.Item>
            
                    <Row>
                     {this.state.toppings.map((topping, i: number) => 
                       <Col span={12} key={i}>
                        <Form.Item label={'$ '+topping.amount + ' ' +topping.name} size="large"  className="topping-box">
                          {decorator(topping.slug, { initialValue: 0 })(<InputNumber min={0} max={3}
                          onChange={()=>this.toppingAdd(topping)}/>)}
                        </Form.Item>
                         { topping.icon && (<img src={ this.state.baseUrl+'images/toppings/'+topping.icon} className="img-icon" />)}
                      </Col>
                      )}
                    </Row>
                        <Form.Item  wrapperCol={{ span: 12, offset: 6 }} >
                            <Button type="primary" htmlType="button"><Link to="/"> Home</Link></Button>
                            <Button type="primary" htmlType="submit" style={{ margin:"0 1.5rem" }} onClick={this.showConfirm}> Place Your Order </Button>
                           {/* <Button type="primary" htmlType="reset" onClick={this.resetPizza}> Reset </Button>*/}
                         </Form.Item>
                      </Form>

                        <Modal
                          title="Do you Want to Place your Order?"
                          visible={this.state.visible}
                          onOk={this.redirect}
                          onCancel={this.handleCancel}
                        >
                     <p><b>Total Amount : </b>$ {this.state.basePrice}</p>
                     <p><b>Topping Selected : </b> {this.state.selectToppings.length}</p>
                     <p><b>Pizza Size : </b> {this.state.selectSize}</p>
                        </Modal>
                    </Col>
                   </Row>
               </Col>
             </Row>
       )}
         </Common>
        </>
    )
 }
}

export default Form.create({ name: 'pizza_maker' })(Maker);
