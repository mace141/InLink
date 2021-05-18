import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchEducations } from '../../actions/education';
import { openModal } from '../../actions/modal';
import EducationIndexItemContainer from './education_index_item';

class EducationIndex extends React.Component {
  componentDidMount() {
    this.props.fetchEducations(this.props.match.params.id);
  }

  render() {
    const { currentUser, match, openModal, educations } = this.props;
    const newEduBtn = currentUser == match.params.id ? (
      <button onClick={() => openModal('createEdu')} className='open-edu'>
        <i className="fas fa-plus"></i>
      </button>
    ) : null;

    // if (!educations.length) return null;

    return (
      <div className='edu-index'>
        <h1>Education</h1>
        {newEduBtn}
        <ul>
          {educations.map(edu => (
            <EducationIndexItemContainer key={edu.id} education={edu}/>
            ))}
        </ul>
      </div>
    );
  }
}

const mapSTP = ({ entities: { educations }, session: { currentUser } }, ownProps) => {
  const mappedEdu = Object.values(educations).filter(
    edu => edu.userId == ownProps.match.params.id
  );

  return {
    educations: mappedEdu,
    currentUser
  };
};

const mapDTP = dispatch => ({
  fetchEducations: userId => dispatch(fetchEducations(userId)),
  openModal: (modal, id) => dispatch(openModal(modal, id))
});

const EducationIndexContainer = withRouter(connect(mapSTP, mapDTP)(EducationIndex));

export default EducationIndexContainer;