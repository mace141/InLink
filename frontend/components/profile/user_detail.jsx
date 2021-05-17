import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const UserDetail = ({ user }) => (
  <div>
    <div className='user-bg-img'></div>
    <div className='user-details'>
      <div className='pf-user-info'>
        <h1>{`${user.fname} ${user.lname}`}</h1>
        <h2>{user.headline}</h2>
        <h3>{user.location}</h3>
      </div>
      <div className='pf-user-hist'>
        <p>most recent work</p>
        <p>most recent education</p>
      </div>
    </div>
  </div>
);

const mapSTP = ({ entities: { users } }, ownProps) => ({
  user: users[ownProps.match.params.id]
});

const UserDetailContainer = withRouter(connect(mapSTP)(UserDetail));

export default UserDetailContainer;