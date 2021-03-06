import { actionTypes } from './actions';
import { CHANGE_THEME, LOGIN_SUCCESS } from '../../shared/actions';

import themes, { defaultTheme } from '../../../themes';
import { DEFAILT_THEME } from '../../../utils/constants';

export const key = 'authorized';

const isLoading = state => state[key].isLoading;
const theme = state => {
  const selectedTheme = themes.filter(t => t.id === state[key].theme)[0];
  return (selectedTheme && selectedTheme.source) || defaultTheme;
};
const user = state => state[key].user;

export const selectors = { isLoading, theme, user };

const initialState = {
  isLoading: true,
  theme: localStorage.getItem('theme') || DEFAILT_THEME,
  user: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.APP_LOADING:
      return { ...state, isLoading: true };
    case CHANGE_THEME:
      return { ...state, theme: action.theme };
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload.user };
    default:
      return { ...state, isLoading: false };
  }
}
