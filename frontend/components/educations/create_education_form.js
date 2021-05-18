import { connect } from 'react-redux';
import { createEducation } from '../../actions/education';
import EducationForm from './education_form';

const mapSTP = ({ session: { currentUser } }) => ({
  education: {
    user_id: currentUser,
    school: "",
    degree: "",
    field: "",
    start_year: 2021,
    end_year: 2031,
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