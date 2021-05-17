import React from 'react';
import { connect } from 'react-redux';
import { updateComment } from '../../actions/comment';

class EditCommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.comment;
    this.originalComment = this.props.comment;
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ensureChange = this.ensureChange.bind(this);
  }

  handleInput(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit() {
    this.props.updateComment(this.state);
  }

  ensureChange() {
    if (this.state == this.originalComment) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className='gray-shade edit'>
        <input type="text" value={this.state.body} onChange={this.handleInput}/>
        <p className='edit-cmt-btns'>
          <button className='save-cmt-edit' onClick={this.handleSubmit} disabled={this.ensureChange()}>Save Changes</button>
          <button className='cancel-cmt-edit' onClick={this.props.cancelEdit}>Cancel</button>
        </p>
      </div>
    )
  }
}

const mapDTP = dispatch => ({
  updateComment: comment => dispatch(updateComment(comment))
});

const EditCommentFormContainer = connect(null, mapDTP)(EditCommentForm);

export default EditCommentFormContainer;