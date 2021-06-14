import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { openModal } from '../../actions/modal';

const ExperienceIndexItem = ({ experience, openModal, currentUser, match }) => {
  const editBtn = currentUser == match.params.id ? (
    <button onClick={() => openModal('editExp', experience.id)} className='edit-exp-edu-btn'>
      <i className="fas fa-pencil-alt"></i>
    </button>
  ) : null;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const startDateDB = new Date(experience.startDate);
  const endDateDB = new Date(experience.endDate);

  const startMon = months[startDateDB.getMonth()];
  const startYr = startDateDB.getFullYear();
  const endMon = months[endDateDB.getMonth()];
  const endYr = endDateDB.getFullYear();

  const strStartDate = `${startMon} ${startYr}`;
  const strEndDate = experience.endDate ? `${endMon} ${endYr}` : 'Present';
  
  return (
    <div className='exp-item'>
      <p className='exp-title'>{experience.title}</p>
      <p className='exp-type'>{experience.type}</p>
      <p className='exp-company'>{experience.company}</p>
      <p className='exp-time'>{strStartDate} - {strEndDate}</p>
      <p className='exp-location'>{experience.location}</p>
      <p className='exp-description'>{experience.description}</p>
      {editBtn}
    </div>
  )
};

const mapSTP = ({ session: { currentUser } }) => ({
  currentUser
});

const mapDTP = dispatch => ({
  openModal: (modal, id) => dispatch(openModal(modal, id))
});

const ExperienceIndexItemContainer = withRouter(connect(mapSTP, mapDTP)(ExperienceIndexItem));

export default ExperienceIndexItemContainer;