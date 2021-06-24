import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/session';

class EditIntro extends React.Component {
  constructor(props) {
    super(props);

    const [city, state, country] = this.props.user.location.split(', ');
    this.state = {
      ...this.props.user,
      country: country,
      state: state,
      city: city,
      fnameErr: false,
      lnameErr: false,
      headlineErr: false,
      countryErr: false,
      stateErr: false,
      cityErr: false,
      industryErr: false
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkError = this.checkError.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  checkError(field) {
    return e => {
      if (e.target.value == '') {
        this.setState({ [field]: true });
      } else {
        this.setState({ [field]: false });
      }
    }
  }

  handleErrors() {
    return Object.values(this.state).some(el => el == true);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { country, state, city } = this.state;
    
    if (!this.handleErrors()) {
      this.props.updateUser({
        ...this.state,
        location: `${city}, ${state}, ${country}`
      });
      
      this.props.closeModal();
    }
  }

  render() {
    const {
      fname, lname, headline, industry, summary, country, state, city, fnameErr, 
      lnameErr, headlineErr, countryErr, stateErr, cityErr, industryErr
    } = this.state;
    

    return (
      <div className='modal edit-intro'>
        <header>
          <h2>Edit Intro</h2>
          <span className='close-modal-button' onClick={() => this.props.closeModal()}>✕</span>
        </header>
        <form>
          <div className='intro name'>
            <div>
              <label>First Name *</label>
              <input type="text" value={fname} className={fnameErr ? 'input-error' : ''}
                     onChange={this.handleInput('fname')} 
                     onBlur={this.checkError('fnameErr')}
              />
              {fnameErr ? <p className='error-msg'>Please enter your first name</p> : null}
            </div>
            <div>
              <label>Last Name *</label>
              <input type="text" value={lname} className={lnameErr ? 'input-error' : ''}
                     onChange={this.handleInput('lname')} 
                     onBlur={this.checkError('lnameErr')}
              />
              {lnameErr ? <p className='error-msg'>Please enter your last name</p> : null}
            </div>
          </div>
          <label>Headline *</label>
          <input type="text" value={headline} className={headlineErr ? 'input-error' : ''}
                 onChange={this.handleInput('headline')} 
                 onBlur={this.checkError('headlineErr')}
          />
          {headlineErr ? <p className='error-msg'>Please enter a headline</p> : null}
          <div className='intro location'>
            <div className='intro country'>
              <label>Country *</label>
              <input type="text" value={country} className={countryErr ? 'input-error' : ''}
                     onChange={this.handleInput('country')} 
                     onBlur={this.checkError('countryErr')}
              />
              {countryErr ? <p className='error-msg'>Please enter your country</p> : null}
            </div>
            <div className='intro state'>
              <label>State *</label>
              <input type="text" value={state} className={stateErr ? 'input-error' : ''}
                     onChange={this.handleInput('state')} 
                     onBlur={this.checkError('stateErr')}
              />
              {stateErr ? <p className='error-msg'>Please enter your state</p> : null}
            </div>
            <div className='intro city'>
              <label>City *</label>
              <input type="text" value={city} className={cityErr ? 'input-error' : ''}
                     onChange={this.handleInput('city')} 
                     onBlur={this.checkError('cityErr')}
              />
              {cityErr ? <p className='error-msg'>Please enter your city</p> : null}
            </div>
          </div>
          <label>Industry *</label>
          <input type="text" value={industry} className={industryErr ? 'input-error' : ''}
                 onChange={this.handleInput('industry')} 
                 onBlur={this.checkError('industryErr')}
          />
          {industryErr ? <p className='error-msg'>Please enter your industry</p> : null}
          <label>Summary</label>
          <textarea value={summary} onChange={this.handleInput('summary')}/>
        </form>
        <footer>
          <button onClick={this.handleSubmit}>Save</button>
        </footer>
      </div>
    )
  }
}

const mapSTP = ({ entities: { users }, session: { currentUser } }) => ({
  user: users[currentUser]
});

const mapDTP = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
});

const EditIntroContainer = connect(mapSTP, mapDTP)(EditIntro);

export default EditIntroContainer;