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
          <li><PostIndexItemContainer key={post.id} post={post}/></li>
        ))}
      </ul>
    )
  }
}

const mapSTP = ({ entities: { posts }}) => ({
  posts: Object.values(posts)
});

const mapDTP = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts())
});

const PostIndexContainer = connect(mapSTP, mapDTP)(PostIndex);

export default PostIndexContainer;