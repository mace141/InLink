import { RECEIVE_LIKES, RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like';
import { LOGOUT_CURRENT_USER } from '../actions/session';

const likesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_LIKES:
      return { ...state, ...action.likes };
    case RECEIVE_LIKE:
      const { id } = action.like;
      return { ...state, [id]: action.like };
    case REMOVE_LIKE:
      let nextState = { ...state };
      delete nextState[action.likeId];
      return nextState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default likesReducer;