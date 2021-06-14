import * as ExperienceAPI from '../util/experience_api';

export const RECEIVE_EXPERIENCES = 'RECEIVE_EXPERIENCES';
export const RECEIVE_EXPERIENCE = 'RECEIVE_EXPERIENCE';
export const REMOVE_EXPERIENCE = 'REMOVE_EXPERIENCE';

const receiveExperiences = experiences => ({
  type: RECEIVE_EXPERIENCES,
  experiences
});

const receiveExperience = experience => ({
  type: RECEIVE_EXPERIENCE,
  experience
});

const removeExperience = experienceId => ({
  type: REMOVE_EXPERIENCE,
  experienceId
});

export const fetchExperiences = userId => dispatch => (
  ExperienceAPI.fetchExperiences(userId).then(
    experiences => dispatch(receiveExperiences(experiences))
  )
);

export const fetchExperience = experienceId => dispatch => (
  ExperienceAPI.fetchExperience(experienceId).then(
    experience => dispatch(receiveExperience(experience))
  )
);

export const createExperience = experience => dispatch => (
  ExperienceAPI.createExperience(experience).then(
    experience => dispatch(receiveExperience(experience))
  )
);

export const updateExperience = experience => dispatch => (
  ExperienceAPI.updateExperience(experience).then(
    experience => dispatch(receiveExperience(experience))
  )
);

export const deleteExperience = experienceId => dispatch => (
  ExperienceAPI.deleteExperience(experienceId).then(
    () => dispatch(removeExperience(experienceId))
  )
);