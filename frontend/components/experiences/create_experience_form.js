import { connect } from 'react-redux';
import { createExperience } from '../../actions/experience';
import ExperienceForm from './experience_form';

const mapSTP = ({ session: { currentUser } }) => ({
  experienceProp: {
    userId: currentUser,
    title: "",
    employmentType: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    industry: "",
    headline: "",
    description: ""
  },
  formType: 'Add experience'
});

const mapDTP = dispatch => ({
  processForm: experience => dispatch(createExperience(experience))
});

const CreateExperienceForm = connect(mapSTP, mapDTP)(ExperienceForm);

export default CreateExperienceForm;