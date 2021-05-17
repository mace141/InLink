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

export const createLike = like => (
  $.ajax({
    method: 'POST',
    url: '/api/likes',
    data: { like }
  })
);

export const deleteLike = likeId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/likes/${likeId}`
  })
);

