json.key_format! camelize: :lower
json.extract! user, :id, :email, :fname, :lname, :location, :headline, :industry, :summary

if user.avatar.attached?
  json.profileUrl url_for(user.avatar)
end

if user.background.attached? 
  json.background url_for(user.background)
end