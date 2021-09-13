import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../../../util/session_api';
import { receiveCurrentUser, receiveUserStudent } from '../../../actions/session';
import { createEducation } from '../../../actions/education';

const StudentForm = ({ 
  user, 
  dispatch, 
  receiveUserStudent, 
  receiveCurrentUser, 
  createEducation, 
  createUser 
}) => {
  const [school, setSchool] = useState(user.school || '');
  const [degree, setDegree] = useState(user.degree || '');
  const [specialization, setSpecialization] = useState(user.specialization || '');
  const [startYr, setStartYr] = useState(user.startYr || 2021);
  const [endYr, setEndYr] = useState(user.endYr || 2031);
  const [yearError, setYearError] = useState(false);

  const handleInput = (field) => {
    return e => {
      const value = e.target.value;
      switch (field) {
        case 'school':
          setSchool(value);
          break;
        case 'degree':
          setDegree(value);
          break;
        case 'specialization':
          setSpecialization(value);
          break;
        case 'startYr':
          setStartYr(value);
          break;
        case 'endYr':
          setEndYr(value);
          break;
        default: 
          break;
      }
    };
  };

  const ensureForm = () => {
    if (school.length && degree.length && specialization.length) {
      return false;
    } else {
      return true;
    }
  };

  const handleErrors = () => {
    let errorBool = false;

    if (parseInt(startYr) > parseInt(endYr)) {
      setYearError(true);
      errorBool = true;
    }

    return errorBool;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setYearError(false);

    if (!handleErrors()) {
      const student = {
        headline: 'Student at ' + school,
        industry: school,
        school,
        degree, 
        specialization,
        start_year: startYr,
        end_year: endYr
      };
      
      receiveUserStudent({ ...student });
      createUser({ ...user, ...student }).then(payload => {
        dispatch(receiveCurrentUser(payload));
        createEducation({ 
          ...student,
          user_id: Object.keys(payload.user)[0],
        });
      });
    }
  };

  const years = [];
  for (let i = 1962; i <= 2031; i++) {
    years.unshift(i);
  }

  return (
    <div className='signup-form'>
      <h2>Your profile helps you discover new people and opportunities</h2>
      <form onSubmit={handleSubmit} className='signup-form-white'>
        <label>School or College/University *</label>
        <input type="text" 
               value={school} 
               onChange={handleInput('school')}
        />

        <label>Degree *</label>
        <input type="text" 
               value={degree} 
               onChange={handleInput('degree')}
        />

        <label>Specialization *</label>
        <input type="text" 
               value={specialization} 
               onChange={handleInput('specialization')}
        />

        <div className='school-years-signup'>
          <div className='school-year-signup' >
            <label>Start year *</label>
            <select 
              className={'yr-selector-signup' + (yearError ? ' input-error' : '')} 
              onChange={handleInput('startYr')}
            >
              {years.map(yr => {
                if (yr < 2022) return (<option key={yr} value={yr}>{yr}</option>)
              })}
            </select>
          </div>

          <div className='school-year-signup'>
            <label>End year (or expected) *</label>
            <select 
              className={'yr-selector-signup' + (yearError ? ' input-error' : '')} 
              onChange={handleInput('endYr')}
            >
              {years.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>
        </div>
        {yearError 
          ? <p className='error-msg'>Your end date can’t be earlier than your start date</p> 
          : null 
        }

        <Link to='/signup/job' className='job-student'>I'm not a student</Link>
        <button type='submit' 
                className='form-button js-btn' 
                disabled={ensureForm()}
        >Finish</button>
      </form>
    </div>
  )
};

const mapSTP = ({ session: { signUp } }) => ({
  user: signUp
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