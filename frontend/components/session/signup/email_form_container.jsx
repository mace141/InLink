import React from 'react';
import { connect } from 'react-redux';
import { receiveUserEmail } from '../../../actions/session';

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

  render() {
    return (
      <>
        <h1>Insert logo here</h1>
        <h2>Make the most of your professional life</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Email: 
            <input type="text" value={this.state.email} onChange={this.handleInput('email')}/>
          </label>
          <label>Password (6 or more characters)
            <input type="password" value={this.state.password} onChange={this.handleInput('password')}/>
          </label>
          <button type='submit'>Join InLink</button>
        </form>
      </>
    )
  }
}

const mapDTP = dispatch => ({
  receiveUserEmail: email => dispatch(receiveUserEmail(email))
});

const EmailFormContainer = connect(null, mapDTP)(EmailForm);

export default EmailFormContainer;