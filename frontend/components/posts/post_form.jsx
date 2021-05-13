import React from 'react';
import { connect } from 'react-redux';
import { createPost, createPostMedia } from '../../actions/post';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      userId: this.props.currentUser,
      media: null,
      mediaUrl: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.ensureContent = this.ensureContent.bind(this);
  }

  ensureContent() {
    const { body, media } = this.state;

    if (body.length || media) {
      return false;
    } else {
      return true;
    }
  }

  handleInput(e) {
    this.setState({ body: e.target.value });
  }

  handleFile(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    // will run when file is read
    fileReader.onloadend = () => {
      this.setState({ media: file, mediaUrl: fileReader.result });
    };

    if (file) {
      // reads the file
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    // creates an object to send to controller
    const formData = new FormData();
    if (this.state.media) {
      formData.append('post[media]', this.state.media);
    }
    formData.append('post[body]', this.state.body);
    formData.append('post[user_id]', this.state.userId);

    this.props.createPostMedia(formData);
    this.setState({ 
      body: "",
      media: null,
      mediaUrl: null
    });
    document.getElementById('media-input').value = "";
  }

  render() {
    // image preview
    const preview = this.state.mediaUrl ? <img src={this.state.mediaUrl}/> : null;

    return (
      <div className='modal post-form-modal'>
        <header>
          <h2>Create a post</h2>
          <span className='close-modal-button'>✕</span>
        </header>
        <form onSubmit={this.handleSubmit} className='post-form'>
          <h2>[Insert PFP here] {this.props.name}</h2>
          <textarea cols="30" rows="10" placeholder='What do you want to talk about?' value={this.state.body} onInput={this.handleInput}></textarea>
          {preview}
          <footer>
            <i className="far fa-image">Image Icon</i>
            <input type="file" id='media-input' onChange={this.handleFile}/>
            <button className='form-button' disabled={this.ensureContent()}>Post</button>
          </footer>
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
  createPost: post => dispatch(createPost(post)),
  createPostMedia: formData => dispatch(createPostMedia(formData))
});

const PostFormContainer = connect(mapSTP, mapDTP)(PostForm);

export default PostFormContainer;