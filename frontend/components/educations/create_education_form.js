import { connect } from 'react-redux';
import { createEducation } from '../../actions/education';
import EducationForm from './education_form';

const mapSTP = ({ session: { currentUser } }) => ({
  education: {
    userId: currentUser,
    school: "",
    degree: "",
    field: "",
    startYear: 2021,
    endYear: 2031,
    grade: "",
    activities: "",
    description: ""
  },
  formType: 'Add education'
});

const mapDTP = dispatch => ({
  processForm: education => dispatch(createEducation(education))
});

const CreateEducationForm = connect(mapSTP, mapDTP)(EducationForm);

export default CreateEducationForm;