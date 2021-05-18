import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchExperiences } from '../../actions/experience';

class ExperienceIndex extends React.Component {
  componentDidMount() {
    this.props.fetchExperiences(this.props.match.params.id);
  }

  render() {
    
    return (
      <ul>
        {this.props.experiences.map(exp => (
          <li>{exp.company}</li>
        ))}
      </ul>
    );
  }
}

const mapSTP = ({ entities: { experiences } }, ownProps) => {
  const mappedExp = Object.values(experiences).filter(
    exp => exp.userId == ownProps.match.params.id
  );

  return {
    experiences: mappedExp
  };
};

const mapDTP = dispatch => ({
  fetchExperiences: userId => dispatch(fetchExperiences(userId))
});

const ExperienceIndexContainer = withRouter(connect(mapSTP, mapDTP)(ExperienceIndex));

export default ExperienceIndexContainer;