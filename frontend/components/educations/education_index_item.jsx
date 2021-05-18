import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal';

const EducationIndexItem = ({ education, openModal }) => {

  return (
    <div className='edu-item'>
      <p className='edu-school'>{education.school}</p>
      <p className='edu-degree'>{education.degree}</p>
      <p className='edu-year'>{education.startYear} - {education.endYear}</p>
      <button onClick={() => openModal('editEdu', education.id)}>
        <i className="fas fa-pencil-alt"></i>
      </button>
    </div>
  )
};

const mapDTP = dispatch => ({
  openModal: (modal, id) => dispatch(openModal(modal, id))
});

const EducationIndexItemContainer = connect(null, mapDTP)(EducationIndexItem);

export default EducationIndexItemContainer;