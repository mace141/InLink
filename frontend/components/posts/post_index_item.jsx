import React from 'react';
import { connect } from 'react-redux';
import { deleteLike, receiveLike } from '../../actions/like';
import { openModal } from '../../actions/modal';
import { deletePost } from '../../actions/post';
import { fetchUser } from '../../actions/session';
import { createLike, fetchPostNumLikes, fetchUserLiked } from '../../util/like_api';
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
      likeCount: null,
      liked: false,
      like: null
    };

    if (this.state.timeAgo < 3600000) {
      setInterval(() => this.setState({ timeAgo: Date.now() - Date.parse(this.props.post.createdAt)}), 60000);
    }

    this.openComments = this.openComments.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.incrementCommentCount = this.incrementCommentCount.bind(this);
  }

  componentDidMount() {
    const { 
      fetchUser, fetchCommentCount, fetchPostNumLikes, fetchUserLiked, post, currentUser
    } = this.props;
    
    fetchUser(post.userId);
    fetchCommentCount(post.id).then(count => this.setState({ commentCount: count }));
    fetchPostNumLikes(post.id).then(count => this.setState({ likeCount: count }));

    fetchUserLiked({ 
      user_id: currentUser, 
      likeable_id: post.id,
      likeable_type: 'Post'
    }).then(like => {
      if (like) {
        this.setState({ liked: true });
        this.setState({ like });
        document.getElementsByClassName(`like-btn ${post.id}`)[0].classList.add('liked');
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
  
  openComments() {
    this.setState({ comment: true });
  }

  toggleLike() {
    const { post: { id }, currentUser, createLikeAPI, deleteLike, dispatch } = this.props;

    if (this.state.liked) {
      deleteLike(this.state.like.id);
      this.setState({ liked: false });
      this.setState({ likeCount: this.state.likeCount - 1 });
      document.getElementsByClassName(`like-btn ${id}`)[0].classList.remove('liked');
    } else {
      const newLike = {
        user_id: currentUser,
        likeable_id: id,
        likeable_type: 'Post'
      };

      createLikeAPI(newLike).then(like => {
        this.setState({ like });
        dispatch(receiveLike(like));
      });
      this.setState({ liked: true });
      this.setState({ likeCount: this.state.likeCount + 1 });
      document.getElementsByClassName(`like-btn ${id}`)[0].classList.add('liked');
    }
  }

  incrementCommentCount() {
    this.setState({ commentCount: this.state.commentCount + 1 });
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
        <i className="far fa-thumbs-up small"></i>{this.state.likeCount}{commentCount ? ' | ' : null}
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
          <button onClick={this.toggleLike} className={'like-btn ' + id}>
            <i className={"far fa-thumbs-up " + id}></i>Like
          </button>
          <button onClick={this.openComments}>
            <i className="far fa-comment-dots"></i>Comment
          </button>
        </div>
        {commentSection}
      </div>
    )
  }
}

const mapSTP = ({ entities: { users }, session: { currentUser } }) => ({
  users, 
  currentUser
});

const mapDTP = dispatch => ({
  deletePost: postId => dispatch(deletePost(postId)),
  editPost: post => dispatch(editPost(post)),
  fetchUser: userId => dispatch(fetchUser(userId)),
  openModal: (modal, id) => dispatch(openModal(modal, id)),
  fetchCommentCount: postId => fetchCommentCount(postId),
  fetchPostNumLikes: postId => fetchPostNumLikes(postId),
  fetchUserLiked: like => fetchUserLiked(like),
  createLikeAPI: like => createLike(like),
  receiveLike: like => receiveLike(like),
  deleteLike: likeId => dispatch(deleteLike(likeId)),
  dispatch
});

const PostIndexItemContainer = connect(mapSTP, mapDTP)(PostIndexItem)

export default PostIndexItemContainer;