import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post';
import PostIndexItemContainer from './post_index_item';

class PostIndex extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <ul className='posts-index'>
        {this.props.posts.map(post => (
          <PostIndexItemContainer key={post.id} post={post}/>
        ))}
      </ul>
    )
  }
}

const mapSTP = ({ entities: { posts }}) => ({
  posts: Object.values(posts).sort((a, b) => Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1 )
});

const mapDTP = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
});

const PostIndexContainer = connect(mapSTP, mapDTP)(PostIndex);

export default PostIndexContainer;