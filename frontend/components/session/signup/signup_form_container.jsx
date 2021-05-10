import React from 'react';
import { Switch } from "react-router";
import { AuthRoute } from "../../../util/route_util";
import EmailFormContainer from './email_form_container';
import LocationFormContainer from './location_form_container';
import NameFormContainer from './name_form_container';
import JobFormContainer from './job_form_container';
import StudentFormContainer from './student_form_container';

const SignUpFormContainer = () => (
  <Switch>
    <AuthRoute exact path='/signup/student' component={StudentFormContainer}/>
    <AuthRoute exact path='/signup/job' component={JobFormContainer}/>
    <AuthRoute exact path='/signup/location' component={LocationFormContainer}/>
    <AuthRoute exact path='/signup/name' component={NameFormContainer}/>
    <AuthRoute exact path='/signup' component={EmailFormContainer}/>
  </Switch>
);

export default SignUpFormContainer;