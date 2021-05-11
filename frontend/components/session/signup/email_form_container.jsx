import React from 'react';
import { connect } from 'react-redux';
import { receiveUserEmail, loginUser } from '../../../actions/session';

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.receiveUserEmail(this.state);
    this.props.history.push('/signup/name')
  }

  handleDemo(e) {
    e.preventDefault();
    this.props.loginUser({
      email: 'guest@user.com',
      password: 'password'
    })
  }

  render() {
    return (
      <>
        <h2>Make the most of your professional life</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Email</label>
          <input type="text" value={this.state.email} onChange={this.handleInput('email')}/>
          <label>Password (6 or more characters)</label>
          <input type="password" value={this.state.password} onChange={this.handleInput('password')}/>
          <button onClick={this.handleDemo.bind(this)}>Demo User</button>
          <button type='submit'>Join InLink</button>
        </form>
      </>
    )
  }
}

const mapDTP = dispatch => ({
  receiveUserEmail: email => dispatch(receiveUserEmail(email)),
  loginUser: user => dispatch(loginUser(user))
});

const EmailFormContainer = connect(null, mapDTP)(EmailForm);

export default EmailFormContainer;