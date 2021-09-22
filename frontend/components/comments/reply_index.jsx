import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchChildCommentCount } from '../../util/comment_api';
import { fetchLastReply, fetchChildComments } from '../../actions/comment';
import CommentIndexItemContainer from './comment_index_item';

const ReplyIndex = ({
  replies,
  parentCommentId,
  openReply,
  fetchLastReply,
  fetchChildCommentCount,
  fetchChildComments,
}) => {
  const [offset, setOffset] = useState(0);
  const [allRootReplies, setAllRootReplies] = useState(true);
  const [replyCommentNum, setReplyCommentNum] = useState(0);

  useEffect(() => {
    fetchLastReply(parentCommentId);

    fetchChildCommentCount(parentCommentId).then(count => {
      setReplyCommentNum(count);
      if (count > 1) setAllRootReplies(false);
    });
  }, []);

  const loadMoreReplies = () => {
    fetchChildComments(parentCommentId, offset);
    setOffset(offset + 1);

    if (replyCommentNum <= replies.length + 10) {
      setAllRootReplies(true);
    }
  };

  const moreRepliesBtn = allRootReplies 
    ? null 
    : (<button className='more-cmts replies' 
                onClick={loadMoreReplies}
        >Load previous replies</button>);

  return (
    <>
      {moreRepliesBtn}
      <ul className='replies-index'>
        {replies.map(reply => (
          <CommentIndexItemContainer key={reply.id} comment={reply} isReply={true} openReply={openReply}/>
        ))}
      </ul>
    </>
  );
};

const mapSTP = ({ entities: { comments } }, ownProps) => {
  const parentId = ownProps.parentCommentId;
  const repliesArr = Object.values(comments)
                           .filter(comment => comment.parentCommentId === parentId)
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