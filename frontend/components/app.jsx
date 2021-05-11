import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import HeaderContainer from './header/header';
import LoginFormContainer from '../components/session/login_form_container';
import SignUpFormContainer from '../components/session/signup/signup_form_container';
import MainContainer from './main/main_container';
import Splash from './splash/splash';

const App = () => (
  <>
    <header>
      <Route path='/' component={HeaderContainer}/>
    </header>
    <AuthRoute exact path='/login' component={LoginFormContainer}/>
    <AuthRoute path='/signup' component={SignUpFormContainer}/>
    <ProtectedRoute exact path='/feed' component={MainContainer}/>
    <AuthRoute exact path='/' component={Splash}/>
  </>
);

export default App