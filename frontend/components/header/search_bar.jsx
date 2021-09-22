import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { searchUsers } from '../../util/session_api';

let delay;
const debounce = (callback, wait = 250) => {
  return (...args) => {
    clearTimeout(delay);
    delay = setTimeout(() => { callback.apply(null, args); }, wait);
  };
};

const SearchBar = ({ history }) => {
  const [results, setResults] = useState([]);

  const handleInput = (e) => {
    if (e.target.value.length) {
      debounce(() => {
        searchUsers(e.target.value).then(results => { 
          setResults(results);
        });
      }, 300)();
    } else {
      setResults([]);
    }
  };

  const redirectUser = (userId) => {
    setResults([]);
    document.getElementById('search-field').value = '';
    history.push(`/users/${userId}`);
  }

  return (
    <div className='search-container'>
        <input type="text" placeholder='Search' id='search-field' 
                onChange={handleInput}
        /> 
        <i className="fas fa-search"></i>
        <ul className='search-results'>
          {results.map(user => (
            <li key={user.id} onClick={() => { redirectUser(user.id) }}>
              <div className='avatar smaller'>
                <img src={user.avatarUrl || window.defaultUser} alt="Avatar"/>
              </div>
              <p>{`${user.fname} ${user.lname}`} <span>{user.headline}</span></p>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default withRouter(SearchBar);