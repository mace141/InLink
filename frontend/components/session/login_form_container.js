import { connect } from 'react-redux';
import { loginUser } from '../../actions/session';
import LoginForm from './login_form';

const mapDTP = dispatch => ({
  loginUser: user => dispatch(loginUser(user))
});

const LoginFormContainer = connect(null, mapDTP)(LoginForm);

export default LoginFormContainer;