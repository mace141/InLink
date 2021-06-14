import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import { updateUserImg } from '../../actions/session';
import UploadPictureForm from './upload_picture_form';

const mapSTP = ({ entities: { users }, session: { currentUser } }) => ({
  user: users[currentUser],
  formType: 'Change profile picture',
  imageType: 'avatar',
  imageUrl: 'avatarUrl'
});

const mapDTP = dispatch => ({
  updateUserImg: (formData, id) => dispatch(updateUserImg(formData, id)),
  closeModal: () => dispatch(closeModal())
});

const UploadAvatarContainer = connect(mapSTP, mapDTP)(UploadPictureForm);

export default UploadAvatarContainer;