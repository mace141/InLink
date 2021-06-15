import React from 'react';
import { connect } from 'react-redux';
import { receivePosts } from '../../actions/post';
import { fetchPosts } from '../../util/post_api';
import PostIndexItemContainer from './post_index_item';

class PostIndex extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      offset: 0, 
      morePosts: true,
      loading: false
    };

    this.observer = React.createRef();
    this.lastPostRef = node => {
      this.observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && this.state.morePosts) {
          this.setState({ loading: true }, () => {
            this.incrementOffset();
            props.fetchPostsAPI(this.state.offset + 1).then(posts => {
              props.dispatch(receivePosts(posts));
              if (Object.values(posts).length < 10) this.setState({ morePosts: false });
              this.setState({ loading: false });
            });
          });
        }; 
      });

      if (node) this.observer.current.observe(node);
    }
    
    this.incrementOffset = this.incrementOffset.bind(this);
  }

  componentDidMount() {
    this.props.fetchPostsAPI(this.state.offset).then(posts => dispatch(receivePosts(posts)));
  }

  componentWillUnmount() {
    this.observer.current.disconnect();
  }

  incrementOffset() {
    this.setState({ offset: this.state.offset + 1 });
  }

  render() {
    const { posts } = this.props;
    
    return (
      <ul className='posts-index'>
        {posts.map((post, idx) => {
          if (idx + 1 == posts.length) {
            return (
              <>
                <PostIndexItemContainer key={post.id} post={post}/>
                <div ref={this.lastPostRef}></div>
                {this.state.loading ? (
                  <div class='loading'>
                    <div class="lds-spinner">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : null}
              </>
            )
          } else {
            return <PostIndexItemContainer key={post.id} post={post}/>
          }
        })}
      </ul>
    )
  }
}

const mapSTP = ({ entities: { posts }}) => ({
  posts: Object.values(posts).sort((a, b) => Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1 )
});

const mapDTP = dispatch => ({
  fetchPostsAPI: offset => fetchPosts(offset),
  receivePosts: posts => receivePosts(posts),
  dispatch
});

const PostIndexContainer = connect(mapSTP, mapDTP)(PostIndex);

export default PostIndexContainer;