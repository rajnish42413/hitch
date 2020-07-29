import React, { useEffect, useState } from 'react';
import { Layout, Button } from 'antd';
import AppLayout from '../../layouts/app';
import './Home.less';
import { LeftOutlined, RightOutlined, PlusOutlined } from '@ant-design/icons';
import { colors } from '@constants/general';
import BottomFooter from './Footer';
import TopHeader from './Header';
import UserProfileDetail from '../../components/UserProfileDetail';
import Axios from 'axios';
import { IProfile } from '../../schemas/IProfile';
import Loader from '../loader/Loader';

const { Content } = Layout;

const Home = (props: any) => {
  const [list, setlist] = useState([] as Array<IProfile>);
  const [loading, setloading] = useState(true);
  const [current, setCurrent] = useState(0);

  const getData = async () => {
    setloading(true);
    const { data } = await Axios.get(`https://5f11a9a565dd950016fbda11.mockapi.io/shaadi`);
    if(data?.length) setlist(data);
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onNext =()=>{
    setCurrent(nextItem(current,list.length));
  }

  const onPrev =()=>{
    setCurrent(prevItem(current,list.length));
  }

  return (
    <AppLayout>
      <TopHeader profile={list[current]} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <UserPagination onNext={onNext} onPrevous={onPrev} />
          <Content>
            <UserProfileDetail profile={list[current]}/>
          </Content>
          <Button
            shape="circle"
            size="large"
            icon={<PlusOutlined />}
            className="shortlist-button"
            type="primary"
          />
        </>
      )}
      <BottomFooter />
    </AppLayout>
  );
};
export default Home;

const UserPagination = (props: any) => {
  return (
    <div className="user-pagination">
      <Button
        shape="circle"
        icon={<LeftOutlined style={{ color: colors['white-color'] }} />}
        size="large"
        style={{ backgroundColor: '#C1C1C1' }}
        onClick={props.onPrevous}
      />
      <div className="suggestion-box">
        <h3>Suggestion here</h3>
      </div>
      <Button
        shape="circle"
        icon={<RightOutlined style={{ color: colors['white-color'] }} />}
        size="large"
        style={{ backgroundColor: '#C1C1C1' }}
        onClick={props.onNext}
      />
    </div>
  );
};


function nextItem(i:number,len:number) {
  if (i >= len) { 
    return len -1;
}
  i = i + 1;
  return i; 
}

function prevItem(i:number,len:number) {
  if (i === 0) { 
      i = 1;
  }
  i = i - 1;
  return i; 
}