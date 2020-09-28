import React, { useState } from 'react';
import { Typography, Button, Card, Input, Modal, message, Upload, Drawer, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { APP_URL, colors } from '@constants/general';
import ImgCrop from 'antd-img-crop';
import * as authToken from '@utils/userAuth';
import { IImage } from '../schemas/IProfile';
import NavigationPrompt from 'react-router-navigation-prompt';
import Axios from 'axios';
import AuthFooter from '../layouts/auth/footer';

const { Paragraph } = Typography;

interface IProps {
  bottomButtomRedirect?: string;
  profile_id: number;
  image?: IImage;
  setUser: any;
  onBack: string;
}

const ImageUploader = (props: IProps) => {
  const { profile_id } = props;
  const history = useHistory();
  const [uploadOption, setUploadOption] = useState(false);
  const [image, setImage] = useState(props?.image ? props.image : ({} as IImage));
  const [caption, setCaption] = useState(image?.caption);
  const [changed, setChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCaption = (e: any) => {
    setCaption(e.target.value);
    setChanged(true);
  };

  const handleUpdateCaption = async () => {
    const id = image.id;
    if (!id) return id;
    const { data } = await Axios.put(`profile/images/${id}/caption`, { caption: caption });
    setChanged(false);
    props.setUser(data);
    message.success('Caption Updated');
    console.log(props.onBack);
    if (props.onBack) history.push(props.onBack);
    else redirectTo();
    return;
  };

  const redirectTo = () => {
    if (props.bottomButtomRedirect) {
      history.push(props.bottomButtomRedirect);
      return;
    }
  };

  const renderImage = (image?: IImage) => {
    if (!image) return <PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} />;
    return image?.small ? (
      <Spin tip="Uploading..." spinning={loading}>
        <img
          alt={image?.caption}
          src={image?.small}
          className="preview-image-card"
          onClick={() => setUploadOption(true)}
        />
      </Spin>
    ) : (
      <Spin tip="Uploading..." spinning={loading}>
        <Button
          type="text"
          style={{ border: '0.5px dashed #C1C1C1' }}
          onClick={() => setUploadOption(true)}
          className="preview-image-card"
        >
          <PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} />
        </Button>
      </Spin>
    );
  };

  const handleUpload = (response: any) => {
    setLoading(true);
    const { image, data } = response;
    setImage(image);
    props.setUser(data);
    setUploadOption(false);
    setLoading(false);
  };

  return (
    <>
      <Card style={{ width: '100%' }} cover={renderImage(image)} className="upload-card">
        <Input
          value={caption}
          name="caption"
          size="large"
          style={{ border: 'none' }}
          placeholder="Add Caption here"
          onChange={handleCaption}
          maxLength={50}
        />
      </Card>

      <Typography className="image-upload-hint">
        <Paragraph>
          Tap a photo to add a caption and make your profile stand out even more{' '}
        </Paragraph>
      </Typography>
      <br />
      {props.bottomButtomRedirect && (
        <AuthFooter>
          <Button block onClick={redirectTo} className="btn-dark">
            Good to go!
          </Button>
        </AuthFooter>
      )}
      {
        <RenderUploadOptions
          visible={uploadOption}
          profile_id={profile_id}
          caption={caption}
          updateUser={handleUpload}
          image={props.image}
          disable={() => {
            setUploadOption(false);
            setLoading(true);
          }}
          disableModal={() => setUploadOption(false)}
        />
      }
      <NavigationPrompt when={changed}>
        {({ isActive, onCancel, onConfirm }) => {
          if (isActive) {
            return (
              <Modal
                visible={changed}
                title="Close without saving"
                cancelText="Save"
                okButtonProps={{ type: 'default' }}
                cancelButtonProps={{ type: 'primary' }}
                okText="Go"
                onCancel={handleUpdateCaption}
                onOk={onConfirm}
                centered
                closable={false}
              >
                <p>
                  You have unsaved changes. Are you sure you want to leave this page without saving?
                </p>
              </Modal>
            );
          }
        }}
      </NavigationPrompt>
    </>
  );
};

export default ImageUploader;

const RenderUploadOptions = (props: {
  visible: boolean;
  caption?: string;
  profile_id: number;
  updateUser: any;
  image?: IImage;
  disable: any;
  disableModal: any;
}) => {
  return (
    <Drawer
      visible={props.visible}
      placement="bottom"
      height={150}
      closable={true}
      onClose={props.disableModal}
    >
      <UploadButton
        caption={props?.caption}
        profile_id={props.profile_id}
        updateUser={props.updateUser}
        image={props.image}
        disable={props.disable}
      />
    </Drawer>
  );
};

interface IUploadButton {
  caption?: string;
  profile_id: number;
  updateUser: any;
  image?: IImage;
  disable: any;
}

const UploadButton = (IUploadProps: IUploadButton) => {
  const profile_id = IUploadProps.profile_id;
  const token = authToken.get();
  const props = {
    name: 'image',
    action: `${APP_URL}profiles/${profile_id}/add-image`,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    data: {
      caption: IUploadProps.caption ? IUploadProps.caption : '',
      delete_media: IUploadProps?.image?.id,
    },
    multiple: false,
    onChange(info: any) {
      const fileInfo = info.file;
      IUploadProps.disable();
      if (info.file.status !== 'uploading') {
        IUploadProps.disable();
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        IUploadProps.updateUser(fileInfo.response);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        if (fileInfo.response?.status === 'fail') {
          message.error(`${fileInfo.response.message}`);
        }
        if (fileInfo.response?.errors) {
          const { caption, image } = fileInfo.response?.errors;
          if (image) message.warning(image?.[0]);
          if (caption) message.warning(caption?.[0]);
        }
      }
    },
    progress: {
      strokeColor: {
        '0%': '##fff',
        '100%': '#fff',
      },
      strokeWidth: 3,
      format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  return (
    <ImgCrop grid>
      <Upload accept=".jpg, .jpeg, .png" {...props}>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Button type="primary" block size="large" style={{ width: '50%' }}>
            From Media
          </Button>
        </div>
      </Upload>
    </ImgCrop>
  );
};
