import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal';
import PostIndexContainer from '../posts/post_index';

const Feed = ({ currentUser, openModal }) => {
  const { fname, lname, headline, profileUrl } = currentUser;
  return (
    <section className='feed-section'>
      <div>
        <aside className='user-side-bar whitebox'>
          <img src={currentUser.profileUrl || window.defaultUser} alt="Profile Pic" className='pfp big'/>
          <p>{fname + ' ' + lname}</p>
          <p>{headline}</p>
        </aside>
      </div>
      <section className='posts-section'>
        <div className='start-post whitebox'>
          <img src={profileUrl || window.defaultUser} alt="Profile Pic" className='pfp'/>
          <button onClick={() => openModal('createPost')}>Start a post</button>
        </div>
        <div className='feed-div'></div>
        <PostIndexContainer/>
      </section>
      <div>
        <aside className='right-side-bar whitebox'>
          Daniel's Fun Facts
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