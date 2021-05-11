import React from 'react';
import { connect } from 'react-redux';
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

  render() {
    return (
      <> 
        <h1 className='login-logo'>Full Logo</h1>
        <div className='login-form'>
          <h2>Sign In</h2>
          <p>
            {this.props.errors.join(', ')}
          </p>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleInput('email')}/>
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleInput('password')}/>
            <button type='submit'>Sign In</button>
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