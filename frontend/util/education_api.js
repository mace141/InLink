export const fetchEducations = () => (
  $.ajax({
    url: '/api/educations'
  })
);

export const fetchEducation = educationId => (
  $.ajax({
    url: `/api/educations/${educationId}`
  })
);

export const createEducation = education => (
  $.ajax({
    method: 'POST',
    url: '/api/educations',
    data: { education }
  })
);

export const updateEducation = education => (
  $.ajax({
    method: 'PATCH',
    url: `/api/educations/${education.id}`,
    data: { education }
  })
)

export const deleteEducation = educationId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/educations/${educationId}`
  })
)