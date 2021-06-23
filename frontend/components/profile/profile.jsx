import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchUser } from '../../actions/session';
import EducationIndexContainer from '../educations/education_index';
import ExperienceIndexContainer from '../experiences/experience_index';
import UserDetailContainer from './user_detail';

class Profile extends React.Component {
  componentDidMount() {
    const { fetchUser, match } = this.props;
    
    fetchUser(match.params.id);
  }

  componentDidUpdate() {
    const { experiences, educations } = this.props;

    if (experiences.length && educations.length) {
      const eduSectDiv = document.getElementsByClassName('edu-div')[0];
      eduSectDiv.style.borderTop = '1px solid #d8d8d8'
    }
  }

  render() {
    const { experiences, educations, user } = this.props;
    
    if (!user) return null;

    return (
      <div className='profile-page-ctnr'>
        <div className='user-section'>
          <UserDetailContainer lastExp={experiences[0]} lastEdu={educations[0]}/>
          <div className='exp-edu-sect'>
            <div>
              <ExperienceIndexContainer experiences={experiences}/>
            </div>
            <div className='edu-div'>
              <EducationIndexContainer educations={educations}/>
            </div>
          </div>
        </div>
        <div>
          <div className='suggested-connections whitebox'>
            <div className='avatar bigger'>
              <img src={window.daniel} alt="Daniel Wu"/>
            </div>
            <h1>Daniel Wu</h1>
            <div className='links'>
              <a href='https://github.com/mace141' target="_blank">
                <div className='nav-icon'>
                  <i className="fab fa-github"></i>
                  <p>Github</p>
                </div>
              </a>
              <a href='https://www.linkedin.com/in/daniel-wu-2995a6140/' target="_blank">
                <div className='nav-icon'>
                  <i className="fab fa-linkedin"></i>
                  <p>LinkedIn</p>
                </div>
              </a>
              <a href='https://angel.co/u/daniel-wu-42' target="_blank">
                <div className='nav-icon'>
                  <i className="fab fa-angellist"></i>
                  <p>AngelList</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapSTP = ({ entities: { users, educations, experiences } }, ownProps) => {
  const sortedExp = Object.values(experiences).filter(
    exp => exp.userId == ownProps.match.params.id
  ).sort(
    (a, b) => {
      if ((a.endDate == null || a.endDate == '') && (b.endDate != null && b.endDate != '')) {
        return -1;
      } else if ((a.endDate == null || a.endDate == '') && (b.endDate == null || b.endDate == '')) {
        if (Date.parse(a.startDate) > Date.parse(b.startDate)) {
          return -1;
        } else {
          return 1;
        }
      }
    }
  );

  const sortedEdu = Object.values(educations).filter(
    edu => edu.userId == ownProps.match.params.id
  ).sort((a, b) => a.endYear > b.endYear ? -1 : a.startYear > b.startYear ? -1 : 1);

  return {
    educations: sortedEdu,
    experiences: sortedExp,
    user: users[ownProps.match.params.id]
  };
};

const mapDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId))
});

const ProfileContainer = withRouter(connect(mapSTP, mapDTP)(Profile))

export default ProfileContainer;