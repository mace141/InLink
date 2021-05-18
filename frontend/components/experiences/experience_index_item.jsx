import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { openModal } from '../../actions/modal';

const ExperienceIndexItem = ({ experience, openModal, currentUser, match }) => {
  const editBtn = currentUser == match.params.id ? (
    <button onClick={() => openModal('editExp', experience.id)}>
      <i className="fas fa-pencil-alt"></i>
    </button>
  ) : null;

  return (
    <div className='exp-item'>
      <p className='exp-title'>{experience.title}</p>
      <p className='exp-company'>{experience.company}</p>
      <p className='exp-time'>{experience.startDate} - {experience.endDate}</p>
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