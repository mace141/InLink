import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal';
import { deletePost } from '../../actions/post';
import { fetchUser } from '../../actions/session';
import { fetchPostLikes } from '../../util/like_api';
import { fetchCommentCount } from '../../util/post_api';
import CommentFormContainer from '../comments/comment_form_container';
import CommentIndexContainer from '../comments/comment_index';

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      drop: false,
      comment: false,
      timeAgo: Date.now() - Date.parse(this.props.post.createdAt),
      commentCount: null,
      likeCount: null
    };

    if (this.state.timeAgo < 3600000) {
      setInterval(() => this.setState({ timeAgo: Date.now() - Date.parse(this.props.post.createdAt)}), 60000);
    }

    this.openComments = this.openComments.bind(this);
  }

  componentDidMount() {
    const { fetchUser, fetchCommentCount, fetchPostLikes, post } = this.props;

    fetchUser(post.userId);
    fetchCommentCount(post.id).then(count => this.setState({ commentCount: count }));
    fetchPostLikes(post.id).then(count => this.setState({ likeCount: count }));
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
  
  openComments() {
    this.setState({ comment: true });
  }

  // INFINITE SCROLLING: 
  // fetch 10 posts by connections, order by updated time. save the updated time of the last post
  // fetch 10 more posts starting from saved updated time, order by updated time
  
  render() {
    const { currentUser, openModal, deletePost, users, post: { id, body, mediaUrl, userId } } = this.props;
    let dropdown; let postUser; let name;
    
    if (users[userId]) {
      postUser = users[userId];
      name = postUser.fname + ' ' + postUser.lname;

      if (postUser.id == currentUser) {
        dropdown = (
          <button onFocus={this.clicked.bind(this)} onBlur={this.leave.bind(this)}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Simple_icon_ellipsis.svg" alt="ellipsis"/>
            <ul className={'post-dropdown ' + (this.state.drop ? 'reveal' : 'hide')}>
              <li onClick={() => openModal('editPost', id)}><i className="far fa-edit"></i>Edit Post</li>
              <li onClick={() => deletePost(id)}><i className="far fa-trash-alt"></i>Delete Post</li>
            </ul>
          </button>
        );
      }
    } else {
      postUser = { headline: "" };
    }

    const commentSection = this.state.comment ? (
      <div className='comment-section'>
        <div>
          <CommentFormContainer postId={id}/>
        </div>
        <div>
          <CommentIndexContainer postId={id}/>
        </div>
      </div>
    ) : null;

    const commentCount = this.state.commentCount ? `${this.state.commentCount} comments` : null;
    const likeCount = this.state.likeCount ? (
      <>
        <i className="far fa-thumbs-up"></i>{this.state.likeCount}{commentCount ? ' | ' : null}
      </>
    ) : null;
    
    return (
      <div className='post-item'>
        <header>
          <div>
            <h1>[PFP here]</h1>
            <div>
              <p className='post-username gray-shade'>{name}</p>
              <p className='post-user-headline gray-shade'>{postUser.headline}</p>
              <p className='gray-shade'>{this.timeFromNow()}</p>
            </div>
          </div>
          {dropdown}
        </header>
        <p>{body}</p>
        <img src={mediaUrl} alt=""/>
        <div className='num-lc'>
          {likeCount} {commentCount}
        </div>
        <div className='like-comment'>
          <button><i className="far fa-thumbs-up"></i>Like</button>
          <button onClick={this.openComments}><i className="far fa-comment-dots"></i>Comment</button>
        </div>
        {commentSection}
      </div>
    )
  }
}

const mapSTP = ({ entities: { users }, session: { currentUser }}) => ({
  users, 
  currentUser
});

const mapDTP = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId)),
  editPost: post => dispatch(editPost(post)),
  fetchUser: userId => dispatch(fetchUser(userId)),
  openModal: (modal, id) => dispatch(openModal(modal, id)),
  fetchCommentCount: postId => fetchCommentCount(postId),
  fetchPostLikes: postId => fetchPostLikes(postId)
});

const PostIndexItemContainer = connect(mapSTP, mapDTP)(PostIndexItem)

export default PostIndexItemContainer;