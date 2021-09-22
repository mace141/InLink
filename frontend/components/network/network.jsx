import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import RequestsIndexContainer from './requests_index';
import ConnectedIndex from './connected_index';
import { fetchConnections } from '../../actions/connection';

const Network = ({ 
  requestingUsers, 
  connectedUsers,
  requests,
  fetchConnections
}) => {
  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
      <RequestsIndexContainer requestingUsers={requestingUsers} requests={requests}/>
      <ConnectedIndex connectedUsers={connectedUsers}/>
    </>
  );
};

const mapSTP = ({ entities: { users, connections }, session: { currentUser } }) => {
  const requests = Object.values(connections).filter(
    con => con.accepted === false && con.connectorId != currentUser
  );
  
  const connected = Object.values(connections).filter(
    con => con.accepted === true
  );

  const requestingUsers = requests.map(req => users[req.connectorId]);

  const connectedUsers = connected.map(con => {
    return con.connectorId === currentUser ? users[con.connectedId] : users[con.connectorId]
  });

  return {
    requests,
    requestingUsers,
    connectedUsers
  }
};

const mapDTP = dispatch => ({
  fetchConnections: () => dispatch(fetchConnections())
});

const NetworkContainer = connect(mapSTP, mapDTP)(Network);

export default NetworkContainer;