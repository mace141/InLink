import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HeaderContainer from './header/header';
import LoginFormContainer from '../components/session/login_form_container';
import SignUpFormContainer from '../components/session/signup/signup_form_container';
import MainContainer from './main/main_container';
import Splash from './splash/splash';

const App = ({ sessionPath }) => {
  const header = sessionPath ? null : (
    <header>
      <Route path='/' component={HeaderContainer}/>
    </header>
  );
  return (
  <>
    {header}
    <AuthRoute exact path='/login' component={LoginFormContainer}/>
    <AuthRoute path='/signup' component={SignUpFormContainer}/>
    <ProtectedRoute exact path='/feed' component={MainContainer}/>
    <AuthRoute exact path='/' component={Splash}/>
  </>
)};

const mapSTP = (state, ownProps) => {
  const path = ownProps.location.pathname;
  return ({
  sessionPath: path.includes('/signup') || path == '/login',
})};

const AppContainer = withRouter(connect(mapSTP)(App));

export default AppContainer;