import React, { Dispatch } from 'react';
import ImageUploader from '../../../components/Uploader';
import AppLayout from '../../../layouts/app';
import { Layout } from 'antd';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { IUser } from '../../../schemas/IUser';
import { IAction, SetUser } from '@redux/actions';
import { IAppState } from '@redux/reducers';
import TopHeader from '../../../screens/find/Header';

function UserImageManage(props: any) {
  //console.log(props.match.params.id);
  const location = useLocation();
  const { profile_id, image } = location.state;
  return (
    <AppLayout>
      <TopHeader backTo="/profile" backHeader={true} />
      <Layout.Content style={{ margin: '20px' }}>
        {profile_id && (
          <ImageUploader
            profile_id={profile_id}
            image={image}
            setUser={props.setUser}
            onBack="/profile"
          />
        )}
      </Layout.Content>
    </AppLayout>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(UserImageManage);
