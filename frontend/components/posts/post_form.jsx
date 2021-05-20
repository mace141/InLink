import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.post;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.ensureContent = this.ensureContent.bind(this);
    this.ensureMedia = this.ensureMedia.bind(this);
    this.openFileLoader = this.openFileLoader.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  ensureContent() {
    const { body, media } = this.state;

    if (body.length || media) {
      return false;
    } else {
      return true;
    }
  }

  ensureMedia() {
    if (this.state.media) return false;
    return true;
  }

  handleInput(e) {
    this.setState({ body: e.target.value });
  }

  openFileLoader() {
    document.getElementById('post-media-input').click();
    this.modalSwitch();
  }

  handleFile(e) {
    const file = e.target.files[0];
    
    const fileReader = new FileReader();
    // will run when file is read
    fileReader.onloadend = () => {
      this.setState({ media: file, mediaUrl: fileReader.result });
      const postBodies = document.getElementsByClassName('post-body');

      for (let i = 0; i < postBodies.length; i++) {
        postBodies[i].style.overflowY = 'scroll';
        postBodies[i].style.height = '400px';
      }
    };

    if (file) {
      // reads the file
      fileReader.readAsDataURL(file);
    }
  }

  removeFile() {
    this.setState({
      media: null,
      mediaUrl: null
    });
    document.getElementById('post-media-input').value = null;

    const postBodies = document.getElementsByClassName('post-body');

    for (let i = 0; i < postBodies.length; i++) {
      postBodies[i].style.overflowY = null;
      postBodies[i].style.height = null;
    }
  }

  modalSwitch() {
    document.getElementsByClassName('post-form-modal')[0].classList.toggle('hidden');
    document.getElementsByClassName('post-media-modal')[0].classList.toggle('hidden');
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // creates an object to send to controller
    const formData = new FormData();
    if (this.state.media) {
      formData.append('post[media]', this.state.media);
    }
    if (this.state.id) {
      formData.append('post[id]', this.state.id);
    }
    formData.append('post[body]', this.state.body);
    formData.append('post[user_id]', this.state.userId);
    
    this.props.processForm(formData);
    this.setState({ 
      body: "",
      media: null,
      mediaUrl: null
    });
    document.getElementById('post-media-input').value = "";
    this.props.closeModal();
  }

  render() {
    // image preview
    const preview = (noPic) => this.state.mediaUrl ? <img src={this.state.mediaUrl}/> : noPic;
    const selectMedia = (
      <span onClick={() => document.getElementById('post-media-input').click()}>Select images to share</span>
    );
    const closeImageBtn = (
      this.state.media ? <span className='remove-img-btn' onClick={this.removeFile}>✕</span> : null
    );
    
    return (
      <>
        <div className='modal post-form-modal'>
          <header>
            <h2>{this.props.formType}</h2>
            <span className='close-modal-button' onClick={() => this.props.closeModal()}>✕</span>
          </header>
          <form onSubmit={this.handleSubmit} className='post-form'>
            <div className='post-body'>
              <div>
                <img src={this.props.user.avatarUrl || window.defaultUser} alt="Profile Pic" className='pfp small'/><h2>{this.props.name}</h2>
              </div>
              <div className='textarea'>
                <textarea placeholder='What do you want to talk about?' value={this.state.body} onChange={this.handleInput}></textarea>
              </div>
              <div className='image-body'>
                {closeImageBtn}
                {preview(null)}
              </div>
            </div>
            <footer className='post-form-footer footer'>
              <i className="far fa-image" onClick={this.openFileLoader}></i>
              <input type="file" id='post-media-input' accept='image/*' onChange={this.handleFile}/>
              <button className='form-button' disabled={this.ensureContent()}>Post</button>
            </footer>
          </form>
        </div>
        <div className='modal post-media-modal hidden'>
          <header>
            <h2>Edit your photo</h2>
            <span className='close-modal-button' onClick={this.modalSwitch}>✕</span>
          </header>
          <div className='post-body image-body'>
            {preview(selectMedia)}
          </div>
          <footer>
            <div>
              <button className='back-btn' onClick={() => {this.removeFile(); this.modalSwitch()}}>Back</button>
              <button className='done-btn' disabled={this.ensureMedia()} onClick={this.modalSwitch}>Done</button>
            </div>
          </footer>
        </div>
      </>
    )
  }
};

export default PostForm;