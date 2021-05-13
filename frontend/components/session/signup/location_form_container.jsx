import React from 'react';
import { connect } from 'react-redux';
import { receiveUserLocation } from '../../../actions/session';

class LocationForm extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.user;

    this.state = {
      country: user.country || "",
      state: user.state || "",
      city: user.city || ""
    };
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  ensureForm() {
    const { country, state, city } = this.state;

    if (country.length && state.length && city.length) {
      return false;
    } else {
      return true;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const { country, state, city } = this.state;
    const location = city + ', ' + state + ', ' + country;
    this.props.receiveUserLocation(Object.assign({}, this.state, { location }));
    this.props.history.push('/signup/job');
  }

  render() {
    const { countryErr, stateErr, cityErr } = this.state;

    return (
      <div className='signup-form'>
        <h2>Welcome, {this.props.fname}!</h2>
        <form onSubmit={this.handleSubmit.bind(this)} className='signup-form-white'>
          <label>Country *</label>
          <input type="text" value={this.state.country} onChange={this.handleInput('country')}/>
          <label>State *</label>
          <input type="text" value={this.state.state} onChange={this.handleInput('state')}/>
          <label>City *</label>
          <input type="text" value={this.state.city} onChange={this.handleInput('city')}/>
          <button type='submit' className='form-button' disabled={this.ensureForm()}>Next</button>
        </form>
      </div>
    )
  }
}

const mapSTP = ({ session: { signup }}) => ({
  fname: signup.fname,
  user: signup
});

const mapDTP = dispatch => ({
  receiveUserLocation: location => dispatch(receiveUserLocation(location))
});

const LocationFormContainer = connect(mapSTP, mapDTP)(LocationForm);

export default LocationFormContainer;