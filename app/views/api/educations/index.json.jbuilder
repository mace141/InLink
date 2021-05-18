@educations.each do |education|
  json.set! education.id do 
    json.partial! '/api/educations/education', education: education
  end
end