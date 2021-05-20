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
    const { openModal, currentUser } = this.props;
    const { fname, lname, headline, profileUrl } = currentUser;
    return (
      <section className='feed-section'>
        <div>
          <aside className='user-side-bar'>
            <div className='background-side'>
              <img src={currentUser.background || window.defaultBg} alt="Background"/>
            </div>
            <div className='side-bar-user-info'>
              <Link to={`/users/${currentUser.id}`}><img src={profileUrl || window.defaultUser} alt="Profile Pic" className='pfp big'/></Link>
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
                    <p className='conn-count'>{currentUser.connections}</p>
                  </div>
                </div>
              </Link>
            </div>
          </aside>
        </div>
        <section className='posts-section'>
          <div className='start-post whitebox'>
            <Link to={`/users/${currentUser.id}`}><img src={profileUrl || window.defaultUser} alt="Profile Pic" className='pfp'/></Link>
            <button onClick={() => openModal('createPost')}>Start a post</button>
          </div>
          <div className='feed-div'></div>
          <PostIndexContainer/>
        </section>
        <div>
          <aside className='right-side-bar whitebox'>
            <h1>Side Bar</h1>
            <ul>
              <li></li>
            </ul>
          </aside>
        </div>
      </section>
    )
  }
};

const mapSTP = ({ entities: { users }, session: { currentUser }}) => ({
  currentUser: users[currentUser]
});

const mapDTP = dispatch => ({
  openModal: modal => dispatch(openModal(modal)),
  fetchUser: userId => dispatch(fetchUser(userId))
});

const FeedContainer = connect(mapSTP, mapDTP)(Feed);

export default FeedContainer;