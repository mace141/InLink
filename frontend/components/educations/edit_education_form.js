import { connect } from 'react-redux';
import { updateEducation } from '../../actions/education';
import EducationForm from './education_form';

const mapSTP = ({ entities: { educations }, ui: { filter } }) => ({
  education: educations[filter],
  formType: 'Edit education'
});

const mapDTP = dispatch => ({
  processForm: education => dispatch(updateEducation(education))
});

const EditEducationForm = connect(mapSTP, mapDTP)(EducationForm);

export default EditEducationForm;