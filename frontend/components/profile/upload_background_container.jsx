import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import { updateUserImg } from '../../actions/session';
import UploadPictureForm from './upload_picture_form';

const mapSTP = ({ entities: { users }, session: { currentUser } }) => ({
  user: users[currentUser],
  formType: 'Change background picture',
  imageType: 'background',
  imageUrl: 'backgroundUrl'
});

const mapDTP = dispatch => ({
  updateUserImg: (formData, id) => dispatch(updateUserImg(formData, id)),
  closeModal: () => dispatch(closeModal())
});

const UploadBackgroundContainer = connect(mapSTP, mapDTP)(UploadPictureForm);

export default UploadBackgroundContainer;