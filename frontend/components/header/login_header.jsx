import React from 'react';
import { Link } from 'react-router-dom';

const LoginHeader = () => (
  <>
    <Link to='/signup'>Join Now</Link>
    <Link to='/login'>Sign In</Link>
  </>
);

export default LoginHeader;