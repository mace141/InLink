import React from 'react';
import { connect } from 'react-redux';
import { fetchChildCommentCount } from '../../util/comment_api';
import { fetchLastReply, fetchChildComments } from '../../actions/comment';
import CommentIndexItemContainer from './comment_index_item';

class ReplyIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      allRootReplies: true,
      replyCommentNum: null
    };

    this.loadMoreReplies = this.loadMoreReplies.bind(this);
  }

  componentDidMount() {
    const { fetchLastReply, fetchChildCommentCount, parentCommentId } = this.props;

    fetchLastReply(parentCommentId);

    fetchChildCommentCount(parentCommentId).then(count => {
      this.setState({ replyCommentNum: count});
      if (count > 1) this.setState({ allRootReplies: false })
    });
  }

  loadMoreReplies() {
    const { fetchChildComments, parentCommentId, replies } = this.props;

    fetchChildComments(parentCommentId, this.state.offset);
    this.setState({ offset: this.state.offset + 1 });

    if (this.state.replyCommentNum <= replies.length + 10) {
      this.setState({ allRootReplies: true });
    }
  }

  render() {
    const moreRepliesBtn = this.state.allRootReplies ? null : (
      <button className='more-cmts replies' onClick={this.loadMoreReplies}>Load previous replies</button>
    );
    const { openReply } = this.props;

    return (
      <>
        {moreRepliesBtn}
        <ul className='replies-index'>
          {this.props.replies.map(reply => (
            <CommentIndexItemContainer key={reply.id} comment={reply} isReply={true} openReply={openReply}/>
          ))}
        </ul>
      </>
    );
  }
}

const mapSTP = ({ entities: { comments } }, ownProps) => {
  const parentId = ownProps.parentCommentId;
  const repliesArr = Object.values(comments)
                           .filter(comment => comment.parentCommentId == parentId)
                           .sort((a, b) => a.createdAt > b.createdAt ? 1 : -1);
  
  return { replies: repliesArr }
}

const mapDTP = dispatch => ({
  fetchLastReply: parentId => dispatch(fetchLastReply(parentId)),
  fetchChildComments: (parentId, offset) => dispatch(fetchChildComments(parentId, offset)),
  fetchChildCommentCount: parentId => fetchChildCommentCount(parentId)
});

const ReplyIndexContainer = connect(mapSTP, mapDTP)(ReplyIndex);

export default ReplyIndexContainer;