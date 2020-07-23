import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Layout, Row, Switch } from 'antd';
import AppLayout from '../../layouts/app';
import BottomFooter from '../home/Footer';
import { HeaderSkelaton } from '../home/Header';
import Icon from '@ant-design/icons';
import { colors } from '@constants/general';
import Axios from 'axios';
import Loader from '../loader/Loader';

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
          checkedChildren="shotlisted"
          unCheckedChildren="Likes"
          defaultChecked
          style={{display:"block",margin:'1rem'}}
          onChange={()=>setListingType(listingType===PType.shortlist ? PType.likes:PType.shortlist)}
        /> 
      <Divider />
      {loading ? <Loader /> : <Content>{renderDataList(listingType === PType.likes ? likesData : shortlistedData)}</Content>}
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
          <Button type="text">
            <MenuIcon />
          </Button>
        </Col>
      </Row>
    </HeaderSkelaton>
  );
};

const MenuSvg = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0 16H8V13.3333H0V16ZM0 0V2.66667H24V0H0ZM0 9.33333H16V6.66667H0V9.33333Z"
      fill="black"
    />
  </svg>
);

const renderDataList=(data:Array<IShortList>)=>{
   return data?.map((item:IShortList,i:number)=>shortListcard(item));
}

const shortListcard = (data:IShortList) => {
  return (
    <Card key={data.id} loading={data?false:true} style={{ margin: '20px', padding: 0,marginBottom:'2rem' }} className="shortlist-box">
      <div className="shortlist-card">
        <div className="shortlist-card-left">
          <img
            alt={'hello caption here'}
            src={'https://source.unsplash.com/900x900/?indian,girl,model'}
          />
          <div>Selected by {'Father'}</div>
        </div>
        <div className="shortlist-card-right">
          <div>
            <h3>{data.name}</h3>
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
      <Button
        shape="circle"
        size="middle"
        danger
        style={{ position: 'absolute', bottom: '-12px', left: '-12px' }}
      >
        R
      </Button>
      <Button
        shape="circle"
        size="middle"
        type="link"
        style={{
          position: 'absolute',
          bottom: '-12px',
          right: '-12px',
          borderColor: colors['primary-color']
        }}
      >
        C
      </Button>
    </Card>
  );
};
