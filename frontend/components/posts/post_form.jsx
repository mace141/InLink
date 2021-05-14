import React from 'react';

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.post;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.ensureContent = this.ensureContent.bind(this);
    this.ensureMedia =this.ensureMedia.bind(this);
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
    document.getElementById('media-input').click();
    document.getElementsByClassName('post-form-modal')[0].classList.toggle('hidden');
    document.getElementsByClassName('post-media-modal')[0].classList.toggle('hidden');
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

  formSwitch() {
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
    document.getElementById('media-input').value = "";
    this.props.closeModal();
  }

  render() {
    // image preview
    const preview = (noPic) => this.state.mediaUrl ? <img src={this.state.mediaUrl}/> : noPic;
    const selectMedia = (
      <span onClick={this.openFileLoader} onClick={() => document.getElementById('media-input').click()}>Select images to share</span>
    );

    return (
      <>
        <div className='modal post-form-modal'>
          <header>
            <h2>{this.props.formType}</h2>
            <span className='close-modal-button' onClick={() => this.props.closeModal()}>✕</span>
          </header>
          <form onSubmit={this.handleSubmit} className='post-form'>
            <div className=''>
              <h2>[Insert PFP here]</h2><h2>{this.props.name}</h2>
            </div>
            <textarea cols="30" rows="10" placeholder='What do you want to talk about?' value={this.state.body} onInput={this.handleInput}></textarea>
            {preview(null)}
            <footer>
              <i className="far fa-image" onClick={this.openFileLoader}></i>
              <input type="file" id='media-input' onChange={this.handleFile}/>
              <button className='form-button' disabled={this.ensureContent()}>Post</button>
            </footer>
          </form>
        </div>
        <div className='modal post-media-modal hidden'>
          <header>
            <h2>Edit your photo</h2>
            <span className='close-modal-button' onClick={this.formSwitch}>✕</span>
          </header>
          <p>
            {preview(selectMedia)}
          </p>
          <footer>
            <div>
              <button className='back-btn' onClick={this.formSwitch}>Back</button>
              <button className='done-btn' disabled={this.ensureMedia()} onClick={this.formSwitch}>Done</button>
            </div>
          </footer>
        </div>
      </>
    )
  }
};

export default PostForm;