import React from 'react';
import { connect } from 'react-redux';
import { fetchTwoComments, fetchMoreComments } from '../../actions/comment';

class CommentIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 1
    };

    this.loadMoreComments = this.loadMoreComments.bind(this);
  }

  componentDidMount() {
    this.props.fetchTwoComments(this.props.postId);
  }

  loadMoreComments() {
    this.props.fetchMoreComments(this.props.postId, this.state.limit);
    this.setState({ limit: this.state.limit + 1 });
  }

  render() {
    return (
      <>
        <ul className='comments-index'>
          {this.props.comments.map(comment => (
            <li>{comment.body}</li>
          ))}
        </ul>
        <button onClick={this.loadMoreComments}>Load more comments</button>
      </>
    )
  }
}

const mapSTP = ({ entities: { comments } }, ownProps) => {
  const commentsArr = Object.values(comments)
                            .filter(comment => (
                              comment.postId == ownProps.postId && comment.parentCommentId == null
                            ))
                            .sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)

  return {
    comments: commentsArr
  }
};

const mapDTP = dispatch => ({
  fetchTwoComments: postId => dispatch(fetchTwoComments(postId)),
  fetchMoreComments: (postId, limit) => dispatch(fetchMoreComments(postId, limit))
});

const CommentIndexContainer = connect(mapSTP, mapDTP)(CommentIndex)

export default CommentIndexContainer;