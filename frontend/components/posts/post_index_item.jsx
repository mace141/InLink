import React from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
import { fetchUser } from '../../actions/session';

class PostIndexItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.users[this.props.post.userId] || null
    };
  }

  componentDidMount() {
    this.props.fetchUser(this.props.post.userId);
  }
  
  render() {
    const { editPost, deletePost, users, post: { id, body, mediaUrl } } = this.props;
    let postUser; let name;

    if (this.state.user) {
      postUser = this.state.user;
      name = postUser.fname + ' ' + postUser.lname;
    } else {
      postUser = { headline: "" }
    }
    
    return (
      <div className='post-item'>
        <header>
          <div>
            <h1>[User Image Here]</h1>
            <div>
              <p>{name}</p>
              <p>{postUser.headline}</p>
            </div>
          </div>
          <button>Dropdown</button>
        </header>
        <p>{body}</p>
        <img src={mediaUrl} alt="" />
        <div>
          [numLikes and numComments]
        </div>
        <div>
          <button>Like</button>
          <button>Comment</button>
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
  fetchUser: userId => dispatch(fetchUser(userId))
});

const PostIndexItemContainer = connect(mapSTP, mapDTP)(PostIndexItem)

export default PostIndexItemContainer;