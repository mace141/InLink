import React from 'react';
import { Switch } from "react-router";
import { AuthRoute } from "../../../util/route_util";
import EmailFormContainer from './email_form_container';

const SignUpFormContainer = () => (
  <Switch>
    <AuthRoute exact path='/signup' component={EmailFormContainer}/>
  </Switch>
);

export default SignUpFormContainer;