import { connect } from 'react-redux';
import { createPost } from '../../actions/post';
import PostForm from './post_form';

const mapSTP = ({ entities: { users }, session: { currentUser } }) => {
  const user = users[currentUser];
  
  return {
    post: {
      body: "",
      media: null,
      mediaUrl: null,
      userId: currentUser
    },
    formType: 'Create a post',
    name: user.fname + ' ' + user.lname
  }
};

const mapDTP = dispatch => ({
  processForm: post => dispatch(createPost(post)),
});

const CreatePostForm = connect(mapSTP, mapDTP)(PostForm);

export default CreatePostForm;