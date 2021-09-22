import React from 'react';
import { connect } from 'react-redux';
import { updateComment } from '../../actions/comment';

const EditCommentForm = ({
  comment,
  comment: { body },
  updateComment,
  cancelEdit
}) => {
  const [formState, setFormState] = useState(comment);
  const originalComment = body;

  const handleInput = (e) => {
    setFormState({ ...formState, body: e.target.value });
  };

  const handleSubmit = () => {
    const { media, parentCommentId, id, body, userId } = formState;
    const formData = new FormData();

    if (media) {
      formData.append('comment[media]', media);
    }
    if (parentCommentId) {
      formData.append('comment[parent_comment_id]', parentCommentId);
    }
    formData.append('comment[id]', id);
    formData.append('comment[body]', body);
    formData.append('comment[user_id]', userId);
    
    updateComment(formData);
    setFormState({ 
      ...formState,
      body: "",
      media: null,
      mediaUrl: null
    });
    cancelEdit();
  };

  const ensureChange = () => {
    return formState.body === originalComment;
  };

  return (
    <div className='gray-shade edit'>
      <input type="text" value={formState.body} onChange={handleInput}/>
      <p className='edit-cmt-btns'>
        <button className='save-cmt-edit' 
                onClick={handleSubmit} 
                disabled={ensureChange()}
        >Save Changes</button>
        <button className='cancel-cmt-edit' 
                onClick={cancelEdit}
        >Cancel</button>
      </p>
    </div>
  );
};

const mapDTP = dispatch => ({
  updateComment: comment => dispatch(updateComment(comment))
});

const EditCommentFormContainer = connect(null, mapDTP)(EditCommentForm);

export default EditCommentFormContainer;