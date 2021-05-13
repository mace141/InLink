import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/post';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      user_id: this.props.currentUser
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPost(this.state);
    this.setState({ body: "" });
  }

  render() {
    debugger
    return (
      <div className='modal post-form-modal'>
        <header>
          <h2>Create a post</h2>
          <span className='close-modal-button'>✕</span>
        </header>
        <form onSubmit={this.handleSubmit} className='post-form'>
          <h2>[Insert PFP here] {this.props.name}</h2>
          <textarea cols="30" rows="10" placeholder='What do you want to talk about?' value={this.state.body} onInput={this.handleInput}></textarea>
          <button className='form-button'>Post</button>
        </form>
      </div>
    )
  }
};

const mapSTP = ({ entities: { users }, session: { currentUser } }) => {
  const user = users[currentUser];

  return {
    name: user.fname + ' ' + user.lname,
    currentUser
  }
};

const mapDTP = dispatch => ({
  createPost: post => dispatch(createPost(post))
});

const PostFormContainer = connect(mapSTP, mapDTP)(PostForm);

export default PostFormContainer;