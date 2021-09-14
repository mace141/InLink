import React, { useState } from 'react';

const UploadPictureForm = ({ 
  formType, 
  imageType, 
  user, 
  updateUserImg, 
  closeModal 
}) => {
  const [fileState, setFileState] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setFileState(file);
      setFileUrl(fileReader.result);
    };

    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  const removeFile = () => {
    setFileState(null);
    setFileUrl(null);

    document.getElementById('image-input').value = null;
  }

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append(`user[${imageType}]`, fileState);

    updateUserImg(formData, user.id);
    setFileState(null);
    setFileUrl(null);
    document.getElementById('image-input').value = "";
    closeModal();
  }

  const preview = fileState 
    ? <img src={fileUrl} alt={imageType} />
    : <span id='image-input-btn' 
            onClick={() => document.getElementById('image-input').click()}
      >Select an image</span>
    
  const deleteBtn = fileState 
    ? <button onClick={removeFile}>Cancel</button>
    : null;

  return (
    <div className='modal upload-image'>
      <header>{formType}</header>
      <div className='upload-img-body'>
        {preview}
      </div>
      <footer>
        <input type="file" 
               id='image-input' 
               accept='image/*' 
               onChange={handleFile}
        />
        <button onClick={handleSubmit}>Save</button>
        {deleteBtn}
      </footer>
    </div>
  )
}

export default UploadPictureForm;