import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
import { fetchUser } from '../../actions/session';

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.users[this.props.post.userId] || null,
      drop: false
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.post.userId);
  }

  clicked() {
    this.setState({drop: true});
  }

  leave() {
    this.setState({drop: false});
  }
  
  render() {
    const { deletePost, users, post: { id, body, mediaUrl } } = this.props;
    let dropdown; let postUser; let name;

    if (this.state.user) {
      postUser = this.state.user;
      name = postUser.fname + ' ' + postUser.lname;

      if (postUser.id == this.props.currentUser) {
        dropdown = (
          <button onFocus={this.clicked.bind(this)} onBlur={this.leave.bind(this)}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Simple_icon_ellipsis.svg" alt="ellipsis"/>
            <ul className={'post-dropdown ' + (this.state.drop ? 'reveal' : 'hide')}>
              <li><i className="far fa-edit"></i>Edit Post</li>
              <li><i className="far fa-trash-alt"></i>Delete Post</li>
            </ul>
          </button>
        );
      }
    } else {
      postUser = { headline: "" }
    }
    debugger
    return (
      <div className='post-item'>
        <header>
          <div>
            <h1>[User Image Here]</h1>
            <div>
              <p className='post-username'>{name}</p>
              <p className='post-user-headline'>{postUser.headline}</p>
              <p>[Days ago posted]</p>
            </div>
          </div>
          {dropdown}
        </header>
        <p>{body}</p>
        <img src={mediaUrl} alt=""/>
        <div className='num-lc'>
          [numLikes and numComments]
        </div>
        <div className='like-comment'>
          <button><i className="far fa-thumbs-up"></i>Like</button>
          <button><i className="far fa-comment-dots"></i>Comment</button>
        </div>
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
  fetchUser: userId => fetchUser(userId)
});

const PostIndexItemContainer = connect(mapSTP, mapDTP)(PostIndexItem)

export default PostIndexItemContainer;