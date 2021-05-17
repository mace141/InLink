import { RECEIVE_EXPERIENCES, RECEIVE_EXPERIENCE, REMOVE_EXPERIENCE } from '../actions/education';

const experiencesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_EXPERIENCES:
      return { ...state, ...action.experiences };
    case RECEIVE_EXPERIENCE:
      const { id } = action.experience;
      return { ...state, [id]: action.experience };
    case REMOVE_EXPERIENCE:
      let nextState = { ...state };
      delete nextState[action.experienceId];
      return nextState;
    default:
      return state;
  }
};

export default experiencesReducer;
