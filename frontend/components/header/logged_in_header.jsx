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

    return (
      <>
        <nav className='left-nav-bar'>
          <Link to='/'>
            <div className='icon-logo'>
              <img src={window.iconLogo} alt="InLink-icon-logo" className='InLink-icon-logo'/>
            </div>
          </Link>
          <Link to='https://github.com/mace141'>
            <div className='nav-icon'>
              <i className="fab fa-github"></i>
            </div>
          </Link>
          <Link to='https://www.linkedin.com/in/daniel-wu-2995a6140/'>
            <div className='nav-icon'>
              <i className="fab fa-linkedin"></i>
            </div>
          </Link>
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
            <img src={user.profileUrl} alt="Profile Pic"/>
            <ul className={'header-dropdown ' + (this.state.drop ? 'reveal' : 'hide')}>
              <li>
                <div>
                  <img src={user.profileUrl} alt="Profile Pic"/>
                  <div>
                    <p>{`${user.fname} ${user.lname}`}</p>
                    <p>{user.headline}</p>
                  </div>
                </div>
                <Link to={`/users/${user.id}`}>
                  <div className='pf-btn'>View Profile</div>
                </Link>
              </li>
              <li onClick={logoutUser}>Sign Out</li>
            </ul>
          </button>
        </nav>
      </>
    )
  }
}
// + (this.state.drop ? 'reveal' : 'hide')
const mapSTP = ({ entities: { users }, session: { currentUser } }) => ({
  user: users[currentUser]
});

const mapDTP = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

const LoggedInHeader = withRouter(connect(mapSTP, mapDTP)(LoggedIn));

export default LoggedInHeader;