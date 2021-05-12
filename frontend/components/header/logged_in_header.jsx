import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/session';

const LoggedIn = ({ logoutUser }) => (
  <>
    <div className='left-nav-bar'>
      <Link to='/'><img src={window.iconLogo} alt="InLink-icon-logo" className='InLink-icon-logo'/></Link>
      <h3>Left Nav Bar</h3>
    </div>
    <div className='right-nav-bar'>
      <h3>Right Nav Bar</h3>
      <button onClick={logoutUser}>Log Out</button>
    </div>
  </>
);

const mapDTP = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

const LoggedInHeader = connect(null, mapDTP)(LoggedIn);

export default LoggedInHeader;