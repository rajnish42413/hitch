import React from 'react';
import NavigationPrompt from 'react-router-navigation-prompt';
import { Typography, Button, Modal } from 'antd';

interface IProps {
  changed: boolean;
  onOk: VoidFunction;
}

export default function PromptModal({ changed, onOk }: IProps) {
  return (
    <NavigationPrompt when={changed}>
      {({ isActive, onCancel, onConfirm }) => {
        if (isActive) {
          return (
            <Modal
              visible={changed}
              title={null}
              // cancelText="Save"
              // okButtonProps={{ type: 'default' }}
              // cancelButtonProps={{ type: 'primary' }}
              // okText="Go"
              // onCancel={handleUpdateCaption}
              // onOk={onConfirm}
              centered
              footer={null}
              closable={false}
            >
              <Typography>
                <Typography.Title level={4}>Close without saving</Typography.Title>
                <Typography.Paragraph>
                  You have unsaved changes. Are you sure you want to leave this page without saving?
                </Typography.Paragraph>
                <Button className="btn-dark mt-1" htmlType="button" block onClick={() => onOk()}>
                  Save
                </Button>

                <Button className="btn-dark-text mt-1" type="text" onClick={onConfirm}>
                  Go without save
                </Button>
              </Typography>
            </Modal>
          );
        }
      }}
    </NavigationPrompt>
  );
}
