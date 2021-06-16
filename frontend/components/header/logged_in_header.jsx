import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/session';
import { debounce } from 'lodash';

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      drop: false,
      search: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.clicked = this.clicked.bind(this);
    this.leave = this.leave.bind(this);
  }

  componentDidMount() {
    const searchField = document.getElementById('search-field');

    // searchField.addEventListener('change', debounce())
  }

  handleInput(e) {
    this.setState({ search: e.target.value });
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
          <input type="text" placeholder='Search' id='search-field' value={this.state.search} onChange={this.handleInput}/>
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
            <div className='header-avatar'>
              <div className='avatar'>
                <img src={profile} alt="Profile Pic" className='pfp small'/>
              </div>
              <p>Me <span className='arrow-down'></span></p>
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