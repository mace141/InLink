import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/comment';
import { receiveLike, deleteLike } from '../../actions/like';
import { fetchUserLiked, createLike } from '../../util/like_api';
import EditCommentFormContainer from './edit_comment_form';
import ReplyFormContainer from './reply_form_container';
import ReplyIndexContainer from './reply_index';

const CommentIndexItem = ({
  currentUser,
  comment,
  comment: {
    id,
    body,
    mediaUrl,
    createdAt,
    replies,
    likes
  },
  postId,
  commenter,
  openReply,
  isReply,
  dispatch,
  incrComCount,
  fetchUserLiked,
  createLikeAPI,
  deleteLike,
  deleteComment
}) => {
  const [drop, setDrop] = useState(false);
  const [edit, setEdit] = useState(false);
  const [reply, setReply] = useState(false);
  const [timeAgo, setTimeAgo] = useState(Date.now() - Date.parse(createdAt));
  const [replyCount, setReplyCount] = useState(replies);
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);
  const [like, setLike] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (timeAgo < 3600000) {
      setIntervalId(setInterval(() => {
        setTimeAgo(Date.now() - Date.parse(createdAt));
      }, 60000));
    }

    fetchUserLiked({ 
      user_id: currentUser, 
      likeable_id: id,
      likeable_type: 'Comment'
    }).then(like => {
      if (like) {
        setLiked(true);
        setLike(like);
        document.getElementsByClassName(`cmt like-btn ${id}`)[0].classList.add('liked');
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

  const openEdit = () => {
    setEdit(true);
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  const openReplies = () => {
    setReply(true);
  };

  const toggleLike = () => {
    if (liked) {
      deleteLike(like.id);
      setLike(false);
      setLikeCount(likeCount - 1 );
      document.getElementsByClassName(`cmt like-btn ${id}`)[0].classList.remove('liked');
    } else {
      const newLike = {
        user_id: currentUser,
        likeable_id: id,
        likeable_type: 'Comment'
      };

      createLikeAPI(newLike).then(like => {
        setLike(like);
        dispatch(receiveLike(like));
      });
      setLike(true);
      setLikeCount(likeCount + 1 );
      document.getElementsByClassName(`cmt like-btn ${id}`)[0].classList.add('liked');
    }
  };

  const incrementReplyCount = () => {
    setReplyCount(replyCount + 1);
  };

  const avatar = commenter.avatarUrl || window.defaultUser;

  let dropdown; let name; let headline;

  if (commenter) {
    name = `${commenter.fname} ${commenter.lname}`;
    headline = commenter.headline;

    if (commenter.id === currentUser) {
      dropdown = (
        <button onFocus={clicked} onBlur={leave}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Simple_icon_ellipsis.svg" alt="ellipsis"/>
          <ul className={'cmt-dropdown ' + (drop ? 'reveal' : 'hide')}>
            <li onClick={openEdit}><i className="far fa-edit"></i>Edit</li>
            <li onClick={() => deleteComment(id)}><i className="far fa-trash-alt"></i>Delete</li>
          </ul>
        </button>
      );
    }
  } 
  
  const editForm = edit ? (
    <EditCommentFormContainer cancelEdit={cancelEdit} comment={comment}/>
  ) : (
    <p>{body}</p>
  );

  const replyForm = reply ? (
    <ReplyFormContainer parentCommentId={id} 
                        postId={postId} 
                        incrComCount={incrComCount}
                        incrRepCount={incrementReplyCount}/>
  ) : null;

  const numReplies = replyCount ? (
    `${replyCount} repl${replyCount > 1 ? 'ies' : 'y'}`
  ) : null;

  const numLikes = likeCount ? (
    <>
      <i className="far fa-thumbs-up small"></i>{likeCount}
    </>
  ) : null;
  
  return (
    <div className='comment-item'>
      <Link to={`/users/${commenter.id}`}>
        <div className='avatar small'>
          <img src={avatar} alt="Profile Pic" className={'pfp small'}/>
        </div>
      </Link>
      <div>
        <div className='comment-body'>
          <header>
            <Link to={`/users/${commenter.id}`}>
              <div className='cmt-user-info'>
                <p className='cmt-user-name gray-shade'>{name}</p>
                <p className='cmt-user-headline gray-shade'>{headline}</p>
              </div>
            </Link>
            <div id='cmt-time-edit'>
              <span>{timeFromNow()}</span>
              {dropdown}
            </div>
          </header>
          {editForm}
          {mediaUrl ? <img src={mediaUrl} alt="comment-image"/> : null}
          {edit ? null : ( 
            <div className='like-reply'>
              <button onClick={toggleLike} className={'cmt like-btn ' + id}>Like</button>{numLikes}
              <div></div>
              <button onClick={isReply ? openReply : openReplies}>Reply</button>{numReplies}
            </div>
          )}
        </div>
        {isReply ? null : <ReplyIndexContainer parentCommentId={id} openReply={openReplies}/>}
        {isReply ? null : replyForm}
      </div>
    </div>
  );
};

const mapSTP = ({ entities: { users }, session: { currentUser } }, ownProps) => ({
  commenter: users[ownProps.comment.userId],
  currentUser
});

const mapDTP = dispatch => ({
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  fetchUserLiked: userId => fetchUserLiked(userId),
  createLikeAPI: like => createLike(like),
  receiveLike: like => receiveLike(like),
  deleteLike: likeId => dispatch(deleteLike(likeId)),
  dispatch
});

const CommentIndexItemContainer = connect(mapSTP, mapDTP)(CommentIndexItem);

export default CommentIndexItemContainer;