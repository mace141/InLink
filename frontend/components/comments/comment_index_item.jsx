import React from 'react';
import { connect } from 'react-redux';
import { updateComment } from '../../actions/comment';
import { fetchUser } from '../../actions/session';

class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drop: false,
      edit: false,
      timeAgo: Date.now() - Date.parse(this.props.comment.createdAt)
    }

    if (this.state.timeAgo < 3600000) {
      setInterval(() => this.setState({ 
        timeAgo: Date.now() - Date.parse(this.props.post.createdAt)}), 
        60000
      );
    }
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
    this.setState({drop: true});
  }

  leave() {
    this.setState({drop: false});
  }

  render() {
    const { user, currentUser, updateComment, deleteComment, comment: { id, body, mediaUrl } } = this.props;
    let dropdown; let commentUser; let name; let headline;

    if (user) {
      commentUser = user;
      name = `${commentUser.fname} ${commentUser.lname}`;
      headline = commentUser.headline;

      if (commentUser.id = currentUser) {
        dropdown = (
          <button onFocus={this.clicked.bind(this)} onBlur={this.leave.bind(this)}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Simple_icon_ellipsis.svg" alt="ellipsis"/>
            <ul className={'cmt-dropdown ' + (this.state.drop ? 'reveal' : 'hide')}>
              <li onClick={() => null}><i className="far fa-edit"></i>Edit</li>
              <li onClick={() => deleteComment(id)}><i className="far fa-trash-alt"></i>Delete</li>
            </ul>
          </button>
        );
      }
    } 

    return (
      <div className='comment-item'>
        <div>
          <h2>[PFP here]</h2>
          <div className='comment-body'>
            <header>
              <div className='cmt-user-info'>
                <p className='cmt-user-name'>{name}</p>
                <p className='cmt-user-headline'>{headline}</p>
              </div>
              <div>
                <span>{this.timeFromNow()}</span>
                {dropdown}
              </div>
            </header>
            <p>{body}</p>
            {mediaUrl ? <img src={mediaUrl} alt="comment-image"/> : null}
          </div>
        </div>
        <div className='like-reply'>
          <button>Like</button>
          <div></div>
          <button>Reply</button>
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
  updateComment: comment => dispatch(updateComment(comment)),
  deleteComment: commentId => dispatch(deleteComment(commentId))
})

const CommentIndexItemContainer = connect(mapSTP, mapDTP)(CommentIndexItem);

export default CommentIndexItemContainer;