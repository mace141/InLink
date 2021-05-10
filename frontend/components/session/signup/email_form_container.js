import { connect } from 'react-redux';
import EmailForm from './email_form';
import { receiveUserEmail } from '../../../actions/session';

const mapDTP = dispatch => ({
  receiveUserEmail: email => dispatch(receiveUserEmail(email))
});

const EmailFormContainer = connect(null, mapDTP)(EmailForm);

export default EmailFormContainer;