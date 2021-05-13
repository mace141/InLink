import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser, receiveUserStudent } from '../../../actions/session';

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
      schoolErr: false,
      degreeErr: false,
      specErr: false,
      yearErr: false
    };
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleErrors() {
    const { school, degree, specialization, startYr, endYr } = this.state;
    let errorBool = false;

    if (!school.length) {
      this.setState({ schoolErr: true });
      errorBool = true;
    }
    if (!degree.length) {
      this.setState({ degreeErr: true });
      errorBool = true;
    }
    if (!specialization.length) {
      this.setState({ specErr: true });
      errorBool = true;
    }
    if (parseInt(startYr) > parseInt(endYr)) {
      this.setState({ yearErr: true });
      errorBool = true;
    }

    return errorBool;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      schoolErr: false,
      degreeErr: false,
      specErr: false,
      yearErr: false
    })

    if (!this.handleErrors()) {
      const student = {
        headline: 'Student at ' + this.state.school,
        industry: this.state.school,
      };
      this.props.receiveUserStudent(Object.assign({}, this.state, student));
      this.props.createUser(this.props.user);
    }
  }

  render() {
    const years = [];
    for (let i = 1962; i <= 2031; i++) {
      years.unshift(i);
    }
    const { schoolErr, degreeErr, specErr, yearErr } = this.state;

    return (
      <div className='signup-form'>
        <h2>Your profile helps you discover new people and opportunities</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>School or College/University *</label>
          <input type="text" value={this.state.school} onChange={this.handleInput('school')}/>
          {schoolErr ? <p className='error-msg'>Please enter a school or college/university</p> : null }

          <label>Degree *</label>
          <input type="text" value={this.state.degree} onChange={this.handleInput('degree')}/>
          {degreeErr ? <p className='error-msg'>Please enter a degree</p> : null }

          <label>Specialization *</label>
          <input type="text" value={this.state.specialization} onChange={this.handleInput('specialization')}/>
          {specErr ? <p className='error-msg'>Please enter a specialization</p> : null }

          <div className='school-years-signup'>
            <div className='school-year-signup'>
              <label>Start year *</label>
              <select className='yr-selector-signup' onChange={this.handleInput('startYr')}>
                {years.map(yr => {
                  if (yr < 2022) return (<option key={yr} value={yr}>{yr}</option>)
                })}
              </select>
            </div>

            <div className='school-year-signup'>
              <label>End year (or expected) *</label>
              <select className='yr-selector-signup' onChange={this.handleInput('endYr')}>
                {years.map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>
          {yearErr ? <p className='error-msg'>Start year cannot be after end year</p> : null }

          <Link to='/signup/job'>I'm not a student</Link>
          <button type='submit' className='form-button'>Finish</button>
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
  createUser: user => dispatch(createUser(user))
});

const StudentFormContainer = connect(mapSTP, mapDTP)(StudentForm);

export default StudentFormContainer;