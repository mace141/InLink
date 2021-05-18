import React from 'react';
import EducationIndexContainer from '../educations/education_index';
import ExperienceIndexContainer from '../experiences/experience_index';
import UserDetailContainer from './user_detail';

const Profile = () => (
  <div className='profile-page-ctnr'>
    <div className='user-section'>
      <UserDetailContainer/>
      <div className='whitebox exp-edu-sect'>
        <ExperienceIndexContainer/>
        <EducationIndexContainer/>
      </div>
    </div>
    <div className='suggested-connections whitebox'>
      Suggested Connections
    </div>
  </div>
);

export default Profile;