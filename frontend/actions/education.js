import * as EducationAPI from '../util/education_api';

export const RECEIVE_EDUCATIONS = 'RECEIVE_EDUCATIONS';
export const RECEIVE_EDUCATION = 'RECEIVE_EDUCATION';
export const REMOVE_EDUCATION = 'REMOVE_EDUCATION';

const receiveEducations = educations => ({
  type: RECEIVE_EDUCATIONS,
  educations
});

const receiveEducation = education => ({
  type: RECEIVE_EDUCATION,
  education
});

const removeEducation = educationId => ({
  type: REMOVE_EDUCATION,
  educationId
});

export const fetchEducations = userId => dispatch => (
  EducationAPI.fetchEducations(userId).then(
    educations => dispatch(receiveEducations(educations))
  )
);

export const fetchEducation = educationId => dispatch => (
  EducationAPI.fetchEducation(educationId).then(
    education => dispatch(receiveEducation(education))
  )
);

export const createEducation = education => dispatch => (
  EducationAPI.createEducation(education).then(
    education => dispatch(receiveEducation(education))
  )
);

export const updateEducation = education => dispatch => (
  EducationAPI.updateEducation(education).then(
    education => dispatch(receiveEducation(education))
  )
);

export const deleteEducation = educationId => dispatch => (
  EducationAPI.deleteEducation(educationId).then(
    () => dispatch(removeEducation(educationId))
  )
);