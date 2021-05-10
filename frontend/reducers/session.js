import { 
  RECEIVE_CURRENT_USER, 
  LOGOUT_CURRENT_USER,
  RECEIVE_USER_EMAIL, 
  RECEIVE_USER_NAME,
  RECEIVE_USER_LOCATION,
  RECEIVE_USER_JOB,
  RECEIVE_USER_STUDENT 
} from '../actions/session';

const _nullSession = {
  currentUser: null,
  signup: {}
};

const sessionReducer = (state = _nullSession, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.user.id };
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    case RECEIVE_USER_EMAIL:
      return Object.assign({}, state, { signup: action.email });
    case RECEIVE_USER_NAME:
      return Object.assign({}, state, { signup: action.name });
    case RECEIVE_USER_LOCATION:
      return Object.assign({}, state, { signup: action.location });
    case RECEIVE_USER_JOB:
      return Object.assign({}, state, { signup: action.job });
    case RECEIVE_USER_STUDENT:
      return Object.assign({}, state, { signup: action.email });
    default:
      return state;
  }
};

export default sessionReducer;