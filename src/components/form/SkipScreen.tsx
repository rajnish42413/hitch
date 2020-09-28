import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import { useHistory } from 'react-router-dom';

interface IPorps {
  to: string;
}
export default function SkipScreen({ to }: IPorps) {
  const history = useHistory();
  const handleSkip = () => {
    Modal.confirm({
      title: 'Do you want to skip registration?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <p>
          Your profile will not get activated without full registration .<br /> To complete
          registration:
          <br />
          Profile (Footer)/ Profile / Edit
        </p>
      ),
      onOk() {
        history.replace(to);
      },
    });
  };
  return (
    <Button type="link" htmlType={'button'} onClick={handleSkip}>
      Skip
    </Button>
  );
}
