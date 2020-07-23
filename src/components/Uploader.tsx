import React, { useState } from 'react';
import { Typography, Button, PageHeader, Card, Input, Modal, message, Upload } from 'antd';
import AuthLayout from '../layouts/auth';
import AppLayout from '../layouts/app';
import { RightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { colors } from '@constants/general';

const { Paragraph } = Typography;

interface IImage{
  url: string;
  caption: string ;
  id:number
}
enum ILayout {app,auth};

interface IProps{
    layout?:ILayout;
    bottomButtomRedirect?:string;
    backTo:string;
    title:string;
}

const ImageUploader = (props: IProps) => {
  const history = useHistory();
  const [uploadOption ,setUploadOption] = useState(false);
  const [image,setImage] = useState({} as IImage);

  const renderImage =(image?:IImage)=>{
    if(!image) return  <PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} />
    return image?.url ? <img alt={image?.caption} src={image?.url} className="preview-image-card" /> 
         :  
         <Button
          type="text"
          style={{padding:"6rem 0" ,border:'0.5px dashed #C1C1C1'}}
          onClick={()=>setUploadOption(true)}
         ><PlusOutlined style={{ fontSize: '2rem', color: colors['mutted-color'] }} /></Button>
  }

  const goToBack=()=>{
    if(props.backTo){
      history.push(props.backTo);
    }
  }

  const redirectTo=()=>{
    if(props.bottomButtomRedirect){
      history.push(props.bottomButtomRedirect);
    }
  }

  return (
    <RenderLayout >
      <PageHeader
        onBack={goToBack}
        title={props.title}
        style={{ padding: 0, marginBottom: '1rem' }}
      />

      <Card
        hoverable
        style={{ width: '100%' }}
        cover={renderImage(image)}
      >
        <Input value={image.caption ?? "Caption here"} name="caption" size="large" style={{ border: 'none' }} />
      </Card>

      <Typography className="image-upload-hint">
        <Paragraph>
          Tap a photo to add a caption and make your profile stand out even more{' '}
        </Paragraph>
      </Typography>
      <br />
      {props.bottomButtomRedirect && <Button
        type="primary"
        shape="circle"
        size="large"
        icon={<RightOutlined />}
        style={{ float: 'right' }}
        htmlType="submit"
        onClick={redirectTo}
      />}
      {<RenderUploadOptions 
      visible={uploadOption} 
      disable={()=>setUploadOption(false)}
      renderImage={(image:IImage)=>{
        setImage(image);
      }}
      />}
     </RenderLayout>
  );
};

export default ImageUploader;



const RenderUploadOptions = (props:{ visible:boolean;disable:any;renderImage:any}) =>{
  return (
  <Modal
    visible={props.visible}
    onCancel={props.disable}
    title=""
    footer={null}
  >
    <div className="mt-4" />
    <Button block size="large">From Instagram </Button> <div className="mt-1" />
    <Button block size="large">From Instagram </Button> <div className="mt-1" />
    
    <UploadButton 
      renderImage={(image:IImage) => props.renderImage(image)} 
      disable={props.disable} 
    />

    <div className="mt-4" />
  </Modal>
  );
}


const UploadButton =(IUploadProps:any)=>{
  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    multiple: false,
    onChange(info:any) {
      const fileInfo =info.file;
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        IUploadProps.renderImage({caption:fileInfo.response.name ,id:fileInfo.uid,url:fileInfo.response.url});
        IUploadProps.disable();
        
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }
  return (
    <Upload {...props} accept=".jpg, .jpeg, .png" style={{width:"100%"}}>
      <Button type="primary" block size="large">From Media</Button>
    </Upload>
  )
};

const  RenderLayout = (props:any) =>{
  if(props.layout === ILayout.app) return <AppLayout>{props.children}</AppLayout>
  return <AuthLayout>{props.children}</AuthLayout>
}