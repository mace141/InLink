import React from 'react';
import ExperienceIndexContainer from '../experiences/experience_index';
import UserDetailContainer from './user_detail';

const Profile = () => (
  <div className='profile-page-ctnr'>
    <div className='user-section'>
      <UserDetailContainer/>
      <ExperienceIndexContainer/>
    </div>
    <div className='suggested-connections whitebox'>
      Suggested Connections
    </div>
  </div>
);

export default Profile;