@posts.each do |post|
  json.partail! '/api/posts/post', post: post
end