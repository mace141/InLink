import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal';
import { fetchUser } from '../../actions/session';
import PostIndexContainer from '../posts/post_index';

class Feed extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  render() {
    const { openModal, currentUser, userConnections } = this.props;
    const { fname, lname, headline, avatarUrl } = currentUser;
    
    return (
      <section className='feed-section'>
        <div>
          <aside className='user-side-bar'>
            <div className='background-side'>
              <img src={currentUser.background || window.defaultBg} alt="Background"/>
            </div>
            <div className='side-bar-user-info'>
              <Link to={`/users/${currentUser.id}`}>
                <div className='avatar big'>
                  <img src={avatarUrl || window.defaultUser} alt="Profile Pic" className='pfp big'/>
                </div>
              </Link>
              <p className='side-bar-name'>{fname + ' ' + lname}</p>
              <p>{headline}</p>
            </div>
            <div className='side-bar-connections'>
              <Link to='/mynetwork'>
                <div>
                  <div>
                    <p>Connections</p>
                  </div>
                  <div>
                    <p className='conn-count'>{userConnections}</p>
                  </div>
                </div>
              </Link>
            </div>
          </aside>
        </div>
        <section className='posts-section'>
          <div className='start-post whitebox'>
            <Link to={`/users/${currentUser.id}`}>
              <div className='avatar'>
                <img src={avatarUrl || window.defaultUser} alt="Profile Pic" className='pfp'/>
              </div>
            </Link>
            <button onClick={() => openModal('createPost')}>Start a post</button>
          </div>
          <div className='feed-div'></div>
          <PostIndexContainer/>
        </section>
        <div>
          <aside className='right-side-bar whitebox'>
            <div className='avatar bigger'>
              <img src={window.daniel} alt="Daniel Wu"/>
            </div>
            <h1>Daniel Wu</h1>
            <div className='links'>
              <a href='https://github.com/mace141' target="_blank">
                <div className='nav-icon'>
                  <i className="fab fa-github"></i>
                  <p>Github</p>
                </div>
              </a>
              <a href='https://www.linkedin.com/in/daniel-wu-2995a6140/' target="_blank">
                <div className='nav-icon'>
                  <i className="fab fa-linkedin"></i>
                  <p>LinkedIn</p>
                </div>
              </a>
              <a href='https://angel.co/u/daniel-wu-42' target="_blank">
                <div className='nav-icon'>
                  <i className="fab fa-angellist"></i>
                  <p>AngelList</p>
                </div>
              </a>
            </div>
          </aside>
        </div>
      </section>
    )
  }
};

const mapSTP = ({ entities: { users }, session: { currentUser, userConnections }}) => ({
  currentUser: users[currentUser],
  userConnections
});

const mapDTP = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  fetchUser: userId => dispatch(fetchUser(userId))
});

const FeedContainer = connect(mapSTP, mapDTP)(Feed);

export default FeedContainer;