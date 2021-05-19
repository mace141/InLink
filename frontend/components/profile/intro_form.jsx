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
      city: city
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { country, state, city } = this.state;
    
    this.props.updateUser({
      ...this.state,
      location: `${city}, ${state}, ${country}`
    });
  }

  render() {
    const {
      fname, lname, headline, industry, summary, country, state, city
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
              <input type="text" value={fname} onChange={this.handleInput('fname')}/>
            </div>
            <div>
              <label>Last Name *</label>
              <input type="text" value={lname} onChange={this.handleInput('lname')}/>
            </div>
          </div>
          <label>Headline *</label>
          <input type="text" value={headline} onChange={this.handleInput('headline')}/>
          <div className='intro location'>
            <div className='intro country'>
              <label>Country *</label>
              <input type="text" value={country} onChange={this.handleInput('country')}/>
            </div>
            <div className='intro state'>
              <label>State *</label>
              <input type="text" value={state} onChange={this.handleInput('state')}/>
            </div>
            <div className='intro city'>
              <label>City *</label>
              <input type="text" value={city} onChange={this.handleInput('city')}/>
            </div>
          </div>
          <label>Industry *</label>
          <input type="text" value={industry} onChange={this.handleInput('industry')}/>
          <label>Summary *</label>
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