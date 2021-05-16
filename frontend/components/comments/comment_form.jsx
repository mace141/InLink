import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../actions/comment';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      media: null,
      mediaUrl: null
    };

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({ body: e.target.value });
  }

  postComment() {
    const formData = new FormData();
    if (this.state.media) {
      formData.append('post[media]', this.state.media);
    }
    
    this.props.createComment(formData);
  }
  
  render() {
    return (
      <div>
        <h2>[PFP here]</h2>
        <input type="text" placeholder='Add a comment...' onChange={this.handleInput}/>
      </div>
    )
  }
};

const mapSTP = ({ session: { currentUser }}) => ({
  currentUser
});

const mapDTP = dispatch => ({
  createComment: comment => dispatch(createComment(comment))
});

const CommentFormContainer = connect(mapSTP, mapDTP)(CommentForm);

export default CommentFormContainer;