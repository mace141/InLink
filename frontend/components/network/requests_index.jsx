import React from 'react';
import { connect } from 'react-redux';
import { deleteConnection, updateConnection } from '../../actions/connection';

const RequestsIndex = ({ requestingUsers, requests, updateConnection, deleteConnection }) => {
  const headerMsg = requestingUsers.length ? 'Invitations' : 'No pending invitations';

  return (
    <div className='connections requests'>
      <header>{headerMsg}</header>
      <ul>
        {requestingUsers.map((user, i) => (
          <div>
            <img src={user.profileUrl || window.defaultUser} alt="Profile Pic"/>
            <div>
              <div>
                <p>{`${user.fname} ${user.lname}`}</p>
                <p>{user.headline}</p>
              </div>
              <div>
                <button onClick={() => deleteConnection(requests[i].id)}>Ignore</button>
                <button onClick={() => updateConnection(requests[i])}>Accept</button>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

const mapDTP = dispatch => ({
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: connectionId => dispatch(deleteConnection(connectionId))
});

const RequestsIndexContainer = connect(null, mapDTP)(RequestsIndex);

export default RequestsIndexContainer;