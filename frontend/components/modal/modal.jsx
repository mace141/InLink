import React from 'react';
import { closeModal } from '../../actions/modal';
import { connect } from 'react-redux';
import CreatePostForm from '../posts/create_post_form';
import EditPostFormContainer from '../posts/edit_post_form';
import CreateEducationForm from '../educations/create_education_form';
import EditEducationForm from '../educations/edit_education_form';

const Modal = ({modal, closeModal}) => {
  if (!modal) return null;
  let component;

  switch (modal) {
    case 'createPost':
      component = <CreatePostForm closeModal={closeModal}/>;
      break;
    case 'editPost':
      component = <EditPostFormContainer closeModal={closeModal}/>;
      break;
    case 'createEdu':
      component = <CreateEducationForm closeModal={closeModal}/>;
      break;
    case 'editEdu':
      component = <EditEducationForm closeModal={closeModal}/>;
      break;
    default:
      return null;
  }

  return (
    <div className='modal-background' onClick={closeModal}>
      <div className='modal-component' onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapSTP = ({ ui: { modal }}) => ({
  modal
});

const mapDTP = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

const ModalContainer = connect(mapSTP, mapDTP)(Modal);

export default ModalContainer;