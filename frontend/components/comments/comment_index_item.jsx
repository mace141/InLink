import React from 'react';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment';
import { fetchUser } from '../../actions/session';
import EditCommentFormContainer from './edit_comment';
import ReplyFormContainer from './reply_form_container';
import ReplyIndexContainer from './reply_index';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drop: false,
      edit: false,
      reply: false,
      timeAgo: Date.now() - Date.parse(this.props.comment.createdAt)
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
  }

  componentDidMount() {
    this.props.fetchUser(this.props.comment.userId);
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

  render() {
    const { user, currentUser, deleteComment, comment: { id, body, mediaUrl } } = this.props;
    let dropdown; let commentUser; let name; let headline;

    if (user) {
      commentUser = user;
      name = `${commentUser.fname} ${commentUser.lname}`;
      headline = commentUser.headline;

      if (commentUser.id = currentUser) {
        dropdown = (
          <button onFocus={this.clicked} onBlur={this.leave}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Simple_icon_ellipsis.svg" alt="ellipsis"/>
            <ul className={'cmt-dropdown ' + (this.state.drop ? 'reveal' : 'hide')}>
              <li onClick={this.openEdit}><i className="far fa-edit"></i>Edit</li>
              <li onClick={() => deleteComment(id)}><i className="far fa-trash-alt"></i>Delete</li>
            </ul>
          </button>
        );
      }
    } 

    const editForm = this.state.edit ? (
      <EditCommentFormContainer cancelEdit={this.cancelEdit} comment={this.props.comment}/>
    ) : (
      <p>{body}</p>
    );

    const replyForm = this.state.reply ? (
      <ReplyFormContainer parentCommentId={id} postId={this.props.postId}/>
    ) : null;
    
    return (
      <div className='comment-item'>
        <h2>[PFP here]</h2>
        <div>
          <div className='comment-body'>
            <header>
              <div className='cmt-user-info'>
                <p className='cmt-user-name gray-shade'>{name}</p>
                <p className='cmt-user-headline gray-shade'>{headline}</p>
              </div>
              <div>
                <span>{this.timeFromNow()}</span>
                {dropdown}
              </div>
            </header>
            {editForm}
            {mediaUrl ? <img src={mediaUrl} alt="comment-image"/> : null}
            {this.state.edit ? null : ( 
              <div className='like-reply'>
                <button>Like</button>
                <div></div>
                <button onClick={this.openReply}>Reply</button>
              </div>
            )}
          </div>
          {this.props.isReply ? null : <ReplyIndexContainer parentCommentId={id}/>}
          {this.props.isReply ? null : replyForm}
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
  deleteComment: commentId => dispatch(deleteComment(commentId))
});

const CommentIndexItemContainer = connect(mapSTP, mapDTP)(CommentIndexItem);

export default CommentIndexItemContainer;