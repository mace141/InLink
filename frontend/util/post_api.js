export const fetchPosts = () => (
  $.ajax({
    url: `/api/posts`
  })
);

export const fetchPost = postId => (
  $.ajax({
    url: `/api/posts/${postId}`
  })
);

export const createPost = post => (
  $.ajax({
    method: 'POST',
    url: '/api/posts',
    data: { post }
  })
);

export const createPostMedia = formData => (
  $.ajax({
    method: 'POST',
    url: '/api/posts',
    data: formData,
    contentType: false,
    processData: false
  })
);

export const updatePost = post => (
  $.ajax({
    method: 'PATCH',
    url: `/api/posts/${post.id}`,
    data: { post }
  })
);

export const deletePost = postId => (
  $.ajax({
    method: 'DELETE',
    url: `/api/posts/${postId}`
  })
);
