import { combineReducers } from 'redux';
import UserReducer from './user';
import TourReducer from './tour';
import QuestionReducer from './question';

const rootReducer = combineReducers({
  user: UserReducer,
  tour: TourReducer,
  questions: QuestionReducer,
});

export type IAppState = ReturnType<typeof rootReducer>;

export default rootReducer;
