import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../../../util/session_api';
import { receiveCurrentUser, receiveUserStudent } from '../../../actions/session';
import { createEducation } from '../../../actions/education';

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.user;

    this.state = {
      school: user.school || "",
      degree: user.degree || "",
      specialization: user.specialization || "",
      startYr: user.startYr || 2021,
      endYr: user.endYr || 2031,
      yearErr: false
    };

    this.ensureForm = this.ensureForm.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  ensureForm() {
    const { school, degree, specialization } = this.state;

    if (school.length && degree.length && specialization.length) {
      return false;
    } else {
      return true;
    }
  }

  handleErrors() {
    const { startYr, endYr } = this.state;
    let errorBool = false;

    if (parseInt(startYr) > parseInt(endYr)) {
      this.setState({ yearErr: true });
      errorBool = true;
    }

    return errorBool;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ yearErr: false });

    if (!this.handleErrors()) {
      const student = {
        headline: 'Student at ' + this.state.school,
        industry: this.state.school,
      };
      const { 
        receiveUserStudent, createUser, createEducation, user, dispatch, receiveCurrentUser 
      } = this.props;
      
      receiveUserStudent(Object.assign({}, this.state, student));
      createUser(user).then(payload => {
        dispatch(receiveCurrentUser(payload));
        createEducation({ 
          ...user, 
          user_id: Object.keys(payload.user)[0],
          start_year: user.startYr,
          end_year: user.endYr 
        });
      });
    }
  }

  render() {
    const years = [];
    for (let i = 1962; i <= 2031; i++) {
      years.unshift(i);
    }
    const { yearErr } = this.state;

    return (
      <div className='signup-form'>
        <h2>Your profile helps you discover new people and opportunities</h2>
        <form onSubmit={this.handleSubmit.bind(this)} className='signup-form-white'>
          <label>School or College/University *</label>
          <input type="text" value={this.state.school} onChange={this.handleInput('school')}/>

          <label>Degree *</label>
          <input type="text" value={this.state.degree} onChange={this.handleInput('degree')}/>

          <label>Specialization *</label>
          <input type="text" value={this.state.specialization} onChange={this.handleInput('specialization')}/>

          <div className='school-years-signup'>
            <div className='school-year-signup' >
              <label>Start year *</label>
              <select className={'yr-selector-signup' + (yearErr ? ' input-error' : '')} onChange={this.handleInput('startYr')}>
                {years.map(yr => {
                  if (yr < 2022) return (<option key={yr} value={yr}>{yr}</option>)
                })}
              </select>
            </div>

            <div className='school-year-signup'>
              <label>End year (or expected) *</label>
              <select className={'yr-selector-signup' + (yearErr ? ' input-error' : '')} onChange={this.handleInput('endYr')}>
                {years.map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>
          {yearErr ? <p className='error-msg'>Your end date can’t be earlier than your start date</p> : null }

          <Link to='/signup/job' className='job-student'>I'm not a student</Link>
          <button type='submit' className='form-button js-btn' disabled={this.ensureForm()}>Finish</button>
        </form>
      </div>
    )
  }
}

const mapSTP = ({ session: { signup } }) => ({
  user: signup
});

const mapDTP = dispatch => ({
  receiveUserStudent: student => dispatch(receiveUserStudent(student)),
  createUser: user => createUser(user),
  receiveCurrentUser: user => receiveCurrentUser(user),
  createEducation: education => dispatch(createEducation(education)),
  dispatch
});

const StudentFormContainer = connect(mapSTP, mapDTP)(StudentForm);

export default StudentFormContainer;