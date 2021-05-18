import { connect } from 'react-redux';
import { createComment } from '../../actions/comment';
import CommentForm from './comment_form';

const mapSTP = ({ session: { currentUser }}) => ({
  currentUser,
  formType: 'Add a comment...'
});

const mapDTP = dispatch => ({
  createComment: comment => dispatch(createComment(comment))
});

const CreateCommentForm = connect(mapSTP, mapDTP)(CommentForm);

export default CreateCommentForm;