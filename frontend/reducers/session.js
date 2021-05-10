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
  let nextSignup;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { currentUser: action.user.id };
    case LOGOUT_CURRENT_USER:
      return _nullSession;
    case RECEIVE_USER_EMAIL:
      nextSignup = Object.assign(state.signup, action.email);
      return Object.assign({}, state, { signup: nextSignup });
    case RECEIVE_USER_NAME:
      nextSignup = Object.assign(state.signup, action.name);
      return Object.assign({}, state, { signup: nextSignup });
    case RECEIVE_USER_LOCATION:
      nextSignup = Object.assign(state.signup, action.location);
      return Object.assign({}, state, { signup: nextSignup });
    case RECEIVE_USER_JOB:
      nextSignup = Object.assign(state.signup, action.job);
      return Object.assign({}, state, { signup: nextSignup });
    case RECEIVE_USER_STUDENT:
      nextSignup = Object.assign(state.signup, action.student);
      return Object.assign({}, state, { signup: nextSignup });
    default:
      return state;
  }
};

export default sessionReducer;