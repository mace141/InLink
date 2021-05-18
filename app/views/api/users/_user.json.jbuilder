json.key_format! camelize: :lower
json.extract! user, :id, :email, :fname, :lname, :location, :headline, :industry, :summary

if user.profile_pic.attached?
  json.profileUrl url_for(user.profile_pic)
end