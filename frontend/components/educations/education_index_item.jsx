import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { openModal } from '../../actions/modal';

const EducationIndexItem = ({ education, openModal, currentUser, match }) => {
  const editBtn = currentUser == match.params.id ? (
    <button onClick={() => openModal('editEdu', education.id)} className='edit-exp-edu-btn'>
      <i className="fas fa-pencil-alt"></i>
    </button>
  ) : null;

  return (
    <div className='edu-item'>
      <img src={window.eduImg} alt="Education"/>
      <div className='edu-info'>
        <p className='edu-school'>{education.school}</p>
        <p className='edu-degree'>{education.degree}{education.grade ? `, ${education.grade}` : ''}</p>
        <p className='edu-year'>{education.startYear} - {education.endYear}</p>
        <p className='edu-activities'>{education.activities ? `Activities & Societies: ${education.activities}` : null}</p>
        <p className='edu-description'>{education.description}</p>
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

const EducationIndexItemContainer = withRouter(connect(mapSTP, mapDTP)(EducationIndexItem));

export default EducationIndexItemContainer;