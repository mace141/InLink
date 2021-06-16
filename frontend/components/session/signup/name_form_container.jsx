import React from 'react';
import { connect } from 'react-redux';
import { receiveUserName } from '../../../actions/session';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.user;

    this.state = {
      fname: user.fname || "",
      lname: user.lname || "",
      fnameErr: false,
      lnameErr: false
    };
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleErrors() {
    const { fname, lname } = this.state;
    let errorBool = false;

    if (!fname.length) {
      this.setState({ fnameErr: true });
      errorBool = true;
    }
    if (!lname.length) {
      this.setState({ lnameErr: true });
      errorBool = true;
    }

    return errorBool;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ 
      fnameErr: false, 
      lnameErr: false
    });

    if (!this.handleErrors()) {
      this.props.receiveUserName(this.state);
      this.props.history.push('/signup/location');
    }
  }

  render() {
    const { fnameErr, lnameErr } = this.state;

    return (
      <div className='signup-form'>
        <h2>Make the most of your professional life</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>First name</label>
          <input type="text" value={this.state.fname} className={fnameErr ? 'input-error' : ''} onChange={this.handleInput('fname')}/>
          {fnameErr ? <p className='error-msg'>Please enter your first name</p> : null }
          <label>Last name</label>
          <input type="text" value={this.state.lname} className={lnameErr ? 'input-error' : ''} onChange={this.handleInput('lname')}/>
          {lnameErr ? <p className='error-msg'>Please enter your last name</p> : null }
          <button type='submit' className='form-button'>Continue</button>
        </form>
      </div>
    )
  }
}

const mapSTP = ({ session: { signUp } }) => ({
  user: signUp
});


const mapDTP = dispatch => ({
  receiveUserName: name => dispatch(receiveUserName(name))
});

const NameFormContainer = connect(mapSTP, mapDTP)(NameForm);

export default NameFormContainer;