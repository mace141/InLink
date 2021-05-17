import React from 'react';
import UserDetailContainer from './user_detail';

const Profile = () => (
  <div className='profile-page-container'>
    <div className='user-section'>
      <UserDetailContainer/>
    </div>
  </div>
);

export default Profile;