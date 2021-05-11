import { connect } from 'react-redux';
import { loginUser } from '../../actions/session';
import LoginForm from './login_form';

const mapSTP = ({ errors: { session }}) => ({
  errors: session
});

const mapDTP = dispatch => ({
  loginUser: user => dispatch(loginUser(user))
});

const LoginFormContainer = connect(mapSTP, mapDTP)(LoginForm);

export default LoginFormContainer;