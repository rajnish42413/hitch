import { combineReducers } from 'redux';
import UserReducer from './user';
import TourReducer from './tour';

const rootReducer = combineReducers({
  user: UserReducer,
  tour: TourReducer,
});

export type IAppState = ReturnType<typeof rootReducer>;

export default rootReducer;
