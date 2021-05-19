export const createConnection = connection => (
  $.ajax({
    method: '/api/connections',
    data: { connection }
  })
);

export const updateConnection = connection => (
  $.ajax({
    method: 'PATCH',
    url: `/api/connections/${connection.id}`,
    data: { connection }
  })
);

export const deleteConnection = connectionId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/connections/${connectionId}`
  })
);