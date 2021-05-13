import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthRoute } from "../../../util/route_util";
import EmailFormContainer from './email_form_container';
import LocationFormContainer from './location_form_container';
import NameFormContainer from './name_form_container';
import JobFormContainer from './job_form_container';
import StudentFormContainer from './student_form_container';

const SignUpForms = ({ whiteBGR }) => (
  <div className={'signup-section' + (whiteBGR ? ' whitebg' : '')}>
    <Link to='/' className='signup-logo'><img src={window.fullLogo} alt="InLink-full-logo" className='InLink-full-logo'/></Link>
    <AuthRoute exact path='/signup/student' component={StudentFormContainer}/>
    <AuthRoute exact path='/signup/job' component={JobFormContainer}/>
    <AuthRoute exact path='/signup/location' component={LocationFormContainer}/>
    <AuthRoute exact path='/signup/name' component={NameFormContainer}/>
    <AuthRoute exact path='/signup' component={EmailFormContainer}/>
  </div>
);

const whiteBackgroundRoutes = ['/signup/student', '/signup/job', '/signup/location'];

const mapSTP = (state, ownProps) => ({
  whiteBGR: whiteBackgroundRoutes.includes(ownProps.location.pathname)
});

const SignUpFormsContainer = connect(mapSTP)(SignUpForms);

export default SignUpFormsContainer;