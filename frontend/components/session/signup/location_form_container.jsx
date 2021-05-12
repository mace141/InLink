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
      city: user.city || "",
      countryErr: false,
      cityErr: false,
      stateErr: false,
    };
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleErrors() {
    const { country, state, city } = this.state;
    let errorBool = false;
    
    if (!country.length) {
      this.setState({ countryErr: true });
      errorBool = true;
    }
    if (!state.length) {
      this.setState({ stateErr: true });
      errorBool = true;
    }
    if (!city.length) {
      this.setState({ cityErr: true });
      errorBool = true;
    }

    return errorBool;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      countryErr: false,
      stateErr: false,
      cityErr: false
    })

    if (!this.handleErrors()) {
      const { country, state, city } = this.state;
      const location = city + ', ' + state + ', ' + country;
      this.props.receiveUserLocation(Object.assign({}, this.state, { location }));
      this.props.history.push('/signup/job');
    }
  }

  render() {
    const { countryErr, stateErr, cityErr } = this.state;

    return (
      <div className='signup-form'>
        <h2>Welcome, {this.props.fname}!</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Country *</label>
          <input type="text" value={this.state.country} onChange={this.handleInput('country')}/>
          {countryErr ? <p className='error-msg'>Please enter your country</p> : null }
          <label>State *</label>
          <input type="text" value={this.state.state} onChange={this.handleInput('state')}/>
          {cityErr ? <p className='error-msg'>Please enter your city</p> : null }
          <label>City *</label>
          <input type="text" value={this.state.city} onChange={this.handleInput('city')}/>
          {stateErr ? <p className='error-msg'>Please enter your state</p> : null }
          <button type='submit'>Next</button>
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