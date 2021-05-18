import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/comment';
import { receiveLike, deleteLike } from '../../actions/like';
import { fetchUser } from '../../actions/session';
import { fetchUserLiked, createLike } from '../../util/like_api';
import EditCommentFormContainer from './edit_comment_form';
import ReplyFormContainer from './reply_form_container';
import ReplyIndexContainer from './reply_index';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drop: false,
      edit: false,
      reply: false,
      timeAgo: Date.now() - Date.parse(this.props.comment.createdAt),
      replyCount: this.props.comment.replies,
      likeCount: this.props.comment.likes,
      liked: false,
      like: null
    }

    if (this.state.timeAgo < 3600000) {
      setInterval(() => this.setState({ 
        timeAgo: Date.now() - Date.parse(this.props.comment.createdAt)}), 
        60000
      );
    }

    this.clicked = this.clicked.bind(this);
    this.leave = this.leave.bind(this);
    this.openEdit = this.openEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.openReply = this.openReply.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.incrementReplyCount = this.incrementReplyCount.bind(this);
  }

  componentDidMount() {
    const { fetchUser, fetchUserLiked, comment, currentUser } = this.props;

    fetchUser(comment.userId);

    fetchUserLiked({ 
      user_id: currentUser, 
      likeable_id: comment.id,
      likeable_type: 'Comment'
    }).then(like => {
      if (like) {
        this.setState({ liked: true });
        this.setState({ like });
        document.getElementsByClassName(`cmt like-btn ${comment.id}`)[0].classList.add('liked');
      }
    })
  }

  timeFromNow() {
    const { timeAgo } = this.state;

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
  }

  clicked() {
    this.setState({ drop: true });
  }

  leave() {
    this.setState({ drop: false });
  }

  openEdit() {
    this.setState({ edit: true });
  }

  cancelEdit() {
    this.setState({ edit: false });
  }

  openReply() {
    this.setState({ reply: true });
  }

  toggleLike() {
    const { comment: { id }, currentUser, createLikeAPI, deleteLike, dispatch } = this.props;

    if (this.state.liked) {
      deleteLike(this.state.like.id);
      this.setState({ liked: false });
      this.setState({ likeCount: this.state.likeCount - 1 });
      document.getElementsByClassName(`cmt like-btn ${id}`)[0].classList.remove('liked');
    } else {
      const newLike = {
        user_id: currentUser,
        likeable_id: id,
        likeable_type: 'Comment'
      };

      createLikeAPI(newLike).then(like => {
        this.setState({ like });
        dispatch(receiveLike(like));
      });
      this.setState({ liked: true });
      this.setState({ likeCount: this.state.likeCount + 1 });
      document.getElementsByClassName(`cmt like-btn ${id}`)[0].classList.add('liked');
    }
  }

  incrementReplyCount() {
    this.setState({ replyCount: this.state.replyCount + 1 })
  }

  render() {
    const { 
      openReply, isReply, user, currentUser, deleteComment, comment, postId, 
      comment: { id, body, mediaUrl }, incrComCount
    } = this.props;
    const { drop, edit, reply, replyCount, likeCount } = this.state;
    const profile = user.profileUrl || window.defaultUser;

    let dropdown; let commentUser; let name; let headline;

    if (user) {
      commentUser = user;
      name = `${commentUser.fname} ${commentUser.lname}`;
      headline = commentUser.headline;

      if (commentUser.id = currentUser) {
        dropdown = (
          <button onFocus={this.clicked} onBlur={this.leave}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Simple_icon_ellipsis.svg" alt="ellipsis"/>
            <ul className={'cmt-dropdown ' + (drop ? 'reveal' : 'hide')}>
              <li onClick={this.openEdit}><i className="far fa-edit"></i>Edit</li>
              <li onClick={() => deleteComment(id)}><i className="far fa-trash-alt"></i>Delete</li>
            </ul>
          </button>
        );
      }
    } 

    const editForm = edit ? (
      <EditCommentFormContainer cancelEdit={this.cancelEdit} comment={comment}/>
    ) : (
      <p>{body}</p>
    );

    const replyForm = reply ? (
      <ReplyFormContainer parentCommentId={id} 
                          postId={postId} 
                          incrComCount={incrComCount}
                          incrRepCount={this.incrementReplyCount}/>
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
        <img src={profile} alt="Profile Pic" className={'pfp small'}/>
        <div>
          <div className='comment-body'>
            <header>
              <Link to={`/users/${user.id}`}>
                <div className='cmt-user-info'>
                  <p className='cmt-user-name gray-shade'>{name}</p>
                  <p className='cmt-user-headline gray-shade'>{headline}</p>
                </div>
              </Link>
              <div>
                <span>{this.timeFromNow()}</span>
                {dropdown}
              </div>
            </header>
            {editForm}
            {mediaUrl ? <img src={mediaUrl} alt="comment-image"/> : null}
            {this.state.edit ? null : ( 
              <div className='like-reply'>
                <button onClick={this.toggleLike} className={'cmt like-btn ' + id}>Like</button>{numLikes}
                <div></div>
                <button onClick={isReply ? openReply : this.openReply}>Reply</button>{numReplies}
              </div>
            )}
          </div>
          {isReply ? null : <ReplyIndexContainer parentCommentId={id} openReply={this.openReply}/>}
          {isReply ? null : replyForm}
        </div>
      </div>
    )
  }
}

const mapSTP = ({ entities: { users }, session: { currentUser } }, ownProps) => ({
  user: users[ownProps.comment.userId],
  currentUser
});

const mapDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  fetchUserLiked: userId => fetchUserLiked(userId),
  createLikeAPI: like => createLike(like),
  receiveLike: like => receiveLike(like),
  deleteLike: likeId => dispatch(deleteLike(likeId)),
  dispatch
});

const CommentIndexItemContainer = connect(mapSTP, mapDTP)(CommentIndexItem);

export default CommentIndexItemContainer;