import React from 'react';
import { connect } from 'react-redux';
import CreatePostForm from '../posts/create_post_form';
import PostIndexContainer from '../posts/post_index';

const Feed = ({ currentUser }) => {
  const { fname, lname, headline } = currentUser;
  return (
    <section className='feed-section'>
      <aside className='user-side-bar'>
        <p>[Insert PFP here]</p>
        <p>{fname + ' ' + lname}</p>
        <p>{headline}</p>
      </aside>
      <section className='posts-section'>
        <CreatePostForm/>
        <PostIndexContainer/>
      </section>
      <aside className='right-side-bar'>
        Daniel's Fun Facts
      </aside>
    </section>
  )
}

const mapSTP = ({ entities: { users }, session: { currentUser }}) => ({
  currentUser: users[currentUser]
});

const FeedContainer = connect(mapSTP)(Feed);

export default FeedContainer;