import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/post';
import PostIndexItemContainer from './post_index_item';

class PostIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = { offset: 0 };

    this.incrementOffset = this.incrementOffset.bind(this);
  }

  componentDidMount() {
    this.props.fetchPosts(this.state.offset);
  }

  incrementOffset() {
    this.setState({ offset: this.state.offset + 1 });
  }

  render() {
    return (
      <ul className='posts-index'>
        {this.props.posts.map(post => (
          <PostIndexItemContainer key={post.id} post={post} incrOffset={this.incrementOffset}/>
        ))}
      </ul>
    )
  }
}

const mapSTP = ({ entities: { posts }}) => ({
  posts: Object.values(posts).sort((a, b) => Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1 )
});

const mapDTP = dispatch => ({
  fetchPosts: offset => dispatch(fetchPosts(offset))
});

const PostIndexContainer = connect(mapSTP, mapDTP)(PostIndex);

export default PostIndexContainer;