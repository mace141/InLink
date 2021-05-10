import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util';
import HeaderContainer from './header/header';
import LoginFormContainer from '../components/session/login_form_container';

const App = () => (
  <>
    <header>
      <h1>InLink</h1>
      <HeaderContainer/>
    </header>
    <AuthRoute exact={true} path='/login' component={LoginFormContainer}/>
    {/* <AuthRoute exact path='/signup' component={SignUpForm}/> */}

  </>
);

export default App