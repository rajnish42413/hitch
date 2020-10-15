import React, { useEffect, useState } from 'react';
import { Button, Layout, Result, Input, Typography, Row, Drawer, Checkbox } from 'antd';
import AppLayout from '../../layouts/app';
import { SearchOutlined } from '@ant-design/icons';
import Axios from 'axios';
import Loader from '../../components/loader/Loader';
import { IShortlist } from '../../schemas/Shortlist';
import { IAppState } from '@redux/reducers';
import { connect } from 'react-redux';
import PJCard from '../../components/PJCard';
import TopHeader from '../find/Header';
import { ArrayIDS } from '@utils/helpers';
import { IUser } from 'src/schemas/IUser';

const { Content } = Layout;

// enum PType {
//   'shortlist',
//   'likes',
// }
interface IData {
  list: Array<IShortlist>;
  likes_me: string;
  liked_by_by: Array<number>;
}

const Shortlist = (props: any) => {
  const [data, setData] = useState({} as IData);

  // for tem data
  const [shortlistedData, setShortlistedData] = useState([] as Array<IShortlist>);
  const [loading, setLoading] = useState(true);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [drawerContent, setDrawerContent] = useState(null);

  const [members, setMembers] = useState(props.user.profile.members);
  const LikesByOptions = CheckboxOptions(members, props.user);
  const defaultCheckedList = LikesByOptions ? ArrayIDS(LikesByOptions) : [];

  const [filterDRawer, setFilterDrawer] = useState(false);
  const [likedBy, setLikedBy] = useState(defaultCheckedList);

  const [likeByMe, setLikeByMe] = useState(LikesByOptions.length === likedBy.length);
  const [likeMe, setLikeMe] = useState(true);

  const getShortlisted = async (params?: Object) => {
    setLoading(true);
    const { data } = await Axios.get(`shortlists`, { params: { ...params } });
    setData(data);
    setShortlistedData(data.list);
    setLoading(false);
  };

  const onSearch = (e: any) => {
    let d = data?.list?.filter((o: IShortlist) => {
      return o.profile.name.toLowerCase().includes(e.target.value);
    });
    setShortlistedData(d);
  };

  const getMembers = async () => {
    const { data } = await Axios.get(`user/members`);
    setMembers(data);
  };

  const reload = () => {
    setDrawerOpened(false);
    setDrawerContent(null);
    getShortlisted();
  };

  useEffect(() => {
    getMembers();
    getShortlisted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFinish = () => {
    const params = {
      liked_by: likedBy,
      likes_me: likeMe ? 1 : 0,
      filter: true,
    };
    getShortlisted(params);
  };

  const onCheckAllChange = (e: any) => {
    if (e.target.checked) {
      setLikedBy(defaultCheckedList);
    } else {
      setLikedBy([]);
    }
    setLikeByMe(e.target.checked);
  };

  const onchangeLikeMe = (e: any) => {
    setLikeMe(e.target.checked);
  };

  const onChangeLikeBy = (checkedValues: any) => {
    setLikedBy(checkedValues);
    setLikeByMe(defaultCheckedList.length === checkedValues.length);
  };

  return (
    <AppLayout>
      <TopHeader />
      {loading ? (
        <Loader />
      ) : (
        <Content style={{ padding: '0 1rem', margin: '2rem 0' }}>
          <Input
            placeholder="Search for name, education etc."
            prefix={<SearchOutlined />}
            onChange={onSearch}
            allowClear
          />

          <div className="flex-row mt-1">
            <Typography.Title level={4} style={{ display: 'inline-block' }}>
              Shortlists
            </Typography.Title>
            <button
              type="button"
              className="btn-text-primary"
              onClick={() => setFilterDrawer(true)}
            >
              Filter
            </button>
          </div>
          {renderDataList(
            props.user?.profile ? props.user?.profile.id : props.user.id,
            shortlistedData,
            reload,
            setDrawerOpened,
            setDrawerContent
          )}
          <ContactMenu
            visible={drawerOpened}
            setVisibal={setDrawerOpened}
            content={drawerContent}
          />
        </Content>
      )}
      <Drawer
        onClose={() => setFilterDrawer(false)}
        title="Filter"
        placement="bottom"
        closable={true}
        visible={filterDRawer}
        height="40vh"
      >
        <Checkbox value="1" checked={likeByMe} onChange={onCheckAllChange}>
          Show the people I liked
        </Checkbox>

        {LikesByOptions && (
          <Checkbox.Group
            options={LikesByOptions}
            defaultValue={likedBy}
            onChange={onChangeLikeBy}
            style={{ margin: '0 1rem', display: 'flex', flexDirection: 'column' }}
          />
        )}

        <Checkbox checked={likeMe} onClick={onchangeLikeMe}>
          Show people who liked me
        </Checkbox>
        <Button className="btn-dark mt-1" block onClick={onFinish} type="text">
          Apply
        </Button>
      </Drawer>
    </AppLayout>
  );
};
const mapStateToProps = ({ user, tour }: IAppState) => {
  return {
    user: user.data,
    tourVisibal: tour.visible,
  };
};
export default connect(mapStateToProps)(Shortlist);

const renderDataList = (
  profile_id: number,
  data: Array<IShortlist>,
  reload: Function,
  setDrawerOpened: Function,
  setDrawerContent: any
) => {
  if (!data.length)
    return (
      <Result
        title={`No data available for shortlists or likes`}
        extra={
          <Button type="primary" key="console" size="middle">
            Go To Find
          </Button>
        }
      />
    );
  return (
    <Row gutter={[16, 16]}>
      {data?.map((item: IShortlist, index: number) => (
        <PJCard
          profile_id={profile_id}
          data={item}
          reload={reload}
          setDrawerOpened={setDrawerOpened}
          setDrawerContent={setDrawerContent}
          key={index}
        />
      ))}
    </Row>
  );
};

interface ICSProps {
  visible: boolean;
  setVisibal: Function;
  members?: Array<any>;
  content: any;
}

const ContactMenu = (props: ICSProps) => {
  return (
    <Drawer
      onClose={() => props.setVisibal(false)}
      title="Options"
      placement="bottom"
      closable={true}
      visible={props.visible}
    >
      {props.content}
    </Drawer>
  );
};

// const handleReject = async (id: number, type: PType, reload: Function) => {
//   const url = type === PType.shortlist ? `shortlists/${id}` : `likes/${id}`;
//   let show = message.loading('Action Proccess ...', 0);
//   await Axios.delete(url);
//   setTimeout(show, 0);
//   reload();
//   message.success('Removed Successfully');
// };

// const handleAccept = async (id: number, reload: Function) => {
//   let show = message.loading('Action Proccess ...', 0);
//   await Axios.put(`likes/${id}`, { status: 1 });
//   setTimeout(show, 0);
//   reload();
//   message.success('Profile Accepted');
// };

interface IOption {
  value: string;
  label: string;
}

export const CheckboxOptions = (value: Array<IOption>, user: IUser): Array<IOption> => {
  const data = [] as Array<IOption>;
  if (user) {
    data.push({ label: 'Liked by me', value: user.id?.toString() });
  }
  if (value?.length) {
    value?.map((i: any) =>
      data.push({ label: ` Liked by ${i.name ? i.name : i.sub_role}`, value: i.id?.toString() })
    );
  }
  return data;
};
