import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchExperiences } from '../../actions/experience';
import { openModal } from '../../actions/modal';
import ExperienceIndexItemContainer from './experience_index_item';

class ExperienceIndex extends React.Component {
  render() {
    const { currentUser, match, openModal, experiences } = this.props;
    const newExpBtn = currentUser == match.params.id ? (
      <button onClick={() => openModal('createExp')} className='open-exp'>
        <i className="fas fa-plus"></i>
      </button>
    ) : null;

    if (!experiences.length) return null;

    return (
      <div className='exp-index'>
        <h1>Experience</h1>
        {newExpBtn}
        <ul>
          {experiences.map(exp => (
            <ExperienceIndexItemContainer key={exp.id} experience={exp}/>
            ))}
        </ul>
      </div>
    );
  }
}

const mapSTP = ({ session: { currentUser } }) =>({
  currentUser
});

const mapDTP = dispatch => ({
  openModal: (modal, id) => dispatch(openModal(modal, id))
});

const ExperienceIndexContainer = withRouter(connect(mapSTP, mapDTP)(ExperienceIndex));

export default ExperienceIndexContainer;