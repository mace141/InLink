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
    
    return (
      <div className='edu-index'>
        <h1>Education</h1>
        <button onClick={() => this.props.openModal('createEdu')} className='open-edu'>
          <i className="fas fa-plus"></i>
        </button>
        <ul>
          {this.props.educations.map(edu => (
            <EducationIndexItemContainer key={edu.id} education={edu}/>
            ))}
        </ul>
      </div>
    );
  }
}

const mapSTP = ({ entities: { educations } }, ownProps) => {
  const mappedEdu = Object.values(educations).filter(
    edu => edu.userId == ownProps.match.params.id
  );

  return {
    educations: mappedEdu
  };
};

const mapDTP = dispatch => ({
  fetchEducations: userId => dispatch(fetchEducations(userId)),
  openModal: (modal, id) => dispatch(openModal(modal, id))
});

const EducationIndexContainer = withRouter(connect(mapSTP, mapDTP)(EducationIndex));

export default EducationIndexContainer;