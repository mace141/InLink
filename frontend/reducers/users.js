import { RECEIVE_CURRENT_USER, RECEIVE_USER } from '../actions/session';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let id;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      id = action.user.id;
      return Object.assign({}, state, { [id]: action.user });
    case RECEIVE_USER:
      id = action.user.id;
      return Object.assign({}, state, { [id]: action.user });
    default:
      return state;
  }
};

export default usersReducer;