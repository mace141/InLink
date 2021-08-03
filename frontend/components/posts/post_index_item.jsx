import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteLike, receiveLike } from '../../actions/like';
import { openModal } from '../../actions/modal';
import { deletePost } from '../../actions/post';
import { createLike, fetchUserLiked } from '../../util/like_api';
import CreateCommentForm from '../comments/create_comment_form';
import CommentIndexContainer from '../comments/comment_index';

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      drop: false,
      comment: false,
      timeAgo: Date.now() - Date.parse(this.props.post.createdAt),
      commentCount: this.props.post.comments,
      likeCount: this.props.post.likes,
      liked: false,
      like: null,
    };
    
    if (this.state.timeAgo < 3600000) {
      setInterval(() => this.setState({ timeAgo: Date.now() - Date.parse(this.props.post.createdAt)}), 60000);
    }
    
    this.postItemRef = React.createRef();

    this.openComments = this.openComments.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.incrementCommentCount = this.incrementCommentCount.bind(this);
    this.clicked = this.clicked.bind(this);
    this.leave = this.leave.bind(this);
  }

  componentDidMount() {
    const { fetchUserLiked, post, currentUser } = this.props;
    
    fetchUserLiked({ 
      user_id: currentUser, 
      likeable_id: post.id,
      likeable_type: 'Post'
    }).then(like => {
      if (like) {
        this.setState({ liked: true });
        this.setState({ like });
        document.getElementsByClassName(`post like-btn ${post.id}`)[0].classList.add('liked');
      }
    });
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
      document.getElementsByClassName(`post like-btn ${id}`)[0].classList.remove('liked');
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
      document.getElementsByClassName(`post like-btn ${id}`)[0].classList.add('liked');
    }
  }

  incrementCommentCount() {
    this.setState({ commentCount: this.state.commentCount + 1 });
  }

  render() {
    const { 
      currentUser, openModal, deletePost, users, post: { id, body, mediaUrl, userId } 
    } = this.props;
    const { drop, comment, commentCount, likeCount } = this.state;
    let dropdown; let postUser; let name;
    
    if (users[userId]) {
      postUser = users[userId];
      name = postUser.fname + ' ' + postUser.lname;

      if (userId === currentUser) {
        dropdown = (
          <button onFocus={this.clicked} onBlur={this.leave}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Simple_icon_ellipsis.svg" alt="ellipsis" className='ellipsis'/>
            <ul className={'post-dropdown ' + (drop ? 'reveal' : 'hide')}>
              <li onClick={() => {openModal('editPost', id); this.leave();}}><i className="far fa-edit"></i>Edit Post</li>
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
          <CreateCommentForm postId={id} incrComCount={this.incrementCommentCount}/>
        </div>
        <div>
          <CommentIndexContainer postId={id} incrComCount={this.incrementCommentCount}/>
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
      <div className='post-item whitebox' ref={this.postItemRef}>
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
                <p className='gray-shade'>{this.timeFromNow()}</p>
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
          <button onClick={this.toggleLike} className={'post like-btn ' + id}>
            <i className="far fa-thumbs-up"></i>Like
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
  openModal: (modal, id) => dispatch(openModal(modal, id)),
  fetchUserLiked: like => fetchUserLiked(like),
  createLikeAPI: like => createLike(like),
  receiveLike: like => receiveLike(like),
  deleteLike: likeId => dispatch(deleteLike(likeId)),
  dispatch
});

const PostIndexItemContainer = connect(mapSTP, mapDTP)(PostIndexItem)

export default PostIndexItemContainer;