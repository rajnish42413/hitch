import React, { Dispatch, useState } from 'react';
import { Layout, Switch } from 'antd';
import AppLayout from '../../../layouts/app';
import UserProfileDetail from '../../../components/UserProfileDetail';
import EditProfile from './edit';
import Loader from '../../../components/loader/Loader';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';
import { IAction, SetUser } from '@redux/actions';
import TopHeader from '../../../screens/find/Header';
import { IUser } from '../../../schemas/IUser';

const { Content } = Layout;
enum PType {
  'edit',
  'detail',
}
const UserDetail = (props: any) => {
  const [pageType, setPageType] = useState(PType.detail);
  const [dis, setDisbale] = useState(false);
  const { user } = props;

  return (
    <AppLayout>
      <TopHeader
        backHeader={true}
        backHeadertitle={user ? user.name : 'Profile Detail'}
        backTo="/profile"
      />
      <Content>
        <Switch
          checkedChildren="View"
          unCheckedChildren="Edit"
          defaultChecked
          style={{ display: 'block', margin: '1rem' }}
          onChange={() => setPageType(pageType === PType.edit ? PType.detail : PType.edit)}
          disabled={dis}
        />
        {user ? (
          pageType === PType.detail ? (
            user && <UserProfileDetail profile={user.profile} />
          ) : (
            user && (
              <EditProfile
                user={user && user}
                updateUser={props.setUser}
                setDisable={(data: boolean) => setDisbale(data)}
              />
            )
          )
        ) : (
          <Loader />
        )}
      </Content>
    </AppLayout>
  );
};

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setUser: (data: IUser) => dipatch(SetUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
