import React from 'react';
import { Link } from 'react-router-dom';

const LoginHeader = () => (
  <>
  <Link to='/'><img src={window.fullLogo} alt="InLink-full-logo" className='InLink-full-logo'/></Link>
  <nav className='session-nav'>
    <Link to='/signup' className='splash-signup'>Join Now</Link>
    <Link to='/login' className='splash-signin'>Sign In</Link>
  </nav>
  </>
);

export default LoginHeader;