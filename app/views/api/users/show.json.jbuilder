json.user do 
  json.set! @user.id do 
    json.partial! '/api/users/user', user: @user
    json.connections (
      @user.in_connects.where(connections: { accepted: true }).count
    ) + (
      @user.out_connects.where(connections: { accepted: true }).count
    )
  end
end

json.experiences do
  @user.experiences.each do |experience|
    json.set! experience.id do 
      json.partial! '/api/experiences/experience', experience: experience
    end
  end
end

json.educations do
  @user.educations.each do |education|
    json.set! education.id do 
      json.partial! '/api/educations/education', education: education
    end
  end
end