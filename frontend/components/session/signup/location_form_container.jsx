import React from 'react';
import { connect } from 'react-redux';
import { receiveUserLocation } from '../../../actions/session';

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country: "",
      state: "",
      city: ""
    }
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { country, state, city } = this.state;
    const location = city + ', ' + state + ', ' + country;
    this.props.receiveUserLocation({ location });
    this.props.history.push('/signup/job');
  }

  render() {
    return (
      <>
        <h1>Insert logo here</h1>
        <h2>Welcome, {this.props.fname}!</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Country
            <input type="text" value={this.state.country} onChange={this.handleInput('country')}/>
          </label>
          <label>State
            <input type="text" value={this.state.state} onChange={this.handleInput('state')}/>
          </label>
          <label>City
            <input type="text" value={this.state.city} onChange={this.handleInput('city')}/>
          </label>
          <button type='submit'>Next</button>
        </form>
      </>
    )
  }
}

const mapSTP = ({ session: { signup }}) => ({
  fname: signup.fname
});

const mapDTP = dispatch => ({
  receiveUserLocation: location => dispatch(receiveUserLocation(location))
});

const LocationFormContainer = connect(mapSTP, mapDTP)(LocationForm);

export default LocationFormContainer;