import { connect } from 'react-redux';
import { createComment } from '../../actions/comment';
import CommentForm from './comment_form';

const mapSTP = ({ entities: { users }, session: { currentUser }}) => ({
  user: users[currentUser],
  currentUser,
  formType: 'Add a reply...'
});

const mapDTP = dispatch => ({
  createComment: comment => dispatch(createComment(comment))
});

const ReplyFormContainer = connect(mapSTP, mapDTP)(CommentForm);

export default ReplyFormContainer;