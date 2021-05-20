import * as ConnectionAPI from '../util/connection_api';

export const RECEIVE_CONNECTIONS = 'RECEIVE_CONNECTIONS';
export const RECEIVE_CONNECTION = 'RECEIVE_CONNECTION';
export const REMOVE_CONNECTION = 'REMOVE_CONNECTION';

const receiveConnections = payload => ({
  type: RECEIVE_CONNECTIONS,
  connections: payload.connections,
  users: payload.users
});

export const receiveConnection = payload => ({
  type: RECEIVE_CONNECTION,
  connection: payload.connection,
  user: payload.user
});

const removeConnection = connectionId => ({
  type: REMOVE_CONNECTION,
  connectionId
});

export const fetchConnections = () => dispatch => (
  ConnectionAPI.fetchConnections().then(
    res => dispatch(receiveConnections(res))
  )
);

export const fetchConnection = (connectorId, connectedId) => dispatch => (
  ConnectionAPI.fetchConnections(connectorId, connectedId).then(
    res => dispatch(receiveConnections(res))
  )
);

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
