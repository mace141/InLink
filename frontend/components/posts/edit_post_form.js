import { connect } from 'react-redux';
import { fetchPost, updatePost } from '../../actions/post';
import PostForm from './post_form';

const mapSTP = ({ entities: { posts }, ui: { filter }}) => ({
  post: posts[filter],
  formType: 'Edit post'
});

const mapDTP = dispatch => ({
  fetchPost: postId => dispatch(fetchPost(postId)),
  processForm: post => dispatch(updatePost(post))
});

const EditPostFormContainer = connect(mapSTP, mapDTP)(PostForm);

export default EditPostFormContainer;