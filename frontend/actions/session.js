import * as SessionAPI from '../util/session_api';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  user
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const createUser = user => dispatch => (
  SessionAPI.createUser(user).then(user => dispatch(receiveCurrentUser(user)))
);

export const loginUser = user => dispatch => (
  SessionAPI.loginUser(user).then(user => dispatch(receiveCurrentUser(user)))
);

export const logoutUser = () => dispatch => (
  SessionAPI.logoutUser().then(() => dispatch(logoutCurrentUser()))
);
