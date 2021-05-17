import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/session';

const LoggedIn = ({ logoutUser }) => (
  <>
    <nav className='left-nav-bar'>
      <Link to='/'><img src={window.iconLogo} alt="InLink-icon-logo" className='InLink-icon-logo'/></Link>
      <h3>Left Nav Bar</h3>
    </nav>
    <nav className='right-nav-bar'>
      <Link to='/feed'>
        <div className='nav-icon'>
          <i className="fas fa-home"></i>
          <p>Home</p>
        </div>
      </Link>
      <Link to='/mynetwork'>
        <div className='nav-icon'>
          <i className="fas fa-user-friends"></i>
          <p>My Network</p>
        </div>
      </Link>
      <button onClick={logoutUser}>Log Out</button>
    </nav>
  </>
);

const mapDTP = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

const LoggedInHeader = connect(null, mapDTP)(LoggedIn);

export default LoggedInHeader;