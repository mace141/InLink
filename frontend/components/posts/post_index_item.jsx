import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteLike, receiveLike } from '../../actions/like';
import { openModal } from '../../actions/modal';
import { deletePost } from '../../actions/post';
import { createLike, fetchUserLiked } from '../../util/like_api';
import CreateCommentForm from '../comments/create_comment_form';
import CommentIndexContainer from '../comments/comment_index';

const PostIndexItem = ({
  post,
  post: { 
    id,
    body,
    mediaUrl,
    userId,
    createdAt,
    comments,
    likes
  },
  currentUser,
  users,
  dispatch,
  openModal,
  fetchUserLiked,
  createLikeAPI,
  deleteLike,
  deletePost
}) => {
  const [drop, setDrop] = useState(false);
  const [comment, setComment] = useState(false);
  const [timeAgo, setTimeAgo] = useState(Date.now() - Date.parse(createdAt));
  const [commentCount, setCommentCount] = useState(comments);
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    setIntervalId(
      setInterval(() => {
        setTimeAgo(Date.now() - Date.parse(createdAt))
      }, 60000)
    );
    fetchUserLiked({ 
      user_id: currentUser, 
      likeable_id: post.id,
      likeable_type: 'Post'
    }).then(like => {
      if (like) {
        setLiked(true);
        setLike(like);
        document.getElementsByClassName(`post like-btn ${post.id}`)[0].classList.add('liked');
      }
    });
    return function cleanup() {
      clearInterval(intervalId);
    };
  }, []);

  const timeFromNow = () => {
    if (timeAgo < 60000) {
      return '<1m';
    } else if (timeAgo < 3600000) {
      return Math.floor(timeAgo / 60000) + 'm';
    } else if (timeAgo < 86400000) {
      return Math.floor(timeAgo / 3600000) + 'h';
    } else if (timeAgo < 31536000000) {
      return Math.floor(timeAgo / 86400000) + 'd';
    } else {
      return Math.floor(timeAgo / 31536000000) +'y';
    }
  };

  const clicked = () => {
    setDrop(true);
  };

  const leave = () => {
    setDrop(false);
  };
  
  const openComments = () => {
    setComment(true);
  };

  const toggleLike = () => {
    if (liked) {
      deleteLike(like.id);
      setLiked(false);
      setLikeCount(likeCount - 1);
      document.getElementsByClassName(`post like-btn ${id}`)[0].classList.remove('liked');
    } else {
      const newLike = {
        user_id: currentUser,
        likeable_id: id,
        likeable_type: 'Post'
      };

      createLikeAPI(newLike).then(like => {
        setLike(like);
        dispatch(receiveLike(like));
      });
      setLiked(true);
      setLikeCount(likeCount + 1);
      document.getElementsByClassName(`post like-btn ${id}`)[0].classList.add('liked');
    }
  };

  const incrementCommentCount = () => {
    setCommentCount(commentCount + 1);
  };

  let dropdown; let postUser; let name;
  
  if (users[userId]) {
    postUser = users[userId];
    name = postUser.fname + ' ' + postUser.lname;

    if (userId === currentUser) {
      dropdown = (
        <button onFocus={clicked} onBlur={leave}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Simple_icon_ellipsis.svg" alt="ellipsis" className='ellipsis'/>
          <ul className={'post-dropdown ' + (drop ? 'reveal' : 'hide')}>
            <li onClick={() => {openModal('editPost', id); leave();}}><i className="far fa-edit"></i>Edit Post</li>
            <li onClick={() => deletePost(id)}><i className="far fa-trash-alt"></i>Delete Post</li>
          </ul>
        </button>
      );
    }
  } else {
    postUser = { headline: "" };
  }

  const profile = postUser.avatarUrl || window.defaultUser;

  const commentSection = comment ? (
    <div className='comment-section'>
      <div>
        <CreateCommentForm postId={id} incrComCount={incrementCommentCount}/>
      </div>
      <div>
        <CommentIndexContainer postId={id} incrComCount={incrementCommentCount}/>
      </div>
    </div>
  ) : null;
  
  const numComments = commentCount ? `${commentCount} comment${commentCount > 1 ? 's' : ''}` : null;
  const numLikes = likeCount ? (
    <>
      <i className="far fa-thumbs-up small"></i>{likeCount}{numComments ? ' | ' : null}
    </>
  ) : null;
  
  return (
    <div className='post-item whitebox'>
      <header>
        <div>
          <Link to={`/users/${userId}`}>
            <div className='avatar'>
              <img src={profile} alt="Profile Pic" className='pfp'/>
            </div>
          </Link>
          <div>
            <Link to={`/users/${userId}`}>
              <p className='post-username gray-shade'>{name}</p>
              <p className='post-user-headline gray-shade'>{postUser.headline}</p>
              <p className='gray-shade'>{timeFromNow()}</p>
            </Link>
          </div>
        </div>
        {dropdown}
      </header>
      <p>{body}</p>
      <img src={mediaUrl} alt=""/>
      <div className='num-lc'>
        {numLikes} {numComments}
      </div>
      <div className='like-comment'>
        <button onClick={toggleLike} className={'post like-btn ' + id}>
          <i className="far fa-thumbs-up"></i>Like
        </button>
        <button onClick={openComments}>
          <i className="far fa-comment-dots"></i>Comment
        </button>
      </div>
      {commentSection}
    </div>
  );
};

const mapSTP = ({ entities: { users }, session: { currentUser } }) => ({
  users, 
  currentUser
});

const mapDTP = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId)),
  editPost: post => dispatch(editPost(post)),
  openModal: (modal, id) => dispatch(openModal(modal, id)),
  fetchUserLiked: like => fetchUserLiked(like),
  createLikeAPI: like => createLike(like),
  receiveLike: like => receiveLike(like),
  deleteLike: likeId => dispatch(deleteLike(likeId)),
  dispatch
});

const PostIndexItemContainer = connect(mapSTP, mapDTP)(PostIndexItem)

export default PostIndexItemContainer;