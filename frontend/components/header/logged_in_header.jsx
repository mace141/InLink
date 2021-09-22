import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/session';
import SearchBar from './search_bar';

const LoggedIn = ({
  user,
  history,
  logoutUser
}) => {
  const [drop, setDrop] = useState(false);

  const clicked = () => {
    setDrop(true);
  };

  const leave = () => {
    setDrop(false);
  };

  const profile = user.avatarUrl || window.defaultUser;

  return (
    <>
      <nav className='left-nav-bar'>
        <Link to='/'>
          <div className='icon-logo'>
            <img src={window.iconLogo} alt="InLink-icon-logo" className='InLink-icon-logo'/>
          </div>
        </Link>
        <SearchBar/>
      </nav>
      <nav className='right-nav-bar'>
        <Link to='/feed'>
          <div className='nav-icon'>
            <i className="fas fa-home"></i>
            <p>Home</p>
          </div>
        </Link>
        <Link to='/mynetwork'>
          <div className='nav-icon'>
            <i className="fas fa-user-friends"></i>
            <p>My Network</p>
          </div>
        </Link>
        <button onFocus={clicked} onBlur={leave} className='user-sesh-btn'>
          <div className='header-avatar'>
            <div className='avatar'>
              <img src={profile} alt="Profile Pic" className='pfp small'/>
            </div>
            <p>Me <span className='arrow-down'></span></p>
          </div>
          <ul className={'header-dropdown ' + (drop ? 'reveal' : 'hide')}>
            <li>
              <div>
                <div className='avatar'>
                  <img src={profile} alt="Profile Pic" className='pfp'/>
                </div>
                <div>
                  <p>{`${user.fname} ${user.lname}`}</p>
                  <p>{user.headline}</p>
                </div>
              </div>
              <div className='pf-btn' onClick={() => {
                history.push(`/users/${user.id}`);
                leave();
              }}>View Profile</div>
            </li>
            <li onClick={logoutUser}>Sign Out</li>
          </ul>
        </button>
      </nav>
    </>
  );
};

const mapSTP = ({ entities: { users }, session: { currentUser } }) => ({
  user: users[currentUser]
});

const mapDTP = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

const LoggedInHeader = withRouter(connect(mapSTP, mapDTP)(LoggedIn));

export default LoggedInHeader;