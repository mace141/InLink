import React from 'react';
import { connect } from 'react-redux';
import { fetchCommentCount } from '../../util/comment_api';
import { fetchTwoComments, fetchMoreComments } from '../../actions/comment';
import CommentIndexItemContainer from './comment_index_item';

class CommentIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 1,
      allRootComments: false
    };

    this.loadMoreComments = this.loadMoreComments.bind(this);
  }

  componentDidMount() {
    this.props.fetchTwoComments(this.props.postId);
  }

  loadMoreComments() {
    const { fetchMoreComments, fetchCommentCount, postId, comments } = this.props;

    fetchMoreComments(postId, this.state.limit);
    this.setState({ limit: this.state.limit + 1 });

    fetchCommentCount(postId).then(count => {
      if (count <= comments.length + 10) {
        this.setState({ allRootComments: true });
      }
    });
  }

  render() {
    const moreComments = this.state.allRootComments ? null : (
      <button className='more-cmts' onClick={this.loadMoreComments}>Load more comments</button>
    );
    
    return (
      <>
        <ul className='comments-index'>
          {this.props.comments.map(comment => (
            <CommentIndexItemContainer key={comment.id} comment={comment} postId={this.props.postId}/>
          ))}
        </ul>
        {moreComments}
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
  fetchMoreComments: (postId, limit) => dispatch(fetchMoreComments(postId, limit)),
  fetchCommentCount: postId => fetchCommentCount(postId)
});

const CommentIndexContainer = connect(mapSTP, mapDTP)(CommentIndex)

export default CommentIndexContainer;