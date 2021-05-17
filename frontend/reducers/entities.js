import { combineReducers } from 'redux';
import usersReducer from './users';
import postsReducer from './posts';
import commentsReducer from './comments';
import likesReducer from './likes';

const entitiesReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  likes: likesReducer
});

export default entitiesReducer;