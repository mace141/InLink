export const fetchConnections = () => (
  $.ajax({
    url: '/api/connections'
  })
);

export const createConnection = connection => (
  $.ajax({
    url: '/api/connections',
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