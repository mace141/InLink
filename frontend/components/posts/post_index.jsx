import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { receivePosts } from '../../actions/post';
import { fetchPosts } from '../../util/post_api';
import PostIndexItemContainer from './post_index_item';

const PostIndex = ({ 
  posts,
  dispatch,
  fetchPostsAPI,
  receivePosts
}) => {
  const [offset, setOffset] = useState(0);
  const [morePosts, setMorePosts] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const observer = React.createRef();
  const lastPostRef = (node) => {
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && morePosts) {
        setLoading(true);
      }; 
    });

    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    if (loading) {
      incrementOffset();
      fetchPostsAPI(offset + 1).then(payload => {
        dispatch(receivePosts(payload));
        if (payload.posts && Object.values(payload.posts).length < 10) {
          setMorePosts(false);
        }
        setLoading(false);
      });
    }
  }, [loading]);

  useEffect(() => {
    fetchPostsAPI(offset).then((payload) => {
      dispatch(receivePosts(payload));
    });
  }, []);

  const incrementOffset = () => {
    setOffset(offset + 1);
  };

  return (
    <ul className='posts-index'>
      {posts.map((post, idx) => {
        if (idx + 1 === posts.length) {
          return (
            <>
              <PostIndexItemContainer key={post.id} post={post}/>
              <div ref={lastPostRef}></div>
              {loading ? (
                <div className='loading'>
                  <div className="lds-spinner">
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
  );
};

const mapSTP = ({ entities: { posts }}) => ({
  posts: Object.values(posts)
                .sort((a, b) => Date.parse(a.createdAt) > Date.parse(b.createdAt) ? -1 : 1 )
});

const mapDTP = dispatch => ({
  fetchPostsAPI: offset => fetchPosts(offset),
  receivePosts: posts => receivePosts(posts),
  dispatch
});

const PostIndexContainer = connect(mapSTP, mapDTP)(PostIndex);

export default PostIndexContainer;