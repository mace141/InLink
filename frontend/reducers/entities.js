import { combineReducers } from 'redux';
import usersReducer from './users';
import postsReducer from './posts';
import commentsReducer from './comments';
import likesReducer from './likes';
import educationsReducer from './educations';
import experiencesReducer from './experiences';
import connectionsReducer from './connection';

const entitiesReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  likes: likesReducer,
  educations: educationsReducer,
  experiences: experiencesReducer,
  connections: connectionsReducer
});

export default entitiesReducer;