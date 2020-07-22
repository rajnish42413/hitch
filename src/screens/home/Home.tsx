import React, { useEffect } from 'react';
import { Card, Layout, Button } from 'antd';
import AppLayout from '../../layouts/app';
import './Home.less';
import { LeftOutlined, RightOutlined ,DownOutlined} from '@ant-design/icons';
import { colors } from '@constants/general';
import BottomFooter from './Footer';
import TopHeader from './Header';

const { Content } = Layout;


const Home = (props: any) => {

  const getData = async (page: number) => {
    // const { data } = await axios.get<IMedia>(`http://127.0.0.1:8000/api/media?page=${page}`);
    // setMedia(data);
  };

  useEffect(() => {
    getData(1);
  }, []);

  return (
    <AppLayout>
      <TopHeader />
      <UserPagination />
       <Content>
         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 1"}} />
         
         <UserDetailCard arrowDown={true}>
           <div>21 yrs</div>
           <div>X  X</div>
           <div>created by fater</div>
           <div>Sun Singh</div>
         </UserDetailCard>

         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 2"}} />

         <UserDetailCard >
           <p className="py-2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly 
             used to demonstrate the visual form of a document or a typeface without relying on meaningful content</p>
         </UserDetailCard>

         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 3"}} />

         <UserDetailCard>
           <div>Community</div>
           <div>Location</div>
         </UserDetailCard>

         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 4"}} />

         <UserDetailCard arrowDown={true}>
           <div>Workplace</div>
           <div>Job_title</div>
           <div>Edu Level</div>
           <div>College</div>
         </UserDetailCard>

         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 5"}} />
         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 6"}} />
       </Content>
      <BottomFooter />
    </AppLayout>
  );
};
export default Home;


const UserPagination = (props:any) => {
  return (
    <div className="user-pagination">
      <Button
        shape="circle"
        icon={<LeftOutlined style={{ color: colors['white-color'] }} />}
        size="large"
        style={{ backgroundColor: '#C1C1C1' }}
      />
      <div className="suggestion-box">
        <h3>Suggestion here</h3>
      </div>
      <Button
        shape="circle"
        icon={<RightOutlined style={{ color: colors['white-color'] }} />}
        size="large"
        style={{ backgroundColor: '#C1C1C1' }}
      />
    </div>
  );
};

const UserImageCard=(props:any):JSX.Element=>{
  if(!props?.image?.url) return <></>
  return(
    <Card
    style={{ margin: '20px' }}
    hoverable
    loading={props.image?.url ? false :true}
    cover={
      <img
        alt={'hello caption here'}
        src={props.image?.url}
        height="350px"
      />
    }
  >
    <Card.Meta title={props.image?.caption ?? " "} />
  </Card>
  )
}

const UserDetailCard =(props:any) =>{
  return(
    <Card  style={{ margin: '20px' }} className="user-detail-card" loading={props.loading ?? false}>
     {props.children}
     {props.arrowDown && <span style={{margin:'5px auto'}}><DownOutlined/></span>}
    </Card>
  )
}