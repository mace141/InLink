import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { searchUsers } from '../../util/session_api';

let delay;
const debounce = (callback, wait = 250) => {
  return (...args) => {
    clearTimeout(delay);
    delay = setTimeout(() => { callback.apply(null, args); }, wait);
  };
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };

    this.handleInput = this.handleInput.bind(this);
    this.redirectUser = this.redirectUser.bind(this);
  }

  handleInput(e) {
    const that = this;
    debounce(() => {
      searchUsers(e.target.value).then(results => { 
        that.setState({ results }); 
      });
    }, 300)();
  }

  redirectUser(userId) {
    this.setState({ results: [] });
    document.getElementById('search-field').value = '';
    this.props.history.push(`/users/${userId}`);
  }

  render() {
    return (
      <div className='search-container'>
          <input type="text" placeholder='Search' id='search-field' onChange={this.handleInput}/> 
          <ul className='search-results'>
            {this.state.results.map(user => (
              <li key={user.id} onClick={() => { this.redirectUser(user.id) }}>
                <div className='avatar smaller'>
                  <img src={user.avatarUrl || window.defaultUser} alt="Avatar"/>
                </div>
                <p>{`${user.fname} ${user.lname}`} <span>{user.headline}</span></p>
              </li>
            ))}
          </ul>
      </div>
    )
  }
}

export default withRouter(SearchBar);