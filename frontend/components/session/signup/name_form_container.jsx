import React, { useState } from 'react';
import { connect } from 'react-redux';
import { receiveUserName } from '../../../actions/session';

const NameForm = ({ user, history, receiveUserName }) => {
  const [fname, setFname] = useState(user.fname || '');
  const [lname, setLname] = useState(user.lname || '');
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);

  const handleInput = (field) => {
    return e => {
      const value = e.target.value;
      if (field === 'fname') {
        setFname(value);
      } else {
        setLname(value);
      }
    };
  }

  const handleErrors = () => {
    let errorBool = false;

    if (!fname.length) {
      setFnameError(true);
      errorBool = true;
    }
    if (!lname.length) {
      setLnameError(true);
      errorBool = true;
    }

    return errorBool;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFnameError(false);
    setLnameError(false);

    if (!handleErrors()) {
      receiveUserName({fname, lname});
      history.push('/signup/location');
    }
  }

  return (
    <div className='signup-form'>
      <h2>Make the most of your professional life</h2>
      <form onSubmit={handleSubmit.bind(this)}>
        <label>First name</label>
        <input type="text" 
               value={fname} 
               className={fnameError ? 'input-error' : ''} 
               onChange={handleInput('fname')}
        />
        {fnameError 
          ? <p className='error-msg'>Please enter your first name</p> 
          : null
        }
        <label>Last name</label>
        <input type="text" 
               value={lname} 
               className={lnameError ? 'input-error' : ''} 
               onChange={handleInput('lname')}
        />
        {lnameError 
          ? <p className='error-msg'>Please enter your last name</p> 
          : null
        }
        <button type='submit' className='form-button'>Continue</button>
      </form>
    </div>
  )
  
}

const mapSTP = ({ session: { signUp } }) => ({
  user: signUp
});


const mapDTP = dispatch => ({
  receiveUserName: name => dispatch(receiveUserName(name))
});

const NameFormContainer = connect(mapSTP, mapDTP)(NameForm);

export default NameFormContainer;