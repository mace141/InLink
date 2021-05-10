import React from 'react';
import { connect } from 'react-redux';
import LoginHeader from './login_header';
import LoggedInHeader from './logged_in_header';

const Header = ({ loggedIn }) => {
  return loggedIn ? (
    <LoggedInHeader/> 
  ) : (
    <LoginHeader/>
  )
};

const mapSTP = ({ session: { currentUser }}) => ({
  loggedIn: Boolean(currentUser)
});

const HeaderContainer = connect(mapSTP)(Header);

export default HeaderContainer;