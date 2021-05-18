import { connect } from 'react-redux';
import { updateExperience } from '../../actions/experience';
import ExperienceForm from './experience_form';

const mapSTP = ({ entities: { experiences }, ui: { filter } }) => ({
  experience: experiences[filter],
  formType: 'Edit experience'
});

const mapDTP = dispatch => ({
  processForm: experience => dispatch(updateExperience(experience))
});

const EditExperienceForm = connect(mapSTP, mapDTP)(ExperienceForm);

export default EditExperienceForm;