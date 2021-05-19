import { RECEIVE_COMMENTS } from '../actions/comment';
import { RECEIVE_CONNECTION, RECEIVE_CONNECTIONS } from '../actions/connection';
import { RECEIVE_POSTS } from '../actions/post';
import { RECEIVE_CURRENT_USER, RECEIVE_USER } from '../actions/session';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { ...state, ...action.user };
    case RECEIVE_USER:
      return { ...state, ...action.user };
    case RECEIVE_POSTS:
      return { ...state, ...action.users };
    case RECEIVE_COMMENTS: 
      return { ...state, ...action.users };
    case RECEIVE_CONNECTIONS:
      return { ...state, ...action.users };
    case RECEIVE_CONNECTION:
      return { ...state, ...action.user };
    default:
      return state;
  }
};

export default usersReducer;