import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchRootCommentCount } from '../../util/comment_api';
import { fetchTwoComments, fetchMoreComments } from '../../actions/comment';
import CommentIndexItemContainer from './comment_index_item';

const CommentIndex = ({
  postId,
  comments,
  incrComCount,
  fetchTwoComments,
  fetchRootCommentCount,
  fetchMoreComments
}) => {
  const [offset, setOffset] = useState(0);
  const [allRootComments, setAllRootComments] = useState(true);
  const [rootCommentNum, setRootCommentNum] = useState(0);

  useEffect(() => {
    fetchTwoComments(postId);
    fetchRootCommentCount(postId).then(count => { 
      setRootCommentNum(count);
      if (count > 2) setAllRootComments(false);
    });
  }, []);

  const loadMoreComments = () => {
    fetchMoreComments(postId, offset);
    setOffset(offset + 1);

    if (rootCommentNum <= comments.length + 10) {
      setAllRootComments(true);
    }
  };

  const moreCommentsBtn = allRootComments 
    ? null 
    : (<button className='more-cmts' onClick={loadMoreComments}>
         Load more comments
       </button>);
  
  return (
    <>
      <ul className='comments-index'>
        {comments.map(comment => (
          <CommentIndexItemContainer key={comment.id} 
                                      comment={comment} 
                                      postId={postId} 
                                      isReply={false}
                                      incrComCount={incrComCount}/>
        ))}
      </ul>
      {moreCommentsBtn}
    </>
  );
};

const mapSTP = ({ entities: { comments } }, ownProps) => {
  const commentsArr = Object.values(comments)
                            .filter(comment => (
                              comment.postId === ownProps.postId && comment.parentCommentId === null
                            ))
                            .sort((a, b) => a.createdAt > b.createdAt ? 1 : -1)

  return {
    comments: commentsArr
  }
};

const mapDTP = dispatch => ({
  fetchTwoComments: postId => dispatch(fetchTwoComments(postId)),
  fetchMoreComments: (postId, offset) => dispatch(fetchMoreComments(postId, offset)),
  fetchRootCommentCount: postId => fetchRootCommentCount(postId)
});

const CommentIndexContainer = connect(mapSTP, mapDTP)(CommentIndex)

export default CommentIndexContainer;