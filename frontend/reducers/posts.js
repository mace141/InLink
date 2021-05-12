import { RECEIVE_POSTS, RECEIVE_POST, REMOVE_POST } from '../actions/post';

const postsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...state, ...action.posts };
    case RECEIVE_POST:
      const { id } = action.post;
      return { ...state, ...{ [id]: action.post } };
    case REMOVE_POST:
      let nextState = { ...state };
      delete nextState[action.postId];
      return nextState;
    default:
      return state;
  }
};

export default postsReducer