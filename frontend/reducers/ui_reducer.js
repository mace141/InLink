import { combineReducers } from 'redux';
import filterReducer from './filter';
import modalReducer from './modal';

const uiReducer = combineReducers({
  modal: modalReducer,
  filter: filterReducer
});

export default uiReducer;