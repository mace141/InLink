import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal';

const ExperienceIndexItem = ({ experience, openModal }) => {

  return (
    <div className='exp-item'>
      <p className='exp-title'>{experience.title}</p>
      <p className='exp-company'>{experience.company}</p>
      <p className='exp-time'>{experience.startDate} - {experience.endDate}</p>
      <button onClick={() => openModal('editExp', experience.id)}>
        <i className="fas fa-pencil-alt"></i>
      </button>
    </div>
  )
};

const mapDTP = dispatch => ({
  openModal: (modal, id) => dispatch(openModal(modal, id))
});

const ExperienceIndexItemContainer = connect(null, mapDTP)(ExperienceIndexItem);

export default ExperienceIndexItemContainer;