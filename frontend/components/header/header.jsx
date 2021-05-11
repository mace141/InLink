import React from 'react';
import { connect } from 'react-redux';
import LoginHeader from './login_header';
import LoggedInHeader from './logged_in_header';

const Header = ({ loggedIn, sessionPath }) => {
  return loggedIn ? (
    <>
      <h1>Icon Logo</h1>
      <LoggedInHeader/> 
    </>
  ) : sessionPath ? null : (
    <>
      <h1>Full Logo</h1>
      <LoginHeader/>
    </>
  )
};

const mapSTP = ({ session: { currentUser }}, ownProps) => {
  const path = ownProps.location.pathname;
  return ({
  loggedIn: Boolean(currentUser),
  sessionPath: path.includes('/signup') || path == '/login',
})};

const HeaderContainer = connect(mapSTP)(Header);

export default HeaderContainer;