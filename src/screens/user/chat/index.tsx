import React, { useEffect, useRef, useState } from 'react';
import { Input, Form, Button, message } from 'antd';
import Pusher from 'pusher-js';
import './chat.less';
import Axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { IAppState } from '@redux/reducers';

function UserChat(props: any) {
  const { user } = props;
  const [chats, setChats] = useState([] as Array<any>);
  const to_user = props.to_user;
  const [form] = Form.useForm();
  const messagesEndRef = useRef(null);
  const { state } = useLocation();
  const history = useHistory();
  const profile = state;

  const scrollToBottom = () => {};

  useEffect(() => {
    handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handle = () => {
    if (!profile) {
      history.replace('/shortlisted');
      message.warning('UnAuthorized Access');
      return;
    }

    Pusher.logToConsole = true;
    var pusher = new Pusher('661e582b3b8b48fb5198', {
      cluster: 'ap2',
      forceTLS: true,
    });

    var channel = pusher.subscribe(`pj-private-chat.${user.id}`);
    channel.bind('message-posted', function (data: any) {
      setChats([...chats, data]);
    });

    const fetchMessages = async () => {
      const { data } = await Axios(`messages/${to_user}`);
      setChats(data);
    };
    fetchMessages();
    scrollToBottom();
  };

  const handleSendMSG = async (value: any) => {
    const { data } = await Axios.post(`messages`, { message: value.message, to_user: to_user });
    form.resetFields();
    setChats([...chats, data]);
  };

  return (
    <>
      <section className="chat-container">
        <div className="chat-log" ref={messagesEndRef}>
          {chats &&
            chats.map((chat: any, i: number) => (
              <div
                key={i}
                className={
                  chat.from_user === user.id ? 'chat-message' : 'chat-message--right chat-message'
                }
              >
                <span className="chat-message__avatar-frame">
                  <img
                    src="https://api.adorable.io/avatars/45/abott@adorable"
                    alt="avatar"
                    className="chat-message__avatar"
                  />
                </span>
                <p className="chat-message__text">{chat.content}</p>
              </div>
            ))}
          {/* <div className="chat-message">
              <span className="chat-message__avatar-frame">
                <img
                  src="https://api.adorable.io/avatars/45/abott@adorable"
                  alt="avatar"
                  className="chat-message__avatar"
                />
              </span>
              <p className="chat-message__text">Hi!</p>
            </div>

            <div className="chat-message--right chat-message ">
              <span className="chat-message__avatar-frame right">
                <img
                  src="https://api.adorable.io/avatars/45/abott@adorable"
                  alt="avatar"
                  className="chat-message__avatar"
                />
              </span>
              <p className="chat-message__text">
                Some text so we can see this container Some text so we can see this container Some
                text so we can see this container
              </p>
            </div>

            <div className="chat-message--right chat-message ">
              <p className="chat-message__text">
                Some text so we can see this container Some text so we can see this container Some
                text so we can see this container
              </p>
            </div> */}
        </div>
      </section>
      <div className="chat-input-area">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={handleSendMSG}
          size="large"
          form={form}
          layout="inline"
        >
          <Form.Item
            name="message"
            rules={[{ required: true }]}
            style={{ width: 'calc(100% - 86px', marginRight: 0 }}
          >
            <Input
              placeholder="enter some message here"
              size="middle"
              allowClear={true}
              autoFocus={true}
            />
          </Form.Item>

          <Form.Item
            name="message"
            rules={[{ required: true }]}
            style={{ width: '70px', marginLeft: 0, padding: 0 }}
          >
            <Button htmlType="submit" type="primary">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};

export default connect(mapStateToProps)(UserChat);
