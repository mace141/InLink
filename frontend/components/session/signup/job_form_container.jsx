import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser, receiveUserJob } from '../../../actions/session';

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: "",
      type: "",
      company: "",
    }
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const job = {
      headline: this.state.jobTitle + ' at ' + this.state.company,
      industry: this.state.company
    };
    this.props.receiveUserJob(job);
    this.props.createUser(this.props.user);
  }

  render() {
    const employmentTypes = [
      'Full-time',
      'Part-time',
      'Self-employed',
      'Freelance',
      'Contract',
      'Internship',
      'Apprenticeship',
      'Seasonal'
    ];
    return (
      <>
        <h2>Your profile helps you discover new people and opportunities</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Most recent job title *
            <input type="text" value={this.state.jobTitle} onChange={this.handleInput('jobTitle')}/>
          </label>
          <label>Employment type
            <select onChange={this.handleInput('type')}>
              {employmentTypes.map((type, i) => (
                <option key={i}>{type}</option>
              ))}
            </select>
          </label>
          <label>Most recent company *
            <input type="text" value={this.state.company} onChange={this.handleInput('company')}/>
          </label>
          <Link to='/signup/student'>I'm a student</Link>
          <button type='submit'>Continue</button>
        </form>
      </>
    )
  }
}

const mapSTP = ({ session: { signup } }) => ({
  user: signup
});

const mapDTP = dispatch => ({
  receiveUserJob: job => dispatch(receiveUserJob(job)),
  createUser: user => dispatch(createUser(user))
});

const JobFormContainer = connect(mapSTP, mapDTP)(JobForm);

export default JobFormContainer;