import React from 'react';
import { connect } from 'react-redux';
import LoginHeader from './login_header';
import LoggedInHeader from './logged_in_header';

const Header = ({ loggedIn, signup }) => {
  return loggedIn ? (
    <>
      <h1>Icon Logo</h1>
      <LoggedInHeader/> 
    </>
  ) : signup ? null : (
    <>
      <h1>Full Logo</h1>
      <LoginHeader/>
    </>
  )
};

const mapSTP = ({ session: { currentUser }}, ownProps) => ({
  loggedIn: Boolean(currentUser),
  signup: ownProps.location.pathname.includes('/signup')
});

const HeaderContainer = connect(mapSTP)(Header);

export default HeaderContainer;