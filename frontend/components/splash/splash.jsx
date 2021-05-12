import React from 'react';
import LoginFormContainer from '../session/login_form_container';

const Splash = () => (
  <div className='splash-div'>
    <div>
      <p className='splash-text'>Welcome to your professional links</p>
      <LoginFormContainer/>
    </div>
    <div>
      <img src={window.splashImg} alt="splashImg" className='splashImg'/>
    </div>
  </div>
);

export default Splash;