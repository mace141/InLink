json.key_format! camelize: :lower
json.extract! user, :id, :email, :fname, :lname, :location, :headline, :industry, :summary

if user.media.attached?
  json.mediaUrl url_for(user.media)
end