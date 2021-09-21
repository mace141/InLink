import React, { useEffect, useState } from 'react';

const PostForm = ({ post, user, name, formType, processForm, closeModal }) => {
  const [body, setBody] = useState(post.body);
  const [media, setMedia] = useState(post.media);
  const [mediaUrl, setMediaUrl] = useState(post.mediaUrl);

  useEffect(() => {
    if (mediaUrl) {
      const postBodies = document.getElementsByClassName('post-body')

      for (let postBody of postBodies) {
        postBody.classList.add('overflow');
      }
    }
  }, []);

  const ensureContent = () => {
    if (body.length || media) {
      return false;
    } else {
      return true;
    }
  };

  const ensureMedia = () => {
    if (media) return false;
    return true;
  };

  const handleInput = (e) => {
    setBody(e.target.value);
  };

  const openFileLoader = () => {
    document.getElementById('post-media-input').click();
    mediaModalSwitch();
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    
    const fileReader = new FileReader();
    // will run when file is read
    fileReader.onloadend = () => {
      setMedia(file);
      setMediaUrl(fileReader.result);
      const postBodies = document.getElementsByClassName('post-body');

      for (let postBody of postBodies) {
        postBody.classList.add('overflow');
      }
    };

    if (file) {
      // reads the file
      fileReader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setMedia(null);
    setMediaUrl(null);
    document.getElementById('post-media-input').value = null;

    const postBodies = document.getElementsByClassName('post-body');

    for (let postBody of postBodies) {
      postBody.classList.remove('overflow');
    }
  };

  const closePostForm = () => {
    if (body != post.body || mediaUrl != post.mediaUrl) {
      discardModalSwitch();
    } else {
      closeModal();
    }
  };

  const discardModalSwitch = () => {
    document.getElementsByClassName('post-form-modal')[0].classList.toggle('hidden');
    document.getElementsByClassName('post-discard-modal')[0].classList.toggle('hidden');
  };

  const mediaModalSwitch = () => {
    document.getElementsByClassName('post-form-modal')[0].classList.toggle('hidden');
    document.getElementsByClassName('post-media-modal')[0].classList.toggle('hidden');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // creates an object to send to controller
    const formData = new FormData();
    if (media) {
      formData.append('post[media]', media);
    }
    if (post.id) {
      formData.append('post[id]', post.id);
    }
    formData.append('post[body]', body);
    formData.append('post[user_id]', post.userId);
    
    processForm(formData);
    setBody('');
    setMedia(null);
    setMediaUrl(null);
    document.getElementById('post-media-input').value = "";
    closeModal();
  };

  // image preview
  const preview = (noPic) => mediaUrl ? <img src={mediaUrl}/> : noPic;
  const selectMedia = (
    <span onClick={() => document.getElementById('post-media-input').click()}>Select images to share</span>
  );
  const closeImageBtn = (
    media ? <span className='remove-img-btn' onClick={removeFile}>✕</span> : null
  );
  
  return (
    <>
      <div className='modal post-form-modal'>
        <header>
          <h2>{formType}</h2>
          <span className='close-modal-button' 
                onClick={closePostForm}
          >✕</span>
        </header>
        <form onSubmit={handleSubmit} className='post-form'>
          <div className='post-body og'>
            <div>
              <div className='avatar small'>
                <img src={user.avatarUrl || window.defaultUser} alt="Profile Pic" className='pfp small'/>
              </div>
              <h2>{name}</h2>
            </div>
            <div className='textarea'>
              <textarea placeholder='What do you want to talk about?' value={body} onChange={handleInput}></textarea>
            </div>
            <div className='image-body'>
              {closeImageBtn}
              {preview(null)}
            </div>
          </div>
          <footer className='post-form-footer footer'>
            <i className="far fa-image" onClick={openFileLoader}></i>
            <input type="file" id='post-media-input' accept='image/*' onChange={handleFile}/>
            <button className='form-button' disabled={ensureContent()}>Post</button>
          </footer>
        </form>
      </div>
      <div className='modal post-media-modal hidden'>
        <header>
          <h2>Edit your photo</h2>
          <span className='close-modal-button' onClick={mediaModalSwitch}>✕</span>
        </header>
        <div className='post-body image-body'>
          {preview(selectMedia)}
        </div>
        <footer>
          <div>
            <button className='back-btn'
                    onClick={() => { removeFile(); mediaModalSwitch() }}
            >Back</button>
            <button className='done-btn' disabled={ensureMedia()} 
                    onClick={mediaModalSwitch}
            >Done</button>
          </div>
        </footer>
      </div>
      <div className='modal post-discard-modal hidden'>
        <header>
          <h2>Discard {formType === 'Edit post' ? 'changes': 'draft'}</h2>
          <span className='close-modal-button' onClick={discardModalSwitch}>✕</span>
        </header>
        <div className='post-body discard'>
          <span>
            Are you sure you want to discard your {formType === 'Edit post' ? 'changes': 'draft'}?
          </span>
        </div>
        <footer>
          <div>
            <button className='back-btn' onClick={discardModalSwitch}>
              Back
            </button>
            <button className='done-btn' onClick={() => closeModal()}>
              Discard
            </button>
          </div>
        </footer>
      </div>
    </>
  )
};

export default PostForm;