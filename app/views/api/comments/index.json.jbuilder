@comments.each do |comment|
  json.set! comment.id do
    json.partial! '/api/comments/comment', comment: comment
    json.likes comment.likes.count
  end
end