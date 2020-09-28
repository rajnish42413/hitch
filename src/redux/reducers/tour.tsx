import { IAction } from '@redux/actions';
import { AppEvents } from '@redux/actions/events';

interface IState {
  visible: boolean;
}

export const initialState: IState = {
  visible: false,
};

export const reducer = (state: IState = initialState, action: IAction): IState => {
  switch (action.type) {
    case AppEvents.SET_TOUR_VISIBILITY: {
      return { ...state, visible: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
