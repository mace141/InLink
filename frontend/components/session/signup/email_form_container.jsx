import React from 'react';
import { connect } from 'react-redux';
import { receiveUserEmail, loginUser } from '../../../actions/session';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.user;

    this.state = {
      email: user.email || "",
      password: user.password || "",
      emailErr: false,
      pwErr: false
    };

    this.errors = {
      emailMsg: 'Please enter a valid email address',
      passwordMsg: 'Password must be 6 characters or more'
    };
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleErrors() {
    const { email, password } = this.state;
    let errorBool = false;
    
    if (!email.length) {
      this.errors.emailMsg = 'Please enter your email address';
      this.setState({ emailErr: true });
      errorBool = true;
    } else {
      let emailArr = email.split('@');
      if (!(emailArr.length == 2 && emailArr[1] && emailArr[1].split('.').length == 2)) {
        this.setState({ emailErr: true });
        errorBool = true;
      }
    }

    if (password.length < 6) {
      this.setState({ pwErr: true });
      errorBool = true;
    }

    return errorBool;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ pwErr: false });
    this.setState({ emailErr: false });
    
    if (this.handleErrors() == false) {

      this.props.receiveUserEmail(this.state);
      this.props.history.push('/signup/name');
    }
  }

  handleDemo(e) {
    e.preventDefault();
    this.props.loginUser({
      email: 'guest@user.com',
      password: 'password'
    });
  }

  render() {
    const { emailErr, pwErr } = this.state;
    
    return (
      <div className='signup-form'>
        <h2>Make the most of your professional life</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Email</label>
          <input type="text" value={this.state.email} onChange={this.handleInput('email')}/>
          {emailErr ? <p className='error-msg'>{this.errors.emailMsg}</p> : null }
          <label>Password (6 or more characters)</label>
          <input type="password" value={this.state.password} onChange={this.handleInput('password')}/>
          {pwErr ? <p className='error-msg'>{this.errors.passwordMsg}</p> : null }
          <button type='submit'>Join InLink</button>
          <button onClick={this.handleDemo.bind(this)}>Demo User</button>
        </form>
      </div>
    )
  }
}

const mapSTP = ({ session: { signup } }) => ({
  user: signup
});

const mapDTP = dispatch => ({
  receiveUserEmail: email => dispatch(receiveUserEmail(email)),
  loginUser: user => dispatch(loginUser(user))
});

const EmailFormContainer = connect(mapSTP, mapDTP)(EmailForm);

export default EmailFormContainer;