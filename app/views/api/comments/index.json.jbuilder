json.comments do 
  @comments.each do |comment|
    json.set! comment.id do
      json.partial! '/api/comments/comment', comment: comment
      json.likes comment.likes.count
      json.replies comment.comments.count
    end
  end
end

json.users do 
  @comments.each do |comment|
    json.set! comment.user.id do 
      json.partial! '/api/users/user', user: comment.user
    end
  end
end