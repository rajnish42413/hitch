import React from 'react';
import { Card, Collapse } from 'antd';

export default function UserProfileDetail() {
  return <>
    <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 1"}} />
         
         <UserDetailCard 
           collapseData={<>
                    <div className="span">Maritial_status</div>
                    <div className="span">Maritial_status</div>
                    <div className="span w-100">Maritial_status</div>
                  </>}>
           <div className="span">21 yrs</div>
           <div className="span">X  X</div>
           <div className="span">created by fater</div>
           <div className="span">Sun Singh</div>
         </UserDetailCard>

         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 2"}} />

         <UserDetailCard >
           <p className="py-2">In publishing and graphic design, Lorem ipsum is a placeholder text commonly 
             used to demonstrate the visual form of a document or a typeface without relying on meaningful content</p>
         </UserDetailCard>

         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 3"}} />

         <UserDetailCard>
           <div className="span">Community</div>
           <div className="span">Location</div>
         </UserDetailCard>

         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 4"}} />

         <UserDetailCard 
         collapseData={<>
          <div className="span">Maritial_status</div>
          <div className="span">Maritial_status</div>
          <div className="span w-100">Maritial_status</div>
        </>}>
           <div className="span">Workplace</div>
           <div className="span">Job_title</div>
           <div className="span">Edu Level</div>
           <div className="span">College</div>
         </UserDetailCard>

         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 5"}} />
         <UserImageCard image={{url:"https://source.unsplash.com/900x900/?indian,girl,model",caption:"Image Caption 6"}} />
  </>;
}


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
          className="user-image-card"
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
       {props.collapseData && 
  
        <Collapse defaultActiveKey={[]} className="user-card-collapase" >
           <Collapse.Panel header=" " key="1">
             {props.collapseData}
           </Collapse.Panel>
        </Collapse>
       }
      </Card>
    )
  }