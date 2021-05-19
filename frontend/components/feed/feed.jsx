import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { openModal } from '../../actions/modal';
import PostIndexContainer from '../posts/post_index';

const Feed = ({ currentUser, openModal }) => {
  const { fname, lname, headline, profileUrl } = currentUser;
  return (
    <section className='feed-section'>
      <div>
        <aside className='user-side-bar whitebox'>
          <Link to={`/users/${currentUser.id}`}><img src={profileUrl || window.defaultUser} alt="Profile Pic" className='pfp big'/></Link>
          <p>{fname + ' ' + lname}</p>
          <p>{headline}</p>
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
};

const mapSTP = ({ entities: { users }, session: { currentUser }}) => ({
  currentUser: users[currentUser]
});

const mapDTP = dispatch => ({
  openModal: modal => dispatch(openModal(modal))
});

const FeedContainer = connect(mapSTP, mapDTP)(Feed);

export default FeedContainer;