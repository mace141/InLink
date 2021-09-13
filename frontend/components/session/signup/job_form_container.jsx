import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../../../util/session_api';
import { receiveUserJob, receiveCurrentUser } from '../../../actions/session';
import { createExperience } from '../../../actions/experience';

const JobForm = ({
  user, 
  dispatch, 
  receiveUserJob, 
  createUser, 
  createExperience, 
  receiveCurrentUser 
}) => {
  const [title, setTitle] = useState(user.title || '');
  const [
    employmentType, 
    setEmploymentType
  ] = useState(user.employment_type || 'Full-time');
  const [company, setCompany] = useState(user.company || '');

  const handleInput = (field) => {
    return e => {
      const value = e.target.value;
      switch (field) {
        case 'title':
          setTitle(value);
          break;
        case 'company':
          setCompany(value);
          break;
        case 'employment type':
          setEmploymentType(value);
          break;
        default:
          break;
      }
    };
  };

  const ensureForm = () => {
    if (title.length && company.length) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const job = {
      headline: title + ' at ' + company,
      industry: company,
      company,
      title,
      employment_type: employmentType
    };
    receiveUserJob(job);
    createUser({ ...user, ...job }).then(payload => {
      dispatch(receiveCurrentUser(payload));
      createExperience({ 
        ...job, 
        user_id: Object.keys(payload.user)[0] 
      });
    });
  };

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
      <form onSubmit={handleSubmit.bind(this)} className='signup-form-white'>
        <label>Most recent job title *</label>
        <input type="text" value={title} onChange={handleInput('title')}/>
        <label>Employment type</label>
        <select onChange={handleInput('employment type')}>
          {employmentTypes.map((type, i) => (
            <option key={i}>{type}</option>
          ))}
        </select>
        <label>Most recent company *</label>
        <input type="text" value={company} onChange={handleInput('company')}/>
        <Link to='/signup/student' className='job-student'>I'm a student</Link>
        <button type='submit' className='form-button js-btn' disabled={ensureForm()}>Finish</button>
      </form>
    </div>
  )
};

// class JobForm extends React.Component {
//   constructor(props) {
//     super(props);
//     const user = this.props.user;

//     this.state = {
//       title: user.title || "",
//       employment_type: user.employment_type || "Full-time",
//       company: user.company || ""
//     };

//     this.ensureForm = this.ensureForm.bind(this);
//   }

//   handleInput(field) {
//     return e => this.setState({ [field]: e.target.value });
//   }

//   ensureForm() {
//     const { title, company } = this.state;

//     if (title.length && company.length) {
//       return false;
//     } else {
//       return true;
//     }
//   }

//   handleSubmit(e) {
//     e.preventDefault();

//     const { 
//       receiveUserJob, createUser, createExperience, user, dispatch, receiveCurrentUser 
//     } = this.props;
//     const job = {
//       headline: this.state.title + ' at ' + this.state.company,
//       industry: this.state.company,
//       ...this.state
//     };
//     receiveUserJob({ ...job });

//     createUser({ ...user, ...job }).then(payload => {
//       dispatch(receiveCurrentUser(payload));
//       createExperience({ 
//         ...job, 
//         user_id: Object.keys(payload.user)[0] 
//       });
//     });
//   }

//   render() {
//     const employmentTypes = [
//       'Full-time',
//       'Part-time',
//       'Self-employed',
//       'Freelance',
//       'Contract',
//       'Internship',
//       'Apprenticeship',
//       'Seasonal'
//     ];

//     return (
//       <div className='signup-form'>
//         <h2>Your profile helps you discover new people and opportunities</h2>
//         <form onSubmit={this.handleSubmit.bind(this)} className='signup-form-white'>
//           <label>Most recent job title *</label>
//           <input type="text" value={this.state.title} onChange={this.handleInput('title')}/>
//           <label>Employment type</label>
//           <select onChange={this.handleInput('employment_type')}>
//             {employmentTypes.map((type, i) => (
//               <option key={i}>{type}</option>
//             ))}
//           </select>
//           <label>Most recent company *</label>
//           <input type="text" value={this.state.company} onChange={this.handleInput('company')}/>
//           <Link to='/signup/student' className='job-student'>I'm a student</Link>
//           <button type='submit' className='form-button js-btn' disabled={this.ensureForm()}>Finish</button>
//         </form>
//       </div>
//     )
//   }
// }

const mapSTP = ({ session: { signUp } }) => ({
  user: signUp
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