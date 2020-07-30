import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Dropdown, Layout, Row, Switch, Menu } from 'antd';
import AppLayout from '../../layouts/app';
import BottomFooter from '../home/Footer';
import { HeaderSkelaton } from '../home/Header';
import Icon ,{PhoneOutlined ,PhoneFilled,CloseOutlined ,HeartOutlined} from '@ant-design/icons';
import { colors } from '@constants/general';
import Axios from 'axios';
import Loader from '../loader/Loader';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const MenuIcon = (props: any) => <Icon component={MenuSvg} {...props} />;
enum PType { "shortlist","likes" };

const Shortlist = (props: any) => {
  const [shortlistedData, setShortlistedData] = useState([] as Array<IShortList>);
  const [likesData, setLikesData] = useState([] as Array<IShortList>);
  const [loading, setLoading] = useState(true);
  const [listingType, setListingType] = useState(PType.shortlist);

  const getShortlisted = async () => {
    setLoading(true);
    const { data } = await Axios.get(`https://5f11a9a565dd950016fbda11.mockapi.io/shortlist`);
    setShortlistedData(data);
    setLoading(false);
  };

  const getLikes = async () => {
    setLoading(true);
    const { data } = await Axios.get(`https://5f11a9a565dd950016fbda11.mockapi.io/shortlist`);
    setLikesData(data);
    setLoading(false);
  };

  useEffect(() => {
  if(listingType === PType.shortlist)  getShortlisted();
  if(listingType === PType.likes) getLikes();
  }, [listingType]);

  return (
    <AppLayout>
      <TopHeader />
        <Switch
          checkedChildren="My List"
          unCheckedChildren="Likes"
          defaultChecked
          style={{display:"block",margin:'1rem'}}
          onChange={()=>setListingType(listingType===PType.shortlist ? PType.likes:PType.shortlist)}
        /> 
      {loading ? <Loader /> : <Content>{renderDataList(listingType === PType.likes ? likesData : shortlistedData ,listingType)}</Content>}
      <BottomFooter />
    </AppLayout>
  );
};
export default Shortlist;

const TopHeader = (props: any) => {
  return (
    <HeaderSkelaton>
      <Row>
        <Col span={16}>
          <div className="user-name-tile">
            <h3>Shortlist</h3>
          </div>
        </Col>
        <Col className="right-menu-icon" span={8}>
           <Dropdown overlay={filterMenu} trigger={['click']} placement="bottomRight" >
              <span onClick={e => e.preventDefault()}><MenuIcon /> </span>
          </Dropdown>
        </Col>
      </Row>
    </HeaderSkelaton>
  );
};



const shortListcard = (data:IShortList,listType:PType) => {
  return (
      <Card key={data.id} loading={data?false:true} 
       style={{ margin: '20px', padding: 0,marginBottom:'2rem' }}
       className="shortlist-box">

       {listType === PType.shortlist && <div className="list-badge">New message <span>9</span></div>}

      <div className="shortlist-card">
        <div className="shortlist-card-left">
          <Link to={listType === PType.shortlist ? `/shortlist/user/${data.id}` :`/likes/user/${data.id}`}>
            <img
            alt={'hello caption here'}
            src={'https://source.unsplash.com/900x900/?indian,girl,model'}
          />
          </Link>
          <div>Selected by {'Father'}</div>
        </div>
        <div className="shortlist-card-right">
          <div>
          <Link to={listType === PType.shortlist ? "/shortlist/user/1" :"/likes/user/1"}>
            <h3>{data.name}</h3></Link>
            <span>2 day ago</span>
          </div>
          <div>
            <span>{data.age} yrs</span>
            <span>X X</span>
          </div>
          <div>
             <span>{data.workplace}</span>
            <span>{data.slary} LPA</span>
          </div>
          <div>
            <span>{data.edu_level}</span>
            <span>Edu Level</span>
          </div>
          <div>
            <span>Community</span>
            <span>{data.location}</span>
          </div>
        </div>
      </div>
      {listType === PType.shortlist && <>
      <Button
        shape="circle"
        size="middle"
        className="button-shortlist-and-likes"
        danger
        style={{ position: 'absolute', bottom: '-12px', left: '-12px' }}
      >
        <CloseOutlined />
      </Button>
   

      <Dropdown overlay={callMenu} trigger={['click']} key={data.id} placement="bottomRight" >
      <Button
        shape="circle"
        size="middle"
        type="link"
        className="button-shortlist-and-likes"
        style={{
          position: 'absolute',
          bottom: '-12px',
          right: '-12px',
          borderColor: colors['primary-color']
        }}
        onClick={e => e.preventDefault()}
      >
        <PhoneOutlined />
      </Button>
      </Dropdown>
      </>}

      {listType === PType.likes && <>
      <Button
        shape="circle"
        size="middle"
        danger
        style={{ position: 'absolute', bottom: '-12px', left: '-12px' }}
        className="button-shortlist-and-likes"
      >
        <CloseOutlined />
      </Button>
   

      <Button
        shape="circle"
        size="middle"
        type="link"
        style={{
          position: 'absolute',
          bottom: '-12px',
          right: '-12px',
        }}
        className="button-shortlist-and-likes"
        onClick={e => e.preventDefault()}
      >
        <HeartOutlined />
      </Button>
      </>}
    </Card>
  );
};

export const callMenu = (
  <Menu className="filter-box">
    <Menu.Item key="0">
      <button> <PhoneFilled style={{color:colors["primary-color"]}} /> {"  "}Father</button>
    </Menu.Item>
    <Menu.Item key="1">
      <button> <PhoneFilled style={{color:colors["primary-color"]}} /> {"  "}Mother</button>
    </Menu.Item>
    <Menu.Item key="2">
      <button> <PhoneFilled style={{color:colors["primary-color"]}} /> {"  "}Sister</button>
    </Menu.Item>
    <Menu.Item key="3">
      <button> <PhoneFilled style={{color:colors["primary-color"]}} /> {"  "}Brother</button>
    </Menu.Item>
    <Menu.Item key="4">
      <button> <PhoneFilled style={{color:colors["primary-color"]}} /> {"  "}Guardian</button>
    </Menu.Item>
    <Menu.Item key="5">
      <button> <PhoneFilled style={{color:colors["primary-color"]}} /> {"  "}Rajnish</button>
    </Menu.Item>
  </Menu>
);

const filterMenu = (
  <Menu className="filter-box">
    <Menu.Item key="0">
      <button  className="text-center">By Date</button>
    </Menu.Item>
    <Menu.Item key="1">
      <button  className="text-center">By Age</button>
    </Menu.Item>
    <Menu.Item key="2">
      <button  className="text-center">By Height</button>
    </Menu.Item>
    <Menu.Item key="3">
      <button  className="text-center">By Community</button>
    </Menu.Item>
    <Menu.Item key="4">
      <button  className="text-center">By Location</button>
    </Menu.Item>
  </Menu>
);


const MenuSvg = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 16H8V13.3333H0V16ZM0 0V2.66667H24V0H0ZM0 9.33333H16V6.66667H0V9.33333Z"
      fill="black"
    />
  </svg>
);

const renderDataList=(data:Array<IShortList> ,listingType :PType )=>{
   return data?.map((item:IShortList,i:number)=>shortListcard(item,listingType ));
}

