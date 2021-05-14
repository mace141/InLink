import React from 'react';
import { closeModal } from '../../actions/modal';
import { connect } from 'react-redux';
import PostFormContainer from '../posts/post_form';

const Modal = ({modal, closeModal}) => {
  if (!modal) return null;
  let component;

  switch (modal) {
    case 'createPost':
      component = <PostFormContainer/>;
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