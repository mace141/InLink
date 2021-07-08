import { RECEIVE_CONNECTION, RECEIVE_CONNECTIONS, REMOVE_CONNECTION } from '../actions/connection';
import { LOGOUT_CURRENT_USER } from '../actions/session';

const connectionsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CONNECTIONS:
      return { ...state, ...action.connections };
    case RECEIVE_CONNECTION:
      return { ...state, ...action.connection };
    case REMOVE_CONNECTION:
      let nextState = { ...state };
      delete nextState[action.connectionId];
      return nextState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default connectionsReducer;