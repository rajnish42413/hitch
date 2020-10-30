import { IAction, SetUser } from '@redux/actions';
import { IAppState } from '@redux/reducers';
import React, { Dispatch, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IUser } from '../../schemas/IUser';
import Question from '../../components/Question';
import Loader from '../../components/loader/Loader';
import { IQuestion } from '../../schemas/IQuestion';
import AppLayout from '../../layouts/app';
import TopHeader from '../find/Header';
import './index.less';
import { useHistory } from 'react-router-dom';

function UserQuestions(props: any) {
  const [question, setQuestion] = useState({} as IQuestion);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { questions, user } = props;

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getQuestions = async () => {
    setLoading(true);
    if (user.role === 'profile' && user.sub_role === 'self') {
      const data = await questions;
      setQuestion(data[0]);
    } else {
      history.go(-1);
    }
    setLoading(false);
    return;
  };

  const handleNext = () => {
    setLoading(true);
    const len = questions?.length;
    let i: number = questions?.findIndex((q: any) => q.id === question.id);
    i = i + 1;
    i = i % len;
    setQuestion(questions[i]);
    setLoading(false);
  };

  return (
    <AppLayout>
      <TopHeader
        backHeader={true}
        rightMenu={
          <h3 className="insite-text">
            Insight{' '}
            <span className="text-red">
              {' '}
              #{questions ? questions?.findIndex((q: any) => q.id === question.id) + 1 : 0}
            </span>
          </h3>
        }
      />

      {!loading ? (
        question && (
          <Question
            question={question}
            onNext={handleNext}
            last={questions[questions?.length - 1]?.id === question.id}
          />
        )
      ) : (
        <Loader />
      )}
    </AppLayout>
  );
}

const mapStateToProps = ({ user, questions }: IAppState) => {
  return {
    user: user.data,
    questions: questions.data,
  };
};

const mapDispatchToProps = (dipatch: Dispatch<IAction>) => {
  return {
    setUser: (data: IUser) => dipatch(SetUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserQuestions);
