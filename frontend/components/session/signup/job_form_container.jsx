import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../../../util/session_api';
import { receiveUserJob, receiveCurrentUser } from '../../../actions/session';
import { createExperience } from '../../../actions/experience';

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.user;

    this.state = {
      title: user.title || "",
      type: user.type || "",
      company: user.company || ""
    };

    this.ensureForm = this.ensureForm.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  ensureForm() {
    const { title, company } = this.state;

    if (title.length && company.length) {
      return false;
    } else {
      return true;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { 
      receiveUserJob, createUser, createExperience, user, dispatch, receiveCurrentUser 
    } = this.props;
    const job = {
      headline: this.state.title + ' at ' + this.state.company,
      industry: this.state.company
    };
    receiveUserJob(Object.assign({}, this.state, job));

    createUser(user).then(userRes => {
      dispatch(receiveCurrentUser(userRes));
      createExperience({ ...user, user_id: userRes.id });
    });
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
      <div className='signup-form'>
        <h2>Your profile helps you discover new people and opportunities</h2>
        <form onSubmit={this.handleSubmit.bind(this)} className='signup-form-white'>
          <label>Most recent job title *</label>
          <input type="text" value={this.state.title} onChange={this.handleInput('title')}/>
          <label>Employment type</label>
          <select onChange={this.handleInput('type')}>
            {employmentTypes.map((type, i) => (
              <option key={i}>{type}</option>
            ))}
          </select>
          <label>Most recent company *</label>
          <input type="text" value={this.state.company} onChange={this.handleInput('company')}/>
          <Link to='/signup/student' className='job-student'>I'm a student</Link>
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
  receiveUserJob: job => dispatch(receiveUserJob(job)),
  createUser: user => createUser(user),
  receiveCurrentUser: user => receiveCurrentUser(user),
  createExperience: experience => dispatch(createExperience(experience)),
  dispatch
});

const JobFormContainer = connect(mapSTP, mapDTP)(JobForm);

export default JobFormContainer;