import React from 'react';
import LoginFormContainer from '../session/login_form_container';

const Splash = () => (
  <>
    <div className='splash-div'>
      <div>
        <p className='splash-text'>Welcome to your professional links</p>
        <LoginFormContainer/>
      </div>
      <div>
        <img src={window.splashImg} alt="splashImg" className='splashImg'/>
        <p className='splash-creds'>Illustration by <a href="https://icons8.com/illustrations/author/5d99891e7dca3d0016cd4e34">Julia</a> from <a href="https://icons8.com/illustrations">Ouch!</a></p>
      </div>
    </div>
    <footer className='splash-footer'>
      <div className='features'>
        <p>Implemented Features</p>
        <div>
          <span>Multi-form Authentication</span>
          <span>Form Errors</span>
          <span>Posts</span>
          <span>Infinite Scrolling</span>
          <span>Comments</span>
          <span>Likes</span>
          <span>Connections</span>
          <span>Search</span>
          <span>User Profile</span>
          <span>Image Uploading</span>
        </div>
      </div>
      <div className='plug'>
        <div>
          <div className='avatar large'>
            <img src={window.daniel} alt="Daniel Wu"/>
          </div>
          <p>Daniel Wu</p>
        </div>
        <a href='https://github.com/mace141' target="_blank">
          <div className='nav-icon'>
            <i className="fab fa-github"></i>
          </div>
        </a>
        <a href='https://www.linkedin.com/in/daniel-wu-2995a6140/' target="_blank">
          <div className='nav-icon'>
            <i className="fab fa-linkedin"></i>
          </div>
        </a>
        <a href='https://angel.co/u/daniel-wu-42' target="_blank">
          <div className='nav-icon'>
            <i className="fab fa-angellist"></i>
          </div>
        </a>
      </div>
    </footer>
  </>
);

export default Splash;
