import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser, receiveUserJob } from '../../../actions/session';

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.user;

    this.state = {
      jobTitle: user.jobTitle || "",
      type: user.type || "",
      company: user.company || "",
      titleErr: false,
      companyErr: false
    };
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleErrors() {
    const { jobTitle, company } = this.state;
    let errorBool = false;

    if (!jobTitle.length) {
      this.setState({ titleErr: true })
      errorBool = true;
    }
    if (!company.length) {
      this.setState({ companyErr: true })
      errorBool = true;
    }

    return errorBool;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      titleErr: false,
      companyErr: false
    });

    if (!this.handleErrors()) {
      const job = {
        headline: this.state.jobTitle + ' at ' + this.state.company,
        industry: this.state.company
      };
      this.props.receiveUserJob(Object.assign({}, this.state, job));
      this.props.createUser(this.props.user);
    }
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
    const { titleErr, companyErr } = this.state;
    
    return (
      <div className='signup-form'>
        <h2>Your profile helps you discover new people and opportunities</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Most recent job title *</label>
          <input type="text" value={this.state.jobTitle} onChange={this.handleInput('jobTitle')}/>
          {titleErr ? <p className='error-msg'>Please enter your most recent job title</p> : null }
          <label>Employment type</label>
          <select onChange={this.handleInput('type')}>
            {employmentTypes.map((type, i) => (
              <option key={i}>{type}</option>
            ))}
          </select>
          <label>Most recent company *</label>
          <input type="text" value={this.state.company} onChange={this.handleInput('company')}/>
          {companyErr ? <p className='error-msg'>Please enter your most recent company</p> : null }
          <Link to='/signup/student'>I'm a student</Link>
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
  receiveUserJob: job => dispatch(receiveUserJob(job)),
  createUser: user => dispatch(createUser(user))
});

const JobFormContainer = connect(mapSTP, mapDTP)(JobForm);

export default JobFormContainer;