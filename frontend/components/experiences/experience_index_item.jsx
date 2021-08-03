import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { openModal } from '../../actions/modal';

const ExperienceIndexItem = ({ experience, openModal, currentUser, match }) => {
  const editBtn = String(currentUser) === match.params.id ? (
    <button onClick={() => openModal('editExp', experience.id)} className='edit-exp-edu-btn'>
      <i className="fas fa-pencil-alt"></i>
    </button>
  ) : null;
  let expTime; let strStartDate; let strEndDate;

  if (experience.startDate) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const startDateDB = new Date(`${experience.startDate}T12:00:00`);
    const endDateDB = new Date(`${experience.endDate}T12:00:00`);

    const startMon = months[startDateDB.getMonth()];
    const startYr = startDateDB.getFullYear();
    const endMon = months[endDateDB.getMonth()];
    const endYr = endDateDB.getFullYear();

    strStartDate = `${startMon} ${startYr}`;
    strEndDate = experience.endDate ? `${endMon} ${endYr}` : 'Present';

    expTime = <p className='exp-time'>{strStartDate} - {strEndDate}</p>;
  }

  return (
    <div className='exp-item'>
      <img src={window.expImg} alt="Experience"/>
      <div className='exp-info'>
        <p className='exp-title'>{experience.title}</p>
        <p className='exp-type'>{experience.type}</p>
        <p className='exp-company'>
          {experience.company} <span className='gray-shade'>{experience.employmentType}</span>
        </p>
        {expTime}
        <p className='exp-location'>{experience.location}</p>
        <p className='exp-description'>{experience.description}</p>
        {editBtn}
      </div>
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