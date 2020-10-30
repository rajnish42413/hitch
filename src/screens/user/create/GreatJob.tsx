import React from 'react';
import { Button, Typography } from 'antd';
import AuthLayout from '../../../layouts/auth';
import { useHistory } from 'react-router-dom';
import AuthFooter from '../../../layouts/auth/footer';

const logo = require('../../../assets/icons/heart-group.svg');

const { Title } = Typography;

const GreatJob = (props: any) => {
  const history = useHistory();
  const onFinish = () => {
    history.push('/user/images');
  };

  // const UProps = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info: any) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <AuthLayout header={false}>
      <div>
        <img src={logo} alt="welcomeImage" height="auto" width="74%" />
        <Typography>
          <Title level={4}>
            Wooho! Great Job!
            <p style={{ marginTop: '1rem' }} className="text-muted">
              Now add photos and you are ready to find your dream partner
            </p>
          </Title>
        </Typography>
      </div>
      <AuthFooter>
        {/* <Upload {...UProps} multiple>
          <Button block className="btn-dark">
            Add Photos
          </Button>
        </Upload> */}

        <Button block onClick={onFinish} className="btn-dark">
          Add Photos
        </Button>
      </AuthFooter>
    </AuthLayout>
  );
};

export default GreatJob;
