import { RECEIVE_EDUCATIONS, RECEIVE_EDUCATION, REMOVE_EDUCATION } from '../actions/education';

const educationsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_EDUCATIONS:
      return { ...state, ...action.educations };
    case RECEIVE_EDUCATION:
      const { id } = action.education;
      return { ...state, [id]: action.education };
    case REMOVE_EDUCATION:
      let nextState = { ...state };
      delete nextState[action.educationId];
      return nextState;
    default:
      return state;
  }
};

export default educationsReducer;
