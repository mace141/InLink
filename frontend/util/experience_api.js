export const fetchExperiences = () => (
  $.ajax({
    url: '/api/experiences'
  })
);

export const fetchExperience = experienceId => (
  $.ajax({
    url: `/api/experiences/${experienceId}`
  })
);

export const createExperience = experience => (
  $.ajax({
    method: 'POST',
    url: '/api/experiences',
    data: { experience }
  })
);

export const updateExperience = experience => (
  $.ajax({
    method: 'PATCH',
    url: `/api/experiences/${experience.id}`,
    data: { experience }
  })
)

export const deleteExperience = experienceId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/experiences/${experienceId}`
  })
)