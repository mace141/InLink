import React from 'react';
import { Link } from 'react-router-dom';

const ConnectedIndex = ({ connectedUsers }) => {
  const connectionsList = connectedUsers.length ? (
    <ul className='connects-list'>
      {connectedUsers.map(user => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            <img src={user.profileUrl || window.defaultUser} alt="Profile Pic"/>
          </Link>
          <div>
            <p className='connect-name'>{`${user.fname} ${user.lname}`}</p>
            <p className='connect-headline'>{user.headline}</p>
          </div>
        </div>
      ))}
    </ul>
  ) : null;

  return (
    <div className='connections connected'>
      <header>Connections</header>
      {connectionsList}
    </div>
  );
}

export default ConnectedIndex;