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
    this.handleFile = this.handleFile.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  handleInput(e) {
    this.setState({ body: e.target.value });
  }

  handleFile(e) {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ media: file, mediaUrl: fileReader.result });
    }

    if (file) fileReader.readAsDataURL(file); 
  }

  openFileLoader() {
    document.getElementById('cmt-media-input').click();
  }

  removeFile() {
    this.setState({
      media: null,
      mediaUrl: null
    });
    document.getElementById('cmt-media-input').value = null;
  }

  ensureContent() {
    const { media, body } = this.state;

    if (media || body.length) {
      return true;
    } else {
      return false
    }
  }

  postComment() {
    const formData = new FormData();
    if (this.state.media) {
      formData.append('comment[media]', this.state.media);
    }
    formData.append('comment[body]', this.state.body);
    formData.append('comment[user_id]', this.props.currentUser);
    formData.append('comment[post_id]', this.props.postId);
    
    this.props.createComment(formData);
    this.setState({
      body: "",
      media: null,
      mediaUrl: null
    });
    document.getElementById('cmt-media-input').value = "";
  }
  
  render() {
    const preview = this.state.mediaUrl ? <img src={this.state.mediaUrl}/> : null;
    const closeImageBtn = this.state.media ? (
      <span className='rm-cmt-img' onClick={this.removeFile}>✕</span>
    ) : null;

    return (
      <>
        <h2>[PFP here]</h2>
        <div className='comment-form'>
          <input type="text" placeholder='Add a comment...' onChange={this.handleInput}/>
          {this.state.media ? null : <i className="far fa-image" onClick={this.openFileLoader}></i>}
          <input type="file" id="cmt-media-input" accept='image/*' onChange={this.handleFile}/>
          <div className='cmt-img-preview'>
            {closeImageBtn}
            {preview}
          </div>
        </div>
        {this.ensureContent() ? <button className='post-cmt-btn' onClick={this.postComment}>Post</button> : null}
      </>
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