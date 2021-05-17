import React from 'react';
import { connect } from 'react-redux';
import { fetchRootCommentCount } from '../../util/comment_api';
import { fetchTwoComments, fetchMoreComments } from '../../actions/comment';
import CommentIndexItemContainer from './comment_index_item';

class CommentIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 1,
      allRootComments: false,
      rootCommentNum: null
    };

    this.loadMoreComments = this.loadMoreComments.bind(this);
  }

  componentDidMount() {
    const { fetchTwoComments, fetchRootCommentCount, postId } = this.props;

    fetchTwoComments(postId);

    fetchRootCommentCount(postId).then(count => { 
      this.setState({ rootCommentNum: count });
      if (count <= 2) this.setState({ allRootComments: true })
    });
  }

  loadMoreComments() {
    const { fetchMoreComments, postId, comments } = this.props;

    fetchMoreComments(postId, this.state.limit);
    this.setState({ limit: this.state.limit + 1 });

    if (this.state.rootCommentNum <= comments.length + 10) {
      this.setState({ allRootComments: true });
    }
  }

  render() {
    const moreCommentsBtn = this.state.allRootComments ? null : (
      <button className='more-cmts' onClick={this.loadMoreComments}>Load more comments</button>
    );
    
    return (
      <>
        <ul className='comments-index'>
          {this.props.comments.map(comment => (
            <CommentIndexItemContainer key={comment.id} comment={comment} postId={this.props.postId} isReply={false}/>
          ))}
        </ul>
        {moreCommentsBtn}
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
  fetchRootCommentCount: postId => fetchRootCommentCount(postId)
});

const CommentIndexContainer = connect(mapSTP, mapDTP)(CommentIndex)

export default CommentIndexContainer;