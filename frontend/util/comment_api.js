export const fetchComments = (post_id, num = 2) => (
  $.ajax({
    url: '/api/comments',
    data: { num, post_id }
  })
);

// export const fetchChildComments = (parent_comment_id) => (
//   $.ajax({
//     url
//   })
// )