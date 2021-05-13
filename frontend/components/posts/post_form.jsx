import React from 'react';
import { connect } from 'react-redux';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: ""
    };
  }

  handleInput() {
    this.setState({ body: e.target.value });
  }

  handleSubmit() {
    e.preventDefault();
    this.createPost(this.state);
  }

  render() {
    return (
      <div className='modal post-form-modal'>
        <header>
          <h2>Create a post</h2>
          <span className='close-modal-button'>✕</span>
        </header>
        <form onSubmit={this.handleSubmit} className='post-form'>
          <h2>[Insert PFP here] {this.props.name}</h2>
          <textarea cols="30" rows="10" placeholder='What do you want to talk about?'></textarea>
          <button>Post</button>
        </form>
      </div>
    )
  }
};

const mapSTP = ({ entities: { users }, session: { currentUser } }) => {
  const user = users[currentUser];

  return {
    name: user.fname + ' ' + user.lname,
    user
  }
};

const mapDTP = dispatch => ({
  createPost: post => dispatch(createPost(post))
});

const PostFormContainer = connect(mapSTP, mapDTP)(PostForm);

export default PostFormContainer;