import { RECEIVE_CURRENT_USER } from '../actions/session';

export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return [];
    case CLEAR_SESSION_ERRORS:
      return [];
    default:
      return state;
  }
};

export default sessionErrorsReducer;