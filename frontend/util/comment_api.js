export const fetchTwoComments = (post_id) => (
  $.ajax({
    url: '/api/comments',
    data: { 
      type: 'comment button',
      post_id
    }
  })
);

export const fetchMoreComments = (post_id, limit) => (
  $.ajax({
    url: '/api/comments',
    data: { 
      type: 'more comments',
      post_id,
      limit
    }
  })
);

export const fetchChildComments = (parent_comment_id) => (
  $.ajax({
    url: '/api/comments',
    data: { 
      type: 'load replies', 
      parent_comment_id
    }
  })
);