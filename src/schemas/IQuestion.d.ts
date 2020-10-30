export interface IQuestion {
  id: number;
  content: string;
  user_answer?: IUseranswer;
  options: Option[];
}

export interface IQuestionOption {
  id: number;
  option: string;
  question_id: number;
}

export interface IUseranswer {
  id: number;
  for_me: number;
  for_ideal: number;
}



export interface IQAMatch{
  questions: IQA[];
  matched_answer: number;
  matched_percentage: number;
  not_answer_by_matched_profile: number;
  not_answer_by_profile: number;
  not_matched_answer: number;
  total_questions: number;
}

export interface IQA {
  id: number;
  content: string;
  profile_answer?: IProfileAnswer;
  matched_profil_answer?: IProfileAnswer;
  matched: boolean;
  options: IQuestionOption[];
}

interface IProfileAnswer {
  id: number;
  for_me: number;
  for_ideal: number;
}