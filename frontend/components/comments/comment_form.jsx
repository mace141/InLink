import React, { useState } from 'react';

const CommentForm = ({
  currentUser,
  user,
  postId,
  parentCommentId,
  formMsg,
  formType,
  incrComCount,
  incrRepCount,
  createComment
}) => {
  const [formState, setFormState] = useState({
    body: '',
    media: null,
    mediaUrl: null
  });

  const handleInput = (e) => {
    setFormState({ ...formState, body: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setFormState({ ...formState, media: file, mediaUrl: fileReader.result });
      document.getElementById(`${formType}-cmt-img-${postId}-${parentCommentId}`).style.display = 'inline-block';
    }

    if (file) fileReader.readAsDataURL(file); 
  };

  const openFileLoader = () => {
    document.getElementById(`${formType}-media-input-${postId}-${parentCommentId}`).click();
  };

  const removeFile = () => {
    setFormState({
      ...formState,       
      media: null,
      mediaUrl: null
    });
    document.getElementById(`${formType}-media-input-${postId}-${parentCommentId}`).value = null;
    document.getElementById(`${formType}-cmt-img-${postId}-${parentCommentId}`).style.display = 'none';
  };

  const ensureContent = () => {
    const { media, body } = formState;

    if (media || body.length) {
      return true;
    } else {
      return false
    }
  };

  const postComment = () => {
    const formData = new FormData();
    if (formState.media) {
      formData.append('comment[media]', formState.media);
    }
    formData.append('comment[body]', formState.body);
    formData.append('comment[user_id]', currentUser);
    formData.append('comment[post_id]', postId);
    if (parentCommentId) {
      formData.append('comment[parent_comment_id]', parentCommentId);
    }
    
    createComment(formData);
    setFormState({
      body: "",
      media: null,
      mediaUrl: null
    });
    document.getElementById(`${formType}-media-input-${postId}-${parentCommentId}`).value = "";
    document.getElementById(`${formType}-cmt-img-${postId}-${parentCommentId}`).style.display = 'none';
    incrComCount();
    incrRepCount ? incrRepCount() : null;
  };
  
  const preview = formState.mediaUrl 
    ? <img src={formState.mediaUrl}/> 
    : null;
  const closeImageBtn = formState.media 
    ? (<span className='rm-cmt-img' onClick={removeFile}>✕</span>) 
    : null;

  return (
    <div className='cmt-form-section'>
      <div className='avatar small'>
        <img src={user.avatarUrl || window.defaultUser} alt="Profile Pic" className='pfp small'/>
      </div>
      <div className='cmt-form-ctnr'>
        <div className='comment-form'>
          <div className='cmt-input-div'>
            <input type="text" placeholder={formMsg} 
            value={formState.body} onChange={handleInput}/>
            {formState.media 
              ? null 
              : <i className="far fa-image cmt" onClick={openFileLoader}></i>
            }
            <input type="file" 
                   id={`${formType}-media-input-${postId}-${parentCommentId}`} 
                   accept='image/*' 
                   onChange={handleFile}
            />
          </div>
          <div className='cmt-img-preview'>
            <div id={`${formType}-cmt-img-${postId}-${parentCommentId}`}>
              {closeImageBtn}
              {preview}
            </div>
          </div>
        </div>
        {ensureContent() 
          ? (<div>
               <button className='post-cmt-btn' onClick={postComment}>
                 Post
               </button>
             </div>)
          : null
        }
      </div>
    </div>
  );
};

export default CommentForm;