import React, { useEffect, useState } from 'react';
import { IAppState } from '@redux/reducers';
import AppLayout from '../../layouts/app';
import TopHeader from '../find/Header';
import { connect } from 'react-redux';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { Col, Row, Spin, Radio, Divider, Typography } from 'antd';
import Axios from 'axios';
import { IQA, IQAMatch } from '../../schemas/IQuestion';
import { ReactComponent as JodiHeartSvg } from '../../assets/icons/Heart_Red.svg';
import './index.less';
import Icon from '@ant-design/icons';

function ProfileMatch(props: any) {
  const history = useHistory();
  const { state } = useLocation();
  const match_profile = state;
  const { profile } = props.user;
  const { id }: any = useParams();
  const match_profile_id = id;

  const matched_profile_thumb = match_profile?.media[0]?.thumb;
  const profile_thumb = profile?.media[0]?.thumb;

  const [loading, setloading] = useState(false);
  const [statics, setstatics] = useState({} as IQAMatch);
  const [tabType, setTabType] = useState('agree');
  const [questions, setQuestions] = useState([] as Array<IQA>);
  const [filterLoading, setfilterLoading] = useState(false);

  const getMatchProfile = async () => {
    setloading(true);
    const { data } = await Axios.get(`profile/${match_profile_id}/match-statics`);
    filterQuestion('agree', data.questions);
    setstatics(data);
    setloading(false);
  };

  useEffect(() => {
    if (!(match_profile_id && match_profile)) {
      history.go(-1);
      return;
    }
    getMatchProfile();
    // eslint-disable-next-line
  }, []);

  const filterQuestion = (type: 'agree' | 'disagree' | 'find-out', data?: Array<IQA>) => {
    setfilterLoading(true);
    const quesions = data ? data : statics?.questions;
    const filtered = quesions?.filter((o: IQA) => {
      if (type === 'agree') return o.matched;
      if (type === 'disagree') return !o.matched;
      if (type === 'find-out') return !o.matched_profil_answer;
    });
    setQuestions(filtered);
    setTimeout(() => {
      setfilterLoading(false);
    }, 500);
  };

  const handleChange = (e: any) => {
    setTabType(e.target.value);
    filterQuestion(e.target.value);
  };

  return (
    <AppLayout>
      <TopHeader backHeader={true} backHeadertitle={' See Your PakkiJodi'} />
      <div className="m-1">
        <Spin spinning={loading}>
          <Row align="middle" className="mt-1">
            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ textAlign: 'center' }}>
              <div className="matched-flex-box">
                <div
                  className="profile-img"
                  style={{ backgroundImage: `url(${profile_thumb})` }}
                ></div>
                <div
                  className="profile-img"
                  style={{
                    backgroundImage: `url(${matched_profile_thumb})`,
                    transform: 'translateX(-4px)',
                  }}
                ></div>
              </div>
              <p style={{ fontWeight: 'bold' }}>
                <Icon
                  component={JodiHeartSvg}
                  style={{ fontSize: '32px', position: 'relative', top: '10px' }}
                />{' '}
                {profile?.name} {'&'} {match_profile?.name}
              </p>
              <button type="button" className="mt-1 percent-box">
                {' '}
                {statics.matched_percentage} %
              </button>
            </Col>
          </Row>
          <br />
          <Radio.Group
            className="statics-card"
            size="large"
            buttonStyle="solid"
            defaultValue={tabType}
            onChange={handleChange}
          >
            <Radio.Button value="agree">
              {statics.matched_answer} <br />
              AGREE
            </Radio.Button>
            <Radio.Button value="disagree">
              {statics.not_matched_answer}
              <br /> DISAGREE
            </Radio.Button>
            <Radio.Button value="find-out">
              {statics.not_answer_by_matched_profile} <br />
              FIND OUT
            </Radio.Button>
          </Radio.Group>
        </Spin>
        <Divider />
        <Spin spinning={filterLoading}>
          {questions?.map((question, i) => (
            <div>
              <Typography.Title level={4}>{`${i + 1}. ${question?.content}`}</Typography.Title>
              <div className="answer-box">
                <img src={matched_profile_thumb} alt="her_profile_iamge" height="50" width="50" />
                <p>
                  {question.options?.find((o) => o.id === question.matched_profil_answer?.for_ideal)
                    ?.option || 'not available'}
                </p>
              </div>
              <div className="answer-box">
                <img src={profile_thumb} alt="her_profile_iamge" height="50" width="50" />
                <p>
                  {question.options?.find((o) => o.id === question.profile_answer?.for_ideal)
                    ?.option || 'not available'}
                </p>
              </div>
            </div>
          ))}
        </Spin>
      </div>
    </AppLayout>
  );
}

const mapStateToProps = ({ user }: IAppState) => {
  return {
    user: user.data,
  };
};
export default connect(mapStateToProps)(ProfileMatch);
