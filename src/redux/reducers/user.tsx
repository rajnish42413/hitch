import { IUser } from '../../schemas/IUser';
import { IAction } from '@redux/actions';
import { AppEvents } from '@redux/actions/events';
import * as local from '@utils/userAuth';

interface IState {
  data: IUser;
}

export const initialState: IState = {
  data: JSON.parse(local.getUser()),
};

export const reducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case AppEvents.SET_USER: {
      local.storeUser(action.payload);
      return { ...state, data: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
