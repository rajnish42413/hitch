import React, { useState } from 'react';
import { Form, Button, Typography, Radio, message } from 'antd';
import AuthFooter from '../layouts/auth/footer';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IQuestion, IQuestionOption } from '../schemas/IQuestion';

interface IProps {
  question: IQuestion;
  onNext: any;
  last: boolean;
}

export default function Question({ question, onNext, last = false }: IProps) {
  const [form] = Form.useForm();
  const history = useHistory();
  const [btnLoading, setBtnLoading] = useState(false);
  const [changed, setchanged] = useState(false);

  const onFinish = async (values: any) => {
    const { for_ideal, for_me } = values;
    if (changed) {
      handleSubmitAnswer(for_ideal, for_me);
      return;
    }
    if (last) {
      message.success('Thank you for your answers');
      history.go(-1);
      return;
    }
    onNext();
    return;
  };

  const handleSubmitAnswer = async (for_ideal: number, for_me: number) => {
    if (!(for_ideal && for_me)) return;
    setBtnLoading(true);
    let show = message.loading('Saving ...', 0);
    try {
      await Axios.post(`questions/${question?.id}/store-answer`, {
        option_for_ideal: for_ideal,
        option_for_me: for_me,
      });
      setTimeout(show, 0);
      setBtnLoading(false);
      // next
      if (last) {
        message.success('Thank you for your answers');
        history.go(-1);
        return;
      }
      onNext();
      return;
    } catch (error) {
      setTimeout(show, 0);
      if (error.response?.data?.errors) {
        const { educations } = error.response.data.errors;
        if (educations) message.warning(educations[0]);
      }
      setBtnLoading(false);
    }
  };

  return question ? (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
      onValuesChange={() => setchanged(true)}
      style={{ padding: '15px' }}
    >
      {renderScreen(question)}
      <AuthFooter>
        <Button htmlType="submit" block type="primary" loading={btnLoading}>
          Continue
        </Button>
      </AuthFooter>
    </Form>
  ) : (
    <> </>
  );
}

const renderScreen = (question: IQuestion) => {
  return (
    <>
      <Typography>
        <Typography.Title level={4}>{question?.content}</Typography.Title>
        <p>Your answer</p>
      </Typography>
      <Form.Item
        name="for_me"
        rules={[{ required: true, message: 'Select you answer' }]}
        initialValue={question.user_answer?.for_me}
      >
        <Radio.Group buttonStyle="solid" className="radio-btn-block">
          {question?.options?.map((option: IQuestionOption) => (
            <Radio.Button value={option.id} key={option.id}>
              {option.option}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Typography>
        <Typography.Title level={4}>{question?.content}</Typography.Title>
        <p>Answers you’ll accept</p>
      </Typography>
      <Form.Item
        name="for_ideal"
        rules={[{ required: true, message: 'Select answers you’ll accept' }]}
        initialValue={question.user_answer?.for_ideal}
      >
        <Radio.Group buttonStyle="solid" className="radio-btn-block">
          {question?.options?.map((option: IQuestionOption) => (
            <Radio.Button value={option.id} key={option.id}>
              {option.option}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
    </>
  );
};
