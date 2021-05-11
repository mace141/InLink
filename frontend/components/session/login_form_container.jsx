import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../../actions/session';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
  }

  handleDemo(e) {
    e.preventDefault();
    this.props.loginUser({
      email: "guest@user.com",
      password: 'password'
    });
  }

  render() {
    const [errorOne, errorTwo] = this.props.errors;

    return (
      <> 
        <Link to='/' className='login-logo'>Full Logo</Link>
        <div className='login-form'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <h2>Sign In</h2>
            <p>Stay linked with your professional world</p>
            <input type="text" className='signin-input' placeholder="Email" value={this.state.email} onChange={this.handleInput('email')}/>
            {errorOne ? <p className='error-msg'>{errorOne}</p> : null}
            <input type="password" className='signin-input' placeholder="Password" value={this.state.password} onChange={this.handleInput('password')}/>
            {errorTwo ? <p className='error-msg'>{errorTwo}</p> : null}
            <button type='submit'>Sign In</button>
            <button onClick={this.handleDemo.bind(this)}>Demo User</button>
          </form>
        </div>
      </>
    )
  }
}

const mapSTP = ({ errors: { session }}) => ({
  errors: session
});

const mapDTP = dispatch => ({
  loginUser: user => dispatch(loginUser(user))
});

const LoginFormContainer = connect(mapSTP, mapDTP)(LoginForm);

export default LoginFormContainer;