import { combineReducers } from 'redux';
import usersReducer from './users';
import postsReducer from './posts';
import commentsReducer from './comments';

const entitiesReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer
});

export default entitiesReducer;