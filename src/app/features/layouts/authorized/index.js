import { connect } from 'react-redux';

import { selectors as authorizeddSelector } from './reducer';
import { logout } from '../../shared/actions';

import Layout from './component';

const enhance = connect(
  (state, ...rest) => ({
    isLoading: authorizeddSelector.isLoading(state),
    theme: authorizeddSelector.theme(state),
    user: authorizeddSelector.user(state),
    ...rest
  }),
  {
    logout
  }
);

export default enhance(Layout);
