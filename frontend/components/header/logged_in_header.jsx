import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/session';

const LoggedIn = ({ logoutUser }) => (
  <>
    <h3>Left Nav Bar</h3>
    <h3>Right Nav Bar</h3>
    <button onClick={logoutUser}>Log Out</button>
  </>
);

const mapDTP = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

const LoggedInHeader = connect(null, mapDTP)(LoggedIn);

export default LoggedInHeader;