import { combineReducers } from 'redux';
import usersReducer from './users';
import postsReducer from './posts';

const entitiesReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer
});

export default entitiesReducer;