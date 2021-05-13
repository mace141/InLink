json.key_format! camelize: :lower
json.extract! post, :id, :body, :user_id

if post.media.attached?
  json.mediaUrl url_for(post.media)
end