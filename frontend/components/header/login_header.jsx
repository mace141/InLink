import React from 'react';
import { Link } from 'react-router-dom';

const LoginHeader = () => (
  <nav className='session-nav'>
    <Link to='/signup' className='splash-signup'>Join Now</Link>
    <Link to='/login' className='splash-signin'>Sign In</Link>
  </nav>
);

export default LoginHeader;