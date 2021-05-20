import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteConnection, updateConnection } from '../../actions/connection';

const RequestsIndex = ({ requestingUsers, requests, updateConnection, deleteConnection }) => {
  const headerMsg = requestingUsers.length ? 'Invitations' : 'No pending invitations';
  const requestsList = requestingUsers.length ? (
    <ul className='connects-list requests'>
      {requestingUsers.map((user, i) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            <img src={user.profileUrl || window.defaultUser} alt="Profile Pic"/>
          </Link>
          <div className='requesting-user'>
            <div>
              <p className='connect-name'>{`${user.fname} ${user.lname}`}</p>
              <p className='connect-headline'>{user.headline}</p>
            </div>
            <div className='connection-btns'>
              <button className='reject' onClick={() => deleteConnection(requests[i].id)}>Ignore</button>
              <button className='accept' onClick={() => updateConnection(requests[i])}>Accept</button>
            </div>
          </div>
        </div>
      ))}
    </ul>
  ) : null;

  return (
    <div className='connections requests'>
      <header>{headerMsg}</header>
      {requestsList}
    </div>
  )
}

const mapDTP = dispatch => ({
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: connectionId => dispatch(deleteConnection(connectionId))
});

const RequestsIndexContainer = connect(null, mapDTP)(RequestsIndex);

export default RequestsIndexContainer;