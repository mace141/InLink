import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/session';
import EducationIndexContainer from '../educations/education_index';
import ExperienceIndexContainer from '../experiences/experience_index';
import UserDetailContainer from './user_detail';

class Profile extends React.Component {
  componentDidMount() {
    fetchUser(this.props.match.params.id);
  }

  render() {
    if (!this.props.user) return null;

    return (
      <div className='profile-page-ctnr'>
        <div className='user-section'>
          <UserDetailContainer/>
          <div className='exp-edu-sect'>
            <div>
              <ExperienceIndexContainer/>
            </div>
            <div className='edu-div'>
              <EducationIndexContainer/>
            </div>
          </div>
        </div>
        <div className='suggested-connections whitebox'>
          Suggested Connections
        </div>
      </div>
    );
  }
}

const mapSTP = ({ entities: { users } }, ownProps) => ({
  user: users[ownProps.match.params.id]
});

const mapDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId))
});

const ProfileContainer = withRouter(connect(mapSTP, mapDTP)(Profile))

export default ProfileContainer;