import * as ConnectionAPI from '../util/connection_api';

export const RECEIVE_CONNECTION = 'RECEIVE_CONNECTION';
export const REMOVE_CONNECTION = 'REMOVE_CONNECTION';

const receiveConnection = connection => ({
  type: RECEIVE_CONNECTION,
  connection
});

const removeConnection = connectionId => ({
  type: REMOVE_CONNECTION,
  connectionId
});

export const createConnection = connection => dispatch => (
  ConnectionAPI.createConnection(connection).then(
    connection => dispatch(receiveConnection(connection))
  )
);

export const updateConnection = connection => dispatch => (
  ConnectionAPI.updateConnection(connection).then(
    connection => dispatch(receiveConnection(connection))
  )
);

export const deleteConnection = connectionId => dispatch => (
  ConnectionAPI.deleteConnection(connectionId).then(
    () => dispatch(removeConnection(connectionId))
  )
);
