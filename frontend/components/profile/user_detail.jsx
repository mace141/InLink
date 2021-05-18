import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const UserDetail = ({ user }) => (
  <div className='user-pf-ctnr'>
    <div className='user-bg-img'>BackgroundImage</div>
    <div className='user-details'>
      <div className='pf-user-info'>
        <img src={user.profileUrl || window.defaultUser} alt="Profile Pic" className='pfp large'/>
        <div>
          <h1>{`${user.fname} ${user.lname}`}</h1>
        </div>
        <div>
          <h2>{user.headline}</h2>
        </div>
        <div>
          <h3>{user.location}</h3>
        </div>
      </div>
      <div className='pf-user-hist'>
        <p>Most recent work</p>
        <p>Most recent education</p>
      </div>
    </div>
  </div>
);

const mapSTP = ({ entities: { users } }, ownProps) => ({
  user: users[ownProps.match.params.id]
});

const UserDetailContainer = withRouter(connect(mapSTP)(UserDetail));

export default UserDetailContainer;