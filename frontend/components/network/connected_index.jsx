import React from 'react';

const ConnectedIndex = ({ connectedUsers }) => (
  <div className='connections connected'>
    <header>Connections</header>
    <ul>
      {connectedUsers.map(user => (
        <div>
          <img src={user.profileUrl || window.defaultUser} alt="Profile Pic"/>
          <div>
            <p>{`${user.fname} ${user.lname}`}</p>
            <p>{user.headline}</p>
          </div>
        </div>
      ))}
    </ul>
  </div>
);

export default ConnectedIndex;