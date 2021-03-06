import { connect } from 'react-redux';
import { updateExperience, deleteExperience } from '../../actions/experience';
import ExperienceForm from './experience_form';

const mapSTP = ({ entities: { experiences }, ui: { filter } }) => ({
  experienceProp: experiences[filter],
  formType: 'Edit experience'
});

const mapDTP = dispatch => ({
  processForm: experience => dispatch(updateExperience(experience)),
  deleteExperience: experienceId => dispatch(deleteExperience(experienceId))
});

const EditExperienceForm = connect(mapSTP, mapDTP)(ExperienceForm);

export default EditExperienceForm;