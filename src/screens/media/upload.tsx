import React, { Dispatch } from 'react';
import { PageHeader } from 'antd';
import AuthLayout from '../../layouts/auth';
import { useHistory, useLocation } from 'react-router-dom';
import ImageUploader from '../../components/Uploader';
import Loader from '../../components/loader/Loader';
import { IAppState } from '@redux/reducers';
import { IUser } from '../../schemas/IUser';
import { IAction, SetUser } from '@redux/actions';
import { connect } from 'react-redux';
import './media.scss';

const MediaUpload = (props: any) => {
  const history = useHistory();
  const location = useLocation();
  const { profile_id, image } = location.state;

  return (
    <AuthLayout>
      <PageHeader
        onBack={() => history.replace('/user/images')}
        title="Add Photo"
        style={{ padding: 0, margin: '1rem 0' }}
      />
      {profile_id ? (
        <ImageUploader
          profile_id={profile_id}
          image={image}
          setUser={props.setUser}
          onBack="/user/images"
          bottomButtomRedirect="/user/images"
        />
      ) : (
        <Loader />
      )}
    </AuthLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(MediaUpload);
