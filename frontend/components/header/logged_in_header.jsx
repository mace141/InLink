import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/session';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      drop: false 
    };

    this.clicked = this.clicked.bind(this);
    this.leave = this.leave.bind(this);
  }

  clicked() {
    this.setState({ drop: true });
  }

  leave() {
    this.setState({ drop: false });
  }

  render() {
    const { user, logoutUser } = this.props;
    const profile = user.avatarUrl || window.defaultUser;

    return (
      <>
        <nav className='left-nav-bar'>
          <Link to='/'>
            <div className='icon-logo'>
              <img src={window.iconLogo} alt="InLink-icon-logo" className='InLink-icon-logo'/>
            </div>
          </Link>
          <a href='https://github.com/mace141'>
            <div className='nav-icon'>
              <i className="fab fa-github"></i>
            </div>
          </a>
          <a href='https://www.linkedin.com/in/daniel-wu-2995a6140/'>
            <div className='nav-icon'>
              <i className="fab fa-linkedin"></i>
            </div>
          </a>
          <a href='https://angel.co/u/daniel-wu-42' target="_blank">
            <div className='nav-icon'>
              <i className="fab fa-angellist"></i>
            </div>
          </a>
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
          <button onFocus={this.clicked} onBlur={this.leave} className='user-sesh-btn'>
            <div className='avatar'>
              <img src={profile} alt="Profile Pic" className='pfp small'/>
            </div>
            <ul className={'header-dropdown ' + (this.state.drop ? 'reveal' : 'hide')}>
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
                  this.props.history.push(`/users/${user.id}`);
                  this.leave();
                }}>View Profile</div>
              </li>
              <li onClick={logoutUser}>Sign Out</li>
            </ul>
          </button>
        </nav>
      </>
    )
  }
}

const mapSTP = ({ entities: { users }, session: { currentUser } }) => ({
  user: users[currentUser]
});

const mapDTP = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

const LoggedInHeader = withRouter(connect(mapSTP, mapDTP)(LoggedIn));

export default LoggedInHeader;