import React from 'react';
import { connect } from 'react-redux';
import { receiveUserName } from '../../../actions/session';

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    const user = this.props.user;

    this.state = {
      fname: user.fname,
      lname: user.lname
    };
  }

  handleInput(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.receiveUserName(this.state);
    this.props.history.push('/signup/location')
  }

  render() {
    return (
      <div className='signup-form'>
        <h2>Make the most of your professional life</h2>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>First name</label>
          <input type="text" value={this.state.fname} onChange={this.handleInput('fname')}/>
          <label>Last name</label>
          <input type="text" value={this.state.lname} onChange={this.handleInput('lname')}/>
          <button type='submit'>Continue</button>
        </form>
      </div>
    )
  }
}

const mapSTP = ({ session: { signup } }) => ({
  user: signup
});


const mapDTP = dispatch => ({
  receiveUserName: name => dispatch(receiveUserName(name))
});

const NameFormContainer = connect(mapSTP, mapDTP)(NameForm);

export default NameFormContainer;