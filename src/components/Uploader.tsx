import React, { useEffect, useState } from 'react';
import { Typography, Button, Card, Input, message, Upload, Drawer, Spin } from 'antd';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { APP_URL, colors } from '@constants/general';
import ImgCrop from 'antd-img-crop';
import * as authToken from '@utils/userAuth';
import { IImage } from '../schemas/IProfile';
import Axios from 'axios';
import AuthFooter from '../layouts/auth/footer';
import PromptModal from './PromptModal';

interface IProps {
  bottomButtomRedirect?: string;
  profile_id: number;
  image?: IImage;
  setUser: any;
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpdateCaption = async () => {
    const id = image.id;
    if (!id) return id;
    const { data } = await Axios.put(`profile/images/${id}/caption`, { caption: caption });
    setChanged(false);
    props.setUser(data);
    message.success('Caption Updated');
    history.go(-1);
    return;
  };

  const redirectTo = () => {
    if (props.bottomButtomRedirect) {
      history.push(props.bottomButtomRedirect);
      return;
    }
    history.go(-1);
  };

  const renderImage = (image?: IImage) => {
    if (!image) return <PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} />;
    return image?.medium ? (
      <Spin tip="Loading..." spinning={loading}>
        <img
          alt={image?.caption}
          src={image?.medium}
          className="preview-image-card"
          onClick={() => setUploadOption(true)}
        />
      </Spin>
    ) : (
      <Spin tip="Loading..." spinning={loading}>
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
    if (image?.small) setImage(image);
    if (data) props.setUser(data);
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
        <Typography.Paragraph>
          Tap a photo to add a caption and make your profile stand out even more{' '}
        </Typography.Paragraph>
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
          disableLoading={() => setLoading(false)}
          disableModal={() => setUploadOption(false)}
        />
      }
      <PromptModal changed={changed} onOk={handleUpdateCaption} />
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
  disableLoading: any;
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
        disableLoading={props.disableLoading}
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
  disableLoading: any;
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
        IUploadProps.disableLoading();
        if (fileInfo.response?.errors) {
          const { caption, image } = fileInfo.response?.errors;
          if (image) message.warning(image?.[0]);
          if (caption) message.warning(caption?.[0]);
        } else {
          if (fileInfo.response?.message) {
            message.error(`${fileInfo.response?.message}`);
          }
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
  const handleCrop = (): boolean => {
    setTimeout(() => {
      return true;
    }, 500);
    console.log(true);
    return true;
  };
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <ImgCrop grid beforeCrop={handleCrop} quality={0.7}>
        <Upload accept=".jpg, .jpeg, .png" {...props}>
          <Button type="text" block className="btn-dark">
            From Media
          </Button>
        </Upload>
      </ImgCrop>
    </div>
  );
};
