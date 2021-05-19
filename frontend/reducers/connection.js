import { RECEIVE_CONNECTION, REMOVE_CONNECTION } from '../actions/connection';

const connectionsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CONNECTION:
      const { id } = action.connection;
      return { ...state, [id]: action.connection };
    case REMOVE_CONNECTION:
      let nextState = { ...state };
      delete nextState[action.connectionId];
      return nextState;
    default:
      return state;
  }
};

export default connectionsReducer;