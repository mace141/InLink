import React from 'react';

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
    debugger
    return (
      <> 
        <h1>Full Logo</h1>
        <h2>Sign In</h2>
        <p>
          {this.props.errors.join(', ')}
        </p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Email:
            <input type="text" value={this.state.email} onChange={this.handleInput('email')}/>
          </label>
          <label>Password:
            <input type="password" value={this.state.password} onChange={this.handleInput('password')}/>
          </label>
          <button type='submit'>Sign In</button>
        </form>
      </>
    )
  }
}

export default LoginForm;