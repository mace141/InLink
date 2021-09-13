import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/session';

const EditIntro = ({ 
  user: { 
    location, 
    industry,
    summary
  }, 
  user,
  updateUser, 
  closeModal 
}) => {
  const [prevCity, prevState, prevCountry] = location.split(', ');
  const [formValues, setFormValues] = useState({
    fname: user.fname,
    lname: user.lname,
    headline: user.headline,
    country: prevCountry,
    state: prevState,
    city: prevCity,
    industry,
    summary
  });
  const [formErrors, setFormErrors] = useState({
    fnameErr: false,
    lnameErr: false,
    headlineErr: false,
    countryErr: false,
    stateErr: false,
    cityErr: false,
    industryErr: false,
  });

  const handleInput = (field) => {
    return e => {
      const value = e.target.value;
      setFormValues(prevState => ({ ...prevState, [field]: value }));
    };
  }

  const checkError = (field) => {
    return e => {
      debugger
      if (e.target.value === '') {
        setFormErrors(prevState => ({
          ...prevState,
          [field]: true
        }));
      } else {
        setFormErrors(prevState => ({
          ...prevState,
          [field]: false
        }));
      }
    };
  }

  const handleErrors = () => {
    return Object.values(formErrors).some(el => el === true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!handleErrors()) {
      updateUser({
        id: user.id,
        ...formValues,
        location: `${city}, ${state}, ${country}`
      });
      
      closeModal();
    }
  }
  
  const {
    fname, lname, headline, country, state, city
  } = formValues;
  const { 
    fnameErr, lnameErr, headlineErr, countryErr, stateErr, cityErr, industryErr 
  } = formErrors;
  debugger
  return (
    <div className='modal edit-intro'>
      <header>
        <h2>Edit Intro</h2>
        <span className='close-modal-button' onClick={() => closeModal()}>✕</span>
      </header>
      <form>
        <div className='intro name'>
          <div>
            <label>First Name *</label>
            <input type="text" 
                    value={fname} 
                    className={fnameErr ? 'input-error' : ''}
                    onChange={handleInput('fname')} 
                    onBlur={checkError('fnameErr')}
            />
            {fnameErr 
              ? <p className='error-msg'>Please enter your first name</p> 
              : null
            }
          </div>
          <div>
            <label>Last Name *</label>
            <input type="text" 
                    value={lname} 
                    className={lnameErr ? 'input-error' : ''}
                    onChange={handleInput('lname')} 
                    onBlur={checkError('lnameErr')}
            />
            {lnameErr 
              ? <p className='error-msg'>Please enter your last name</p> 
              : null
            }
          </div>
        </div>
        <label>Headline *</label>
        <input type="text" 
                value={headline} 
                className={headlineErr ? 'input-error' : ''}
                onChange={handleInput('headline')} 
                onBlur={checkError('headlineErr')}
        />
        {headlineErr 
          ? <p className='error-msg'>Please enter a headline</p> 
          : null
        }
        <div className='intro location'>
          <div className='intro country'>
            <label>Country *</label>
            <input type="text" 
                    value={country} 
                    className={countryErr ? 'input-error' : ''}
                    onChange={handleInput('country')} 
                    onBlur={checkError('countryErr')}
            />
            {countryErr 
              ? <p className='error-msg'>Please enter your country</p> 
              : null
            }
          </div>
          <div className='intro state'>
            <label>State *</label>
            <input type="text" 
                    value={state} 
                    className={stateErr ? 'input-error' : ''}
                    onChange={handleInput('state')} 
                    onBlur={checkError('stateErr')}
            />
            {stateErr 
              ? <p className='error-msg'>Please enter your state</p> 
              : null
            }
          </div>
          <div className='intro city'>
            <label>City *</label>
            <input type="text" 
                    value={city} 
                    className={cityErr ? 'input-error' : ''}
                    onChange={handleInput('city')} 
                    onBlur={checkError('cityErr')}
            />
            {cityErr 
              ? <p className='error-msg'>Please enter your city</p> 
              : null
            }
          </div>
        </div>
        <label>Industry *</label>
        <input type="text" 
                value={formValues.industry} 
                className={industryErr ? 'input-error' : ''}
                onChange={handleInput('industry')} 
                onBlur={checkError('industryErr')}
        />
        {industryErr 
          ? <p className='error-msg'>Please enter your industry</p> 
          : null
        }
        <label>Summary</label>
        <textarea value={formValues.summary || ''} onChange={handleInput('summary')}/>
      </form>
      <footer>
        <button onClick={handleSubmit} disabled={handleErrors()}>Save</button>
      </footer>
    </div>
  )
}

const mapSTP = ({ entities: { users }, session: { currentUser } }) => ({
  user: users[currentUser]
});

const mapDTP = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
});

const EditIntroContainer = connect(mapSTP, mapDTP)(EditIntro);

export default EditIntroContainer;