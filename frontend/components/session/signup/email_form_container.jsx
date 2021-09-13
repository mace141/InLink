import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { receiveUserEmail, loginUser } from '../../../actions/session';
import { checkUserEmail } from '../../../util/session_api';

const errors = {
  emailMsg: 'Please enter a valid email address',
  passwordMsg: 'Password must be 6 characters or more'
};

const EmailForm = ({ 
  user,
  history,
  checkUserEmail,
  receiveUserEmail,
  loginUser
}) => {
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState(user.password || '');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleInput = (field) => {
    return e => {
      const value = e.target.value;
      if (field === 'email') {
        setEmail(value);
      } else {
        setPassword(value);
      }
    }
  };

  const handleErrors = () => {
    let errorBool = false;

    if (password.length < 6) {
      setPasswordError(true);
      errorBool = true;
    }
    
    if (!email.length) {
      errors.emailMsg = 'Please enter your email address';
      setEmailError(true);
      errorBool = true;
    } else {
      const emailArr = email.split('@');
      if (!(emailArr.length === 2 && emailArr[1] && emailArr[1].split('.').length === 2)) {
        setEmailError(true);
        errorBool = true;
      } else {
        checkUserEmail({ email, password }).then(user => {
          if (user) {
            errorBool = true;
            errors.emailMsg = 'Email is already taken';
            setEmailError(true);
          }

          if (!errorBool) {
            receiveUserEmail({ email, password });
            history.push('/signup/name');
          }
        });
      }
    }

    return errorBool;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError(false);
    setEmailError(false);
    errors.emailMsg = 'Please enter a valid email';
    
    handleErrors();
  };

  const handleDemo = (e) => {
    e.preventDefault();
    loginUser({
      email: 'guest@user.com',
      password: 'password'
    });
  };

  return (
    <div className='signup-form'>
      <h2>Make the most of your professional life</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" 
               value={email} 
               className={emailError ? 'input-error' : ''} 
               onChange={handleInput('email')}
        />
        {emailError 
          ? <p className='error-msg'>{errors.emailMsg}</p> 
          : null
        }

        <label>Password (6 or more characters)</label>
        <input type="password" 
               value={password} 
               className={passwordError ? 'input-error' : ''} 
               onChange={handleInput('password')}
        />
        {passwordError 
          ? <p className='error-msg'>{errors.passwordMsg}</p> 
          : null
        }

        <button type='submit' className='form-button'>Join InLink</button>
        <button  className='form-button' onClick={handleDemo}>Demo User</button>
        <p className='session-redirect-msg'>
          Already on InLink? <Link to='/login' 
                                   className='session-redirect-link'
                             >Sign In</Link>
        </p>
      </form>
    </div>
  )
};

const mapSTP = ({ session: { signUp } }) => ({
  user: signUp
});

const mapDTP = dispatch => ({
  receiveUserEmail: email => dispatch(receiveUserEmail(email)),
  loginUser: user => dispatch(loginUser(user)),
  checkUserEmail: user => checkUserEmail(user)
});

const EmailFormContainer = connect(mapSTP, mapDTP)(EmailForm);

export default EmailFormContainer;