import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HeaderContainer from './header/header';
import LoginFormContainer from '../components/session/login_form_container';
import SignUpFormsContainer from '../components/session/signup/signup_form_container';
import Main from './main/main';
import Splash from './splash/splash';
import ModalContainer from './modal/modal';

const App = ({ sessionPath, rootPath }) => {
  const header = sessionPath ? null : (
    <>
      <Route path='/' component={HeaderContainer}/>
    </>
  );

  return (
    <>
      <ModalContainer/>
      {header}
      <section className={rootPath ? 'splash-section' : ''}>
        <section className='main-section'>
          <AuthRoute exact path='/login' component={LoginFormContainer}/>
          <AuthRoute path='/signup' component={SignUpFormsContainer}/>
          <ProtectedRoute path='/' component={Main}/>
          <AuthRoute exact path='/' component={Splash}/>
        </section>
      </section>
    </>
)};

const mapSTP = (state, ownProps) => {
  const path = ownProps.location.pathname;
  return ({
  sessionPath: path.includes('/signup') || path === '/login',
  rootPath: path === '/'
})};

const AppContainer = withRouter(connect(mapSTP)(App));

export default AppContainer;