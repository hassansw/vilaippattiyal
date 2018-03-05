import { key, actionTypes } from './actions';
import { actionTypes as sharedActionTypes } from '../../../shared/actions';

export const selectors = {
  isLoggingIn: state => state[key].isLoggingIn,
  loggedIn: state => state[key].loggedIn
};

const initialState = {
  isLoggingIn: false,
  loggedIn: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, isLoggingIn: true };
    case sharedActionTypes.LOGIN_CHECK:
      return {
        ...state,
        isLoggingIn: false,
        loggedIn: sessionStorage.getItem('user') !== null
      };
    case actionTypes.LOGIN_SUCCESS:
      return { ...state, loggedIn: action.loggedIn, isLoggingIn: false };
    case actionTypes.LOGIN_FAILURE:
      return { ...state, isLoggingIn: false };
    default:
      return state;
  }
}
