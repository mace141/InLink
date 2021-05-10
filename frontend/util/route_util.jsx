import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const mapSTP = ({ session: { currentUser }}) => ({
  loggedIn: Boolean(currentUser)
});

const Auth = ({ component: Component, loggedIn, path, exact }) => (
  <Route exact={exact} path={path} render={props => (
    loggedIn ? <Redirect to='/feed'/> : <Component { ...props }/>
  )}/>
);

const Protected = ({ component: Component, loggedIn, path, exact }) => (
  <Route exact={exact} path={path} render={props => (
    !loggedIn ? <Redirect to='/'/> : <Component { ...props }/> 
  )}/>
);

export const AuthRoute = connect(mapSTP)(Auth);
export const ProtectedRoute = connect(mapSTP)(Protected);