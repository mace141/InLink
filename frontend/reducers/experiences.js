import { RECEIVE_EXPERIENCES, RECEIVE_EXPERIENCE, REMOVE_EXPERIENCE } from '../actions/experience';
import { RECEIVE_CURRENT_USER, RECEIVE_USER } from '../actions/session';

const experiencesReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { ...state, ...action.experiences };
    case RECEIVE_EXPERIENCES:
      return { ...state, ...action.experiences };
    case RECEIVE_EXPERIENCE:
      const { id } = action.experience;
      return { ...state, [id]: action.experience };
    case REMOVE_EXPERIENCE:
      let nextState = { ...state };
      delete nextState[action.experienceId];
      return nextState;
    case RECEIVE_USER:
      return { ...state, ...action.experiences };
    default:
      return state;
  }
};

export default experiencesReducer;
