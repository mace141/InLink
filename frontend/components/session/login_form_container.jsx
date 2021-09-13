import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { loginUser, clearSessionErrors } from '../../actions/session';

const LoginForm = ({ 
  clearSessionErrors, 
  loginUser, 
  errors: [errorOne, errorTwo],
  splash 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    clearSessionErrors();
  }, []);

  const handleInput = (field) => {
    return e => {
      if (e.target.value.length) {
        e.target.classList.add('focused');
      } else {
        e.target.classList.remove('focused');
      }

      const value = e.target.value;
      if (field === 'email') {
        setEmail(value);
      } else {
        setPassword(value);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      email: email.trim(),
      password: password
    })
  };

  const handleDemo = (e) => {
    e.preventDefault();
    loginUser({
      email: "guest@user.com",
      password: 'password'
    })
  };

  const signinPageMsg = (
    <>
      <h2>Sign In</h2>
      <p>Stay linked with your professional world</p>
    </>
  );

  const fullLogo = splash 
    ? null 
    : <Link to='/' 
            className='login-logo'
      >
        <img src={window.fullLogo} 
             alt="InLink-full-logo" 
             className='InLink-full-logo'
        />
      </Link>;

  return (
    <div className='login-section'> 
      {fullLogo}
      <div className='login-form'>
        <form id={ splash ? 'splash-form': '' } 
              onSubmit={handleSubmit}
        >
          {splash ? null : signinPageMsg}
          <div className='input-ctnr'>
            <input type="text" 
                   className={'signin-input' + (errorOne ? ' input-error' : '')} 
                   value={email} 
                   onChange={handleInput('email')}
            />
            <label>Email</label>
          </div>
          {errorOne 
            ? <p className='error-msg'>{errorOne}</p> 
            : null
          }
          <div className='input-ctnr'>
            <input type="password" 
                   className={'signin-input' + (errorTwo ? ' input-error' : '')} 
                   value={password} 
                   onChange={handleInput('password')}
            />
            <label>Password</label>
          </div>
          {errorTwo 
            ? <p className='error-msg'>{errorTwo}</p> 
            : null
          }
          <button type='submit' className='form-button'>Sign In</button>
          <button onClick={handleDemo} 
                  className='form-button'
          >Demo User</button>
          <p className='session-redirect-msg'>
            New to InLink? <Link to='/signup' 
                                 className='session-redirect-link'
                           >Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

const mapSTP = ({ errors: { session }}, ownProps) => ({
  errors: session,
  splash: ownProps.location.pathname === '/'
});

const mapDTP = dispatch => ({
  loginUser: user => dispatch(loginUser(user)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
});

const LoginFormContainer = withRouter(connect(mapSTP, mapDTP)(LoginForm));

export default LoginFormContainer;