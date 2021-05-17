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

export const fetchPostNumLikes = post_id => (
  $.ajax({
    url: '/api/likes/like_count',
    data: {
      type: 'post',
      post_id
    }
  })
);

export const fetchCommentNumLikes = comment_id => (
  $.ajax({
    url: '/api/likes/like_count',
    data: {
      type: 'comment',
      comment_id
    }
  })
);

export const fetchUserLiked = like => (
  $.ajax({
    url: '/api/likes/user_liked',
    data: { like }
  })
)

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

