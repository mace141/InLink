import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import errorsReducer from './errors';
import sessionReducer from './session';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  session: sessionReducer,
  errors: errorsReducer
});

export default rootReducer;