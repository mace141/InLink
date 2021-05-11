import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser, receiveUserStudent } from '../../../actions/session';

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      specialization: "",
      startYr: "",
      endYr: ""
    }
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const student = {
      headline: 'Student at ' + this.state.school,
      industry: this.state.school
    };
    this.props.receiveUserStudent(student);
    this.props.createUser(this.props.user);
  }

  render() {
    const years = [];
    for (let i = 1962; i <= 2031; i++) {
      years.unshift(i);
    }
    return (
      <>
        <h2>Your profile helps you discover new people and opportunities</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>School or College/University *</label>
          <input type="text" value={this.state.school} onChange={this.handleInput('school')}/>
          <label>Degree *</label>
          <input type="text" value={this.state.degree} onChange={this.handleInput('degree')}/>
          <label>Specialization *</label>
          <input type="text" value={this.state.specialization} onChange={this.handleInput('specialization')}/>
          <label>Start year *</label>
          <select onChange={this.handleInput('startYr')}>
            {years.map(yr => {
              if (yr < 2022) return (<option key={yr}>{yr}</option>)
            })}
          </select>
          <label>End year (or expected) *</label>
          <select onChange={this.handleInput('endYr')}>
            {years.map(yr => (
              <option key={yr}>{yr}</option>
            ))}
          </select>
          <Link to='/signup/job'>I'm not a student</Link>
          <button type='submit'>Finish</button>
        </form>
      </>
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