export const fetchPostLikes = post_id => (
  $.ajax({
    url: '/api/likes',
    data: {
      type: 'post',
      post_id
    }
  })
);

export const fetchCommentLikes = comment_id => (
  $.ajax({
    url: '/api/likes',
    data: {
      type: 'comment',
      comment_id
    }
  })
);

