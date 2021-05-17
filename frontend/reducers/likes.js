import { RECEIVE_LIKE, REMOVE_LIKE } from '../actions/like';

const likesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_LIKE:
      const { id } = action.like;
      return { ...state, [id]: action.like };
    case REMOVE_LIKE:
      let nextState = { ...state };
      delete nextState[action.likeId];
      return nextState;
    default:
      return state;
  }
};

export default likesReducer;