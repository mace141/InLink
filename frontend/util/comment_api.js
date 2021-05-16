export const fetchTwoComments = post_id => (
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

export const fetchLastReply = parent_comment_id => (
  $.ajax({
    url: '/api/comments',
    data: { 
      type: 'last reply', 
      parent_comment_id
    }
  })
);

export const fetchChildComments = parent_comment_id => (
  $.ajax({
    url: '/api/comments',
    data: { 
      type: 'load replies', 
      parent_comment_id
    }
  })
);

export const createComment = formData => (
  $.ajax({
    method: 'POST',
    url: '/api/comments',
    data: formData,
    contentType: false,
    processData: false
  })
);

export const updateComment = formData => (
  $.ajax({
    method: 'PATCH',
    url: `/api/comments/${formData.get('comment[id]')}`,
    data: formData,
    contentType: false,
    processData: false
  })
);

export const deleteComment = commentId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/comments/${commentId}`
  })
);