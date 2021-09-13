import React, { useState } from 'react';
import { connect } from 'react-redux';
import { receiveUserLocation } from '../../../actions/session';

const LocationForm = ({ fname, user, history, receiveUserLocation }) => {
  const [country, setCountry] = useState(user.country || '');
  const [state, setState] = useState(user.state || '');
  const [city, setCity] = useState(user.city || '');

  const handleInput = (field) => {
    return e => {
      const value = e.target.value;
      switch (field) {
        case 'country':
          setCountry(value);
          break;
        case 'state':
          setState(value);
          break;
        case 'city':
          setCity(value);
          break;
        default:
          break;
      }
    };
  };

  const ensureForm = () => {
    if (country.length && state.length && city.length) {
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const location = city + ', ' + state + ', ' + country;

    receiveUserLocation({country, state, city, location});
    history.push('/signup/job');
  };

  return (
    <div className='signup-form'>
      <h2>Welcome, {fname}!</h2>
      <form onSubmit={handleSubmit} className='signup-form-white'>
        <label>Country *</label>
        <input type="text" value={country} onChange={handleInput('country')}/>
        <label>State *</label>
        <input type="text" value={state} onChange={handleInput('state')}/>
        <label>City *</label>
        <input type="text" value={city} onChange={handleInput('city')}/>
        <button type='submit' className='form-button' disabled={ensureForm()}>Next</button>
      </form>
    </div>
  )
};

const mapSTP = ({ session: { signUp }}) => ({
  fname: signUp.fname,
  user: signUp
});

const mapDTP = dispatch => ({
  receiveUserLocation: location => dispatch(receiveUserLocation(location))
});

const LocationFormContainer = connect(mapSTP, mapDTP)(LocationForm);

export default LocationFormContainer;