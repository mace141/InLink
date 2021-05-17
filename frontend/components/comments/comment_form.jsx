import React from 'react';

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
      document.getElementById('cmt-img').style.display = 'inline-block';
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
    const { 
      currentUser, postId, parentCommentId, createComment, incrComCount, incrRepCount 
    } = this.props;

    const formData = new FormData();
    if (this.state.media) {
      formData.append('comment[media]', this.state.media);
    }
    formData.append('comment[body]', this.state.body);
    formData.append('comment[user_id]', currentUser);
    formData.append('comment[post_id]', postId);
    if (parentCommentId) {
      formData.append('comment[parent_comment_id]', parentCommentId);
    }
    
    createComment(formData);
    this.setState({
      body: "",
      media: null,
      mediaUrl: null
    });
    document.getElementById('cmt-media-input').value = "";
    incrComCount();
    incrRepCount();
  }
  
  render() {
    const preview = this.state.mediaUrl ? <img src={this.state.mediaUrl}/> : null;
    const closeImageBtn = this.state.media ? (
      <span className='rm-cmt-img' onClick={this.removeFile}>✕</span>
    ) : null;

    return (
      <>
        <div className='cmt-form-ctnr'>
          <h2>[PFP here]</h2>
          <div className='comment-form'>
            <div className='cmt-input-div'>
              <input type="text" placeholder={this.props.formType} value={this.state.body} onChange={this.handleInput}/>
              {this.state.media ? null : <i className="far fa-image cmt" onClick={this.openFileLoader}></i>}
              <input type="file" id="cmt-media-input" accept='image/*' onChange={this.handleFile}/>
            </div>
            <div className='cmt-img-preview'>
              <div id='cmt-img'>
                {closeImageBtn}
                {preview}
              </div>
            </div>
          </div>
        </div>
        {this.ensureContent() ? <button className='post-cmt-btn' onClick={this.postComment}>Post</button> : null}
      </>
    )
  }
};

export default CommentForm;