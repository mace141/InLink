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
      </div>
    </div>
  </>
);

export default Splash;

// <p className='splash-creds'>Illustration by <a href="https://icons8.com/illustrations/author/5d99891e7dca3d0016cd4e34">Julia</a> from <a href="https://icons8.com/illustrations">Ouch!</a></p>