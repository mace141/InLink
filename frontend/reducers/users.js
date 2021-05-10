import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  const { id } = action.user;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [id]: action.user });
    case LOGOUT_CURRENT_USER:
      let nextState = { ...state };
      delete nextState[id];
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;