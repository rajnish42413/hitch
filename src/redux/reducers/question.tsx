import { IAction } from '@redux/actions';
import { AppEvents } from '@redux/actions/events';
import { IQuestion } from '../../schemas/IQuestion.d';
import * as local from '@utils/userAuth';

interface IState {
  data: Array<IQuestion>;
}

export const initialState: IState = {
  data: JSON.parse(local.getQuestion()),
};

export const reducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case AppEvents.SET_QUESTIONANSWER: {
      local.storeQuestion(action.payload);
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
