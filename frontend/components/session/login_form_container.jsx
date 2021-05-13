import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
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
    const { splash } = this.props;
    const signinPageMsg = (
      <>
        <h2>Sign In</h2>
        <p>Stay linked with your professional world</p>
      </>
    );
    const fullLogo = splash ? null : <Link to='/' className='login-logo'><img src={window.fullLogo} alt="InLink-full-logo" className='InLink-full-logo'/></Link>;

    return (
      <div className='login-section'> 
        {fullLogo}
        <div className='login-form'>
          <form id={ splash ? 'splash-form': '' } onSubmit={this.handleSubmit.bind(this)}>
            {splash ? null : signinPageMsg }
            <input type="text" className='signin-input' placeholder="Email" value={this.state.email} onChange={this.handleInput('email')}/>
            {errorOne ? <p className='error-msg'>{errorOne}</p> : null}
            <input type="password" className='signin-input' placeholder="Password" value={this.state.password} onChange={this.handleInput('password')}/>
            {errorTwo ? <p className='error-msg'>{errorTwo}</p> : null}
            <button type='submit' className='form-button'>Sign In</button>
            <button onClick={this.handleDemo.bind(this)} className='form-button'>Demo User</button>
            <p className='session-redirect-msg'>New to InLink? <Link to='/signup' className='session-redirect-link'>Sign Up</Link></p>
          </form>
        </div>
      </div>
    )
  }
}

const mapSTP = ({ errors: { session }}, ownProps) => ({
  errors: session,
  splash: ownProps.location.pathname == '/'
});

const mapDTP = dispatch => ({
  loginUser: user => dispatch(loginUser(user))
});

const LoginFormContainer = withRouter(connect(mapSTP, mapDTP)(LoginForm));

export default LoginFormContainer;