import { connect } from 'react-redux';
import NameForm from './name_form';
import { receiveUserName } from '../../../actions/session';

const mapDTP = dispatch => ({
  receiveUserEmail: name => dispatch(receiveUserEmail(name))
});

const NameFormContainer = connect(null, mapDTP)(NameForm);

export default NameFormContainer;