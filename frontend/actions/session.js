import { RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS } from '../reducers/session_errors';
import * as SessionAPI from '../util/session_api';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_USER = 'RECEIVE_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

export const RECEIVE_USER_EMAIL = 'RECEIVE_USER_EMAIL';
export const RECEIVE_USER_NAME = 'RECEIVE_USER_NAME';
export const RECEIVE_USER_LOCATION = 'RECEIVE_USER_LOCATION';
export const RECEIVE_USER_JOB = 'RECEIVE_USER_JOB';
export const RECEIVE_USER_STUDENT = 'RECEIVE_USER_STUDENT';

export const receiveCurrentUser = payload => ({
  type: RECEIVE_CURRENT_USER,
  user: payload.user,
  experiences: payload.experiences,
  educations: payload.educations
});

const receiveUser = payload => ({
  type: RECEIVE_USER,
  user: payload.user,
  experiences: payload.experiences,
  educations: payload.educations
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
});

export const receiveUserEmail = email => ({
  type: RECEIVE_USER_EMAIL,
  email
});

export const receiveUserName = name => ({
  type: RECEIVE_USER_NAME,
  name
});

export const receiveUserLocation = location => ({
  type: RECEIVE_USER_LOCATION,
  location
});

export const receiveUserJob = job => ({
  type: RECEIVE_USER_JOB,
  job
});

export const receiveUserStudent = student => ({
  type: RECEIVE_USER_STUDENT,
  student
});

const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const fetchUser = userId => dispatch => (
  SessionAPI.fetchUser(userId).then(
    user => dispatch(receiveUser(user))
  )
);

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
})

export const createUser = user => dispatch => (
  SessionAPI.createUser(user).then(
    user => dispatch(receiveCurrentUser(user)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON))
  )
);

export const updateUser = user => dispatch => (
  SessionAPI.updateUser(user).then(
    user => dispatch(receiveUser(user))
  )
);

export const updateUserImg = (formData, id) => dispatch => (
  SessionAPI.updateUserImg(formData, id).then(
    user => dispatch(receiveUser(user))
  )
)

export const loginUser = user => dispatch => (
  SessionAPI.loginUser(user).then(
    user => dispatch(receiveCurrentUser(user)),
    errors => dispatch(receiveSessionErrors(errors.responseJSON))
  )
);

export const logoutUser = () => dispatch => (
  SessionAPI.logoutUser().then(
    () => dispatch(logoutCurrentUser()),
    errors => dispatch(receiveSessionErrors(errors.responseJSON))
  )
);
