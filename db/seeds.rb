# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "down"

ActiveRecord::Base.transaction do 
  User.destroy_all 
  Post.destroy_all
  Comment.destroy_all
  Like.destroy_all
  Experience.destroy_all 
  Education.destroy_all
  Connection.destroy_all
  
  guest = User.create(
    email: 'guest@user.com', 
    password: 'password',
    fname: 'Guest',
    lname: 'User',
    location: 'New York, New York, United States',
    headline: 'Baker at Bread Acquisition Inc.',
    industry: 'Bread Acquisition Inc.'
  )

  user_2_name = Faker::FunnyName.two_word_name.split(' ')
  user_2_addy = Faker::Address.full_address.split(', ')
  user_2_industry = Faker::Company.name
  user_2_profession = Faker::Company.profession.capitalize
  user_2 = User.create(
    email: 'user2@gmail.com',
    password: 'pass2word',
    fname: user_2_name[0],
    lname: user_2_name[1],
    location: "#{user_2_addy[1]}, #{user_2_addy[2].split[0]}, United States",
    headline: "#{user_2_profession} at #{user_2_industry}",
    industry: user_2_industry
  )

  user_3_name = Faker::FunnyName.two_word_name.split(' ')
  user_3_addy = Faker::Address.full_address.split(', ')
  user_3_industry = Faker::Company.name
  user_3_profession = Faker::Company.profession.capitalize
  user_3 = User.create(
    email: 'user3@gmail.com',
    password: 'pass3word',
    fname: user_3_name[0],
    lname: user_3_name[1],
    location: "#{user_3_addy[1]}, #{user_3_addy[2].split[0]}, United States",
    headline: "#{user_3_profession} at #{user_3_industry}",
    industry: user_3_industry
  )

  user_4_name = Faker::FunnyName.two_word_name.split(' ')
  user_4_addy = Faker::Address.full_address.split(', ')
  user_4_industry = Faker::Company.name
  user_4_profession = Faker::Company.profession.capitalize
  user_4 = User.create(
    email: 'user4@gmail.com',
    password: 'pass4word',
    fname: user_4_name[0],
    lname: user_4_name[1],
    location: "#{user_4_addy[1]}, #{user_4_addy[2].split[0]}, United States",
    headline: "#{user_4_profession} at #{user_4_industry}",
    industry: user_4_industry
  )

  user_5_name = Faker::FunnyName.two_word_name.split(' ')
  user_5_addy = Faker::Address.full_address.split(', ')
  user_5_industry = Faker::Company.name
  user_5_profession = Faker::Company.profession.capitalize
  user_5 = User.create(
    email: 'user5@gmail.com',
    password: 'pass5word',
    fname: user_5_name[0],
    lname: user_5_name[1],
    location: "#{user_5_addy[1]}, #{user_5_addy[2].split[0]}, United States",
    headline: "#{user_5_profession} at #{user_5_industry}",
    industry: user_5_industry
  )

  user_6_name = Faker::FunnyName.two_word_name.split(' ')
  user_6_addy = Faker::Address.full_address.split(', ')
  user_6_industry = Faker::Company.name
  user_6_profession = Faker::Company.profession.capitalize
  user_6 = User.create(
    email: 'user6@gmail.com',
    password: 'pass6word',
    fname: user_6_name[0],
    lname: user_6_name[1],
    location: "#{user_6_addy[1]}, #{user_6_addy[2].split[0]}, United States",
    headline: "#{user_6_profession} at #{user_6_industry}",
    industry: user_6_industry
  )

  user_7_name = Faker::FunnyName.two_word_name.split(' ')
  user_7_addy = Faker::Address.full_address.split(', ')
  user_7_industry = Faker::Company.name
  user_7_profession = Faker::Company.profession.capitalize
  user_7 = User.create(
    email: 'user7@gmail.com',
    password: 'pass7word',
    fname: user_7_name[0],
    lname: user_7_name[1],
    location: "#{user_7_addy[1]}, #{user_7_addy[2].split[0]}, United States",
    headline: "#{user_7_profession} at #{user_7_industry}",
    industry: user_7_industry
  )

  user_8_name = Faker::FunnyName.two_word_name.split(' ')
  user_8_addy = Faker::Address.full_address.split(', ')
  user_8_industry = Faker::Company.name
  user_8_profession = Faker::Company.profession.capitalize
  user_8 = User.create(
    email: 'user8@gmail.com',
    password: 'pass8word',
    fname: user_8_name[0],
    lname: user_8_name[1],
    location: "#{user_8_addy[1]}, #{user_8_addy[2].split[0]}, United States",
    headline: "#{user_8_profession} at #{user_8_industry}",
    industry: user_8_industry
  )

  user_9_name = Faker::FunnyName.two_word_name.split(' ')
  user_9_addy = Faker::Address.full_address.split(', ')
  user_9_industry = Faker::Company.name
  user_9_profession = Faker::Company.profession.capitalize
  user_9 = User.create(
    email: 'user9@gmail.com',
    password: 'pass9word',
    fname: user_9_name[0],
    lname: user_9_name[1],
    location: "#{user_9_addy[1]}, #{user_9_addy[2].split[0]}, United States",
    headline: "#{user_9_profession} at #{user_9_industry}",
    industry: user_9_industry
  )

  user_10_name = Faker::FunnyName.two_word_name.split(' ')
  user_10_addy = Faker::Address.full_address.split(', ')
  user_10_industry = Faker::Company.name
  user_10_profession = Faker::Company.profession.capitalize
  user_10 = User.create(
    email: 'user10@gmail.com',
    password: 'pass10word',
    fname: user_10_name[0],
    lname: user_10_name[1],
    location: "#{user_10_addy[1]}, #{user_10_addy[2].split[0]}, United States",
    headline: "#{user_10_profession} at #{user_10_industry}",
    industry: user_10_industry
  )

  user_11_name = Faker::FunnyName.two_word_name.split(' ')
  user_11_addy = Faker::Address.full_address.split(', ')
  user_11_industry = Faker::Company.name
  user_11_profession = Faker::Company.profession.capitalize
  user_11 = User.create(
    email: 'user11@gmail.com',
    password: 'pass11word',
    fname: user_11_name[0],
    lname: user_11_name[1],
    location: "#{user_11_addy[1]}, #{user_11_addy[2].split[0]}, United States",
    headline: "#{user_11_profession} at #{user_11_industry}",
    industry: user_11_industry
  )

  user_12_name = Faker::FunnyName.two_word_name.split(' ')
  user_12_addy = Faker::Address.full_address.split(', ')
  user_12_industry = Faker::Company.name
  user_12_profession = Faker::Company.profession.capitalize
  user_12 = User.create(
    email: 'user12@gmail.com',
    password: 'pass12word',
    fname: user_12_name[0],
    lname: user_12_name[1],
    location: "#{user_12_addy[1]}, #{user_12_addy[2].split[0]}, United States",
    headline: "#{user_12_profession} at #{user_12_industry}",
    industry: user_12_industry
  )

  user_13_name = Faker::FunnyName.two_word_name.split(' ')
  user_13_addy = Faker::Address.full_address.split(', ')
  user_13_industry = Faker::Company.name
  user_13_profession = Faker::Company.profession.capitalize
  user_13 = User.create(
    email: 'user13@gmail.com',
    password: 'pass13word',
    fname: user_13_name[0],
    lname: user_13_name[1],
    location: "#{user_13_addy[1]}, #{user_13_addy[2].split[0]}, United States",
    headline: "#{user_13_profession} at #{user_13_industry}",
    industry: user_13_industry
  )

  user_14_name = Faker::FunnyName.two_word_name.split(' ')
  user_14_addy = Faker::Address.full_address.split(', ')
  user_14_industry = Faker::Company.name
  user_14_profession = Faker::Company.profession.capitalize
  user_14 = User.create(
    email: 'user14@gmail.com',
    password: 'pass14word',
    fname: user_14_name[0],
    lname: user_14_name[1],
    location: "#{user_14_addy[1]}, #{user_14_addy[2].split[0]}, United States",
    headline: "#{user_14_profession} at #{user_14_industry}",
    industry: user_14_industry
  )

  user_15_name = Faker::FunnyName.two_word_name.split(' ')
  user_15_addy = Faker::Address.full_address.split(', ')
  user_15_industry = Faker::Company.name
  user_15_profession = Faker::Company.profession.capitalize
  user_15 = User.create(
    email: 'user15@gmail.com',
    password: 'pass15word',
    fname: user_15_name[0],
    lname: user_15_name[1],
    location: "#{user_15_addy[1]}, #{user_15_addy[2].split[0]}, United States",
    headline: "#{user_15_profession} at #{user_15_industry}",
    industry: user_15_industry
  )

  user_16_name = Faker::FunnyName.two_word_name.split(' ')
  user_16_addy = Faker::Address.full_address.split(', ')
  user_16_industry = Faker::Company.name
  user_16_profession = Faker::Company.profession.capitalize
  user_16 = User.create(
    email: 'user16@gmail.com',
    password: 'pass16word',
    fname: user_16_name[0],
    lname: user_16_name[1],
    location: "#{user_16_addy[1]}, #{user_16_addy[2].split[0]}, United States",
    headline: "#{user_16_profession} at #{user_16_industry}",
    industry: user_16_industry
  )

  user_17_name = Faker::FunnyName.two_word_name.split(' ')
  user_17_addy = Faker::Address.full_address.split(', ')
  user_17_industry = Faker::Company.name
  user_17_profession = Faker::Company.profession.capitalize
  user_17 = User.create(
    email: 'user17@gmail.com',
    password: 'pass17word',
    fname: user_17_name[0],
    lname: user_17_name[1],
    location: "#{user_17_addy[1]}, #{user_17_addy[2].split[0]}, United States",
    headline: "#{user_17_profession} at #{user_17_industry}",
    industry: user_17_industry
  )

  user_18_name = Faker::FunnyName.two_word_name.split(' ')
  user_18_addy = Faker::Address.full_address.split(', ')
  user_18_industry = Faker::Company.name
  user_18_profession = Faker::Company.profession.capitalize
  user_18 = User.create(
    email: 'user18@gmail.com',
    password: 'pass18word',
    fname: user_18_name[0],
    lname: user_18_name[1],
    location: "#{user_18_addy[1]}, #{user_18_addy[2].split[0]}, United States",
    headline: "#{user_18_profession} at #{user_18_industry}",
    industry: user_18_industry
  )

  user_19_name = Faker::FunnyName.two_word_name.split(' ')
  user_19_addy = Faker::Address.full_address.split(', ')
  user_19_industry = Faker::Company.name
  user_19_profession = Faker::Company.profession.capitalize
  user_19 = User.create(
    email: 'user19@gmail.com',
    password: 'pass19word',
    fname: user_19_name[0],
    lname: user_19_name[1],
    location: "#{user_19_addy[1]}, #{user_19_addy[2].split[0]}, United States",
    headline: "#{user_19_profession} at #{user_19_industry}",
    industry: user_19_industry
  )

  user_20_name = Faker::FunnyName.two_word_name.split(' ')
  user_20_addy = Faker::Address.full_address.split(', ')
  user_20_industry = Faker::Company.name
  user_20_profession = Faker::Company.profession.capitalize
  user_20 = User.create(
    email: 'user20@gmail.com',
    password: 'pass20word',
    fname: user_20_name[0],
    lname: user_20_name[1],
    location: "#{user_20_addy[1]}, #{user_20_addy[2].split[0]}, United States",
    headline: "#{user_20_profession} at #{user_20_industry}",
    industry: user_20_industry
  )

  avatar_1 = Down.download('https://inlink-seeds.s3.amazonaws.com/user1.png')
  guest.avatar.attach(io: avatar_1, filename: 'user1.png')

  avatar_2 = Down.download('https://inlink-seeds.s3.amazonaws.com/user2.png')
  user_2.avatar.attach(io: avatar_2, filename: 'user2.png')

  avatar_3 = Down.download('https://inlink-seeds.s3.amazonaws.com/user3.png')
  user_3.avatar.attach(io: avatar_3, filename: 'user3.png')

  avatar_4 = Down.download('https://inlink-seeds.s3.amazonaws.com/user4.png')
  user_4.avatar.attach(io: avatar_4, filename: 'user4.png')
  
  avatar_5 = Down.download('https://inlink-seeds.s3.amazonaws.com/user5.png')
  user_5.avatar.attach(io: avatar_5, filename: 'user5.png')

  avatar_6 = Down.download('https://inlink-seeds.s3.amazonaws.com/user6.png')
  user_6.avatar.attach(io: avatar_6, filename: 'user6.png')

  avatar_7 = Down.download('https://inlink-seeds.s3.amazonaws.com/user7.png')
  user_7.avatar.attach(io: avatar_7, filename: 'user7.png')

  avatar_8 = Down.download('https://inlink-seeds.s3.amazonaws.com/user8.png')
  user_8.avatar.attach(io: avatar_8, filename: 'user8.png')

  avatar_9 = Down.download('https://inlink-seeds.s3.amazonaws.com/user9.png')
  user_9.avatar.attach(io: avatar_9, filename: 'user9.png')

  avatar_10 = Down.download('https://inlink-seeds.s3.amazonaws.com/user10.png')
  user_10.avatar.attach(io: avatar_10, filename: 'user10.png')

  avatar_11 = Down.download('https://inlink-seeds.s3.amazonaws.com/user11.png')
  user_11.avatar.attach(io: avatar_11, filename: 'user11.png')

  avatar_12 = Down.download('https://inlink-seeds.s3.amazonaws.com/user12.png')
  user_12.avatar.attach(io: avatar_12, filename: 'user12.png')

  avatar_13 = Down.download('https://inlink-seeds.s3.amazonaws.com/user13.png')
  user_13.avatar.attach(io: avatar_13, filename: 'user13.png')

  avatar_14 = Down.download('https://inlink-seeds.s3.amazonaws.com/user14.png')
  user_14.avatar.attach(io: avatar_14, filename: 'user14.png')

  avatar_15 = Down.download('https://inlink-seeds.s3.amazonaws.com/user15.png')
  user_15.avatar.attach(io: avatar_15, filename: 'user15.png')

  avatar_16 = Down.download('https://inlink-seeds.s3.amazonaws.com/user16.png')
  user_16.avatar.attach(io: avatar_16, filename: 'user16.png')

  avatar_17 = Down.download('https://inlink-seeds.s3.amazonaws.com/user17.png')
  user_17.avatar.attach(io: avatar_17, filename: 'user17.png')

  avatar_18 = Down.download('https://inlink-seeds.s3.amazonaws.com/user18.png')
  user_18.avatar.attach(io: avatar_18, filename: 'user18.png')

  avatar_19 = Down.download('https://inlink-seeds.s3.amazonaws.com/user19.png')
  user_19.avatar.attach(io: avatar_19, filename: 'user19.png')

  avatar_20 = Down.download('https://inlink-seeds.s3.amazonaws.com/user20.png')
  user_20.avatar.attach(io: avatar_20, filename: 'user20.png')


  Experience.create(
    user_id: guest.id,
    title: 'Baker',
    employment_type: 'Full-time',
    company: 'Bread Acquisition Inc.',
    location: 'New York, NY',
    start_date: '2013-07-01', 
    end_date: nil,
    description: 'Acquire all bread for thyself'
  )

  Education.create(
    user_id: guest.id,
    school: 'University of Breadery',
    degree: "Master of Science in Bread Sciences",
    field: 'Bread Acquisition',
    start_year: 2009,
    end_year: 2013,
  )

  Education.create(
    user_id: guest.id,
    school: 'College of Bread Town',
    degree: "Bachelor's of Science in Bread Sciences",
    field: 'Bread Acquisition',
    start_year: 2005,
    end_year: 2009,
  )
  
  Experience.create(
    user_id: user_2.id,
    title: user_2_profession,
    employment_type: 'Full-time',
    company: user_2_industry,
    location: "#{user_2_addy[1]}, #{user_2_addy[2].split[0]}, United States",
    start_date: '2014-07-01', 
    end_date: nil,
  )

  Education.create(
    user_id: user_2.id,
    school: 'University of York New',
    degree: "Bachelor's of Arts",
    field: 'Painting',
    start_year: 2010,
    end_year: 2014,
  )

  Experience.create(
    user_id: user_3.id,
    title: user_3_profession,
    employment_type: 'Full-time',
    company: user_3_industry,
    location: "#{user_3_addy[1]}, #{user_3_addy[2].split[0]}, United States",
    start_date: '2005-08-01',
    end_date: '2008-02-01'
  )

  Education.create(
    user_id: user_3.id,
    school: 'Berkshire College',
    degree: "Bachelor's of Science",
    field: 'Engineering',
    start_year: 2000,
    end_year: 2004
  )

  Experience.create(
    user_id: user_4.id,
    title: user_4_profession,
    employment_type: 'Full-time',
    company: user_4_industry,
    location: "#{user_4_addy[1]}, #{user_4_addy[2].split[0]}, United States",
    start_date: '2007-12-01', 
    end_date: '2012-09-01'
  )

  Education.create(
    user_id: user_4.id,
    school: 'College of Betta',
    degree: "Bachelor's of Science",
    field: 'Horticulture',
    start_year: 1998,
    end_year: 2002,
  )

  Experience.create(
    user_id: user_5.id,
    title: user_5_profession,
    employment_type: 'Full-time',
    company: user_5_industry,
    location: "#{user_5_addy[1]}, #{user_5_addy[2].split[0]}, United States",
    start_date: '1999-01-01', 
    end_date: '2003-06-01',
  )

  Education.create(
    user_id: user_5.id,
    school: 'Williams College',
    degree: "Bachelor's of Arts",
    field: 'Humanities',
    start_year: 1994,
    end_year: 1998,
  )

  Experience.create(
    user_id: user_6.id,
    title: user_6_profession,
    employment_type: 'Full-time',
    company: user_6_industry,
    location: "#{user_6_addy[1]}, #{user_6_addy[2].split[0]}, United States",
    start_date: '1995-06-01'
  )

  Education.create(
    user_id: user_6.id,
    school: 'University of Central Floria',
    degree: "Bachelor's of Science",
    field: 'Construction Engineering Technology',
    start_year: 2010,
    end_year: 2014,
  )

  Experience.create(
    user_id: user_7.id,
    title: user_7_profession,
    employment_type: 'Full-time',
    company: user_7_industry,
    location: "#{user_7_addy[1]}, #{user_7_addy[2].split[0]}, United States",
    start_date: '1998-08-01'
  )

  Education.create(
    user_id: user_7.id,
    school: 'University of Texas, Austin',
    degree: "Bachelor's of Arts",
    field: 'Visual Arts - Sculpture',
    start_year: 1980,
    end_year: 1984,
  )

  Experience.create(
    user_id: user_8.id,
    title: user_8_profession,
    employment_type: 'Full-time',
    company: user_8_industry,
    location: "#{user_8_addy[1]}, #{user_8_addy[2].split[0]}, United States",
    start_date: '2014-12-01'
  )

  Education.create(
    user_id: user_8.id,
    school: 'United States Naval Academy',
    degree: "Bachelor's of Science",
    field: 'Aviation',
    start_year: 2010,
    end_year: 2014,
  )

  Experience.create(
    user_id: user_9.id,
    title: user_9_profession,
    employment_type: 'Full-time',
    company: user_9_industry,
    location: "#{user_9_addy[1]}, #{user_9_addy[2].split[0]}, United States",
    start_date: '2000-10-01', 
    end_date: '2007-08-01',
  )

  Education.create(
    user_id: user_9.id,
    school: 'Bryn Mawr College',
    degree: "Bachelor's of Science",
    field: 'Business - Information Systems',
    start_year: 1994,
    end_year: 1998,
  )

  Experience.create(
    user_id: user_10.id,
    title: user_10_profession,
    employment_type: 'Full-time',
    company: user_10_industry,
    location: "#{user_10_addy[1]}, #{user_10_addy[2].split[0]}, United States",
    start_date: '1970-03-01', 
    end_date: '1985-03-01',
  )

  Education.create(
    user_id: user_10.id,
    school: 'Northwestern University',
    degree: "Master of Science",
    field: 'Medicine - Internal Medicine',
    start_year: 1964,
    end_year: 1968,
  )

  Experience.create(
    user_id: user_11.id,
    title: user_11_profession,
    employment_type: 'Full-time',
    company: user_11_industry,
    location: "#{user_11_addy[1]}, #{user_11_addy[2].split[0]}, United States",
    start_date: '2012-11-01', 
    end_date: '2020-02-01',
  )

  Education.create(
    user_id: user_11.id,
    school: 'Rice University',
    degree: "Bachelor's of Arts",
    field: 'Performing Arts - Music',
    start_year: 2009,
    end_year: 2012,
  )

  Experience.create(
    user_id: user_12.id,
    title: user_12_profession,
    employment_type: 'Full-time',
    company: user_12_industry,
    location: "#{user_12_addy[1]}, #{user_12_addy[2].split[0]}, United States",
    start_date: '1996-02-01'
  )

  Education.create(
    user_id: user_12.id,
    school: 'Colby College',
    degree: "Bachelor's of Science",
    field: 'Mathematics',
    start_year: 1990,
    end_year: 1994,
  )

  Experience.create(
    user_id: user_13.id,
    title: user_13_profession,
    employment_type: 'Full-time',
    company: user_13_industry,
    location: "#{user_13_addy[1]}, #{user_13_addy[2].split[0]}, United States",
    start_date: '2017-08-01', 
    end_date: '2020-02-01',
  )

  Education.create(
    user_id: user_13.id,
    school: 'Villanova University',
    degree: "Bachelor's of Arts",
    field: 'Asian Studies',
    start_year: 2010,
    end_year: 2014,
  )

  Experience.create(
    user_id: user_14.id,
    title: user_14_profession,
    employment_type: 'Full-time',
    company: user_14_industry,
    location: "#{user_14_addy[1]}, #{user_14_addy[2].split[0]}, United States",
    start_date: '2006-12-01'
  )

  Education.create(
    user_id: user_14.id,
    school: "Davidson College",
    degree: "Bachelor's of Science",
    field: 'Environmental Studies and Forestry',
    start_year: 2002,
    end_year: 2006,
  )

  Experience.create(
    user_id: user_15.id,
    title: user_15_profession,
    employment_type: 'Full-time',
    company: user_15_industry,
    location: "#{user_15_addy[1]}, #{user_15_addy[2].split[0]}, United States",
    start_date: '1999-03-01', 
    end_date: '2008-05-01',
  )

  Education.create(
    user_id: user_15.id,
    school: 'Lehigh University',
    degree: "Bachelor's of Arts",
    field: 'Literature Theory',
    start_year: 1990,
    end_year: 1996,
  )

  Experience.create(
    user_id: user_16.id,
    title: user_16_profession,
    employment_type: 'Full-time',
    company: user_16_industry,
    location: "#{user_16_addy[1]}, #{user_16_addy[2].split[0]}, United States",
    start_date: '2002-09-01', 
    end_date: '2011-03-01',
  )

  Education.create(
    user_id: user_16.id,
    school: "Hamilton College",
    degree: "Bachelor's of Arts",
    field: 'Library and Museum Studies',
    start_year: 1995,
    end_year: 1999,
  )

  Experience.create(
    user_id: user_17.id,
    title: user_17_profession,
    employment_type: 'Full-time',
    company: user_17_industry,
    location: "#{user_17_addy[1]}, #{user_17_addy[2].split[0]}, United States",
    start_date: '2016-10-01', 
    end_date: '2019-12-01',
  )

  Education.create(
    user_id: user_17.id,
    school: "Lafayette College",
    degree: "Bachelor's of Science",
    field: 'Political Science',
    start_year: 2012,
    end_year: 2016,
  )

  Experience.create(
    user_id: user_18.id,
    title: user_18_profession,
    employment_type: 'Full-time',
    company: user_18_industry,
    location: "#{user_18_addy[1]}, #{user_18_addy[2].split[0]}, United States",
    start_date: '2004-07-01', 
    end_date: '2010-01-01',
  )

  Education.create(
    user_id: user_18.id,
    school: "Amherst College",
    degree: "Bachelor's of Science",
    field: 'Biology - Zoology',
    start_year: 1998,
    end_year: 2003,
  )

  Experience.create(
    user_id: user_19.id,
    title: user_19_profession,
    employment_type: 'Full-time',
    company: user_19_industry,
    location: "#{user_19_addy[1]}, #{user_19_addy[2].split[0]}, United States",
    start_date: '2018-11-01', 
    end_date: '2020-10-01',
  )

  Education.create(
    user_id: user_19.id,
    school: "Haverford College",
    degree: "Bachelor's of Science",
    field: 'Sociology - Social Economy',
    start_year: 2014,
    end_year: 2018,
  )

  Experience.create(
    user_id: user_20.id,
    title: user_20_profession,
    employment_type: 'Full-time',
    company: user_20_industry,
    location: "#{user_20_addy[1]}, #{user_20_addy[2].split[0]}, United States",
    start_date: '2006-07-01'
  )

  Education.create(
    user_id: user_20.id,
    school: "Stanford University",
    degree: "Bachelor's of Science",
    field: 'Economics - Public Finance',
    start_year: 2002,
    end_year: 2004,
  )

  Experience.create(
    user_id: user_5.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_5_addy[1]}, #{user_5_addy[2].split[0]}, United States",
    start_date: '2014-04-01'
  )

  Education.create(
    user_id: user_5.id,
    school: "Whitman College",
    degree: "Master of Arts",
    field: 'Linguistics',
    start_year: 2009,
    end_year: 2013,
  )

  Experience.create(
    user_id: user_8.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_8_addy[1]}, #{user_8_addy[2].split[0]}, United States",
    start_date: '2008-02-01', 
    end_date: '2009-03-01',
  )

  Education.create(
    user_id: user_11.id,
    school: "Trinity College",
    degree: "Master of Science",
    field: 'Chemistry - Marine Chemistry',
    start_year: 2021,
    end_year: 2025,
  )

  Experience.create(
    user_id: user_3.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_3_addy[1]}, #{user_3_addy[2].split[0]}, United States",
    start_date: '2009-02-01'
  )

  Education.create(
    user_id: user_18.id,
    school: "Princeton University",
    degree: "Master of Science",
    field: 'Physics - Geophysics',
    start_year: 2011,
    end_year: 2015,
  )

  Experience.create(
    user_id: user_10.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_10_addy[1]}, #{user_10_addy[2].split[0]}, United States",
    start_date: '1986-07-01'
  )

  Education.create(
    user_id: user_4.id,
    school: "Vassar College",
    degree: "Master of Science",
    field: 'Political Sociology',
    start_year: 2003,
    end_year: 2007,
  )

  Experience.create(
    user_id: user_13.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_13_addy[1]}, #{user_13_addy[2].split[0]}, United States",
    start_date: '2020-07-01'
  )

  Experience.create(
    user_id: user_15.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_15_addy[1]}, #{user_15_addy[2].split[0]}, United States",
    start_date: '2009-01-01'
  )

  Experience.create(
    user_id: user_17.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_17_addy[1]}, #{user_17_addy[2].split[0]}, United States",
    start_date: '2020-01-01'
  )

  Experience.create(
    user_id: user_9.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_9_addy[1]}, #{user_9_addy[2].split[0]}, United States",
    start_date: '2007-12-01'
  )

  Experience.create(
    user_id: user_19.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_19_addy[1]}, #{user_19_addy[2].split[0]}, United States",
    start_date: '2021-02-01'
  )

  Experience.create(
    user_id: user_16.id,
    title: Faker::Company.profession.capitalize,
    employment_type: 'Full-time',
    company: Faker::Company.name,
    location: "#{user_16_addy[1]}, #{user_16_addy[2].split[0]}, United States",
    start_date: '2011-06-01'
  )

  post_1 = Post.create(
    body: "Words are in my not-so-humble opinion, the most inexhaustible form of magic we have, capable both of inflicting injury and remedying it.",
    user_id: user_20.id 
  )

  post_2 = Post.create(
    body: "To the well-organized mind, death is but the next great adventure.",
    user_id: user_10.id 
  )

  post_3 = Post.create(
    body: "Laughter is poison to fear.",
    user_id: user_13.id
  )

  post_4 = Post.create(
    body: "Why does everything that's good for you have to taste so bad?",
    user_id: user_2.id
  )

  post_5 = Post.create(
    body: "Once you do something, you never forget. Even if you can't remember.",
    user_id: user_3.id
  )
  
  post_6 = Post.create(
    body: "Dark and difficult times lie ahead. Soon we must all face the choice between what is right and what is easy.",
    user_id: user_7.id
  )

  post_7 = Post.create(
    body: "The North remembers.",
    user_id: user_4.id
  )

  post_8 = Post.create(
    body: "I love heroes, but I don't want to be one. Do you even know what a hero is!? For example, you have some meat. Pirates will feast on the meat, but the hero will distribute it among the people! I want to eat the meat!",
    user_id: user_16.id
  )
  
  post_9 = Post.create(
    body: "Stop counting only those things you have lost! What is gone, is gone! So ask yourself this. What is there... that still remains to you?!",
    user_id: user_19.id
  )

  post_10 = Post.create(
    body: "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.",
    user_id: user_5.id
  )

  post_11 = Post.create(
    body: "Knowledge could be more valuable than gold, more deadly than a dagger.",
    user_id: user_6.id
  )

  post_12 = Post.create(
    body: "To true friendship, how long you've known each other means nothing.",
    user_id: user_6.id
  )

  post_13 = Post.create(
    body: "People's dreams... Never end!",
    user_id: user_3.id
  )

  post_14 = Post.create(
    body: "Suffering proves you are still a man! This pain is part of being human...the fact that you can feel pain like this is your greatest strength.",
    user_id: user_17.id
  )

  post_15 = Post.create(
    body: "Give me honorable enemies rather than ambitious ones, and I'll sleep more easily by night.",
    user_id: user_8.id
  )

  post_16 = Post.create(
    body: "Maybe nothing in this world happens by accident. As everything happens for a reason, our destiny slowly takes form.",
    user_id: user_13.id
  )

  post_17 = Post.create(
    body: "When do you think people die? When they are shot through the heart by the bullet of a pistol? No. When they are ravaged by an incurable disease? No... It’s when they're forgotten!",
    user_id: user_9.id
  )

  post_18 = Post.create(
    body: "It is our choices, that show what we truly are, far more than our abilities.",
    user_id: user_18.id
  )

  post_19 = Post.create(
    body: "Fear cuts deeper than swords.",
    user_id: guest.id
  )

  post_20 = Post.create(
    body: "When the world shoves you around, you just gotta stand up and shove back. It's not like somebody's gonna save you if you start babbling excuses.",
    user_id: user_10.id
  )

  post_21 = Post.create(
    body: "You can spill drinks on me, even spit on me. I'll just laugh about it. But If you dare to hurt my friends... I won't forgive you!",
    user_id: user_11.id
  )

  post_22 = Post.create(
    body: "It’s wingardium leviOsa, not leviosAH.",
    user_id: user_11.id
  )

  post_23 = Post.create(
    body: "When you play a game of thrones you win or you die.",
    user_id: user_12.id
  )

  post_24 = Post.create(
    body: "A mind needs books as a sword needs a whetstone, if it is to keep its edge.",
    user_id: user_12.id
  )

  post_25 = Post.create(
    body: "A lion doesn't concern itself with the opinion of sheep.",
    user_id: user_2.id
  )

  post_26 = Post.create(
    body: "It does not do to dwell on dreams and forget to live.",
    user_id: user_8.id
  )

  post_27 = Post.create(
    body: "Once you’ve accepted your flaws, no one can use them against you.",
    user_id: user_14.id
  )

  post_28 = Post.create(
    body: "Food is a gift from god. Spices are a gift from the devil.",
    user_id: user_14.id
  )

  post_29 = Post.create(
    body: "Pirates are evil? The Marines are righteous?... Justice will prevail, you say? But of course it will! Whoever wins this war becomes justice!",
    user_id: user_20.id
  )

  post_30 = Post.create(
    body: "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
    user_id: user_15.id
  )

  post_31 = Post.create(
    body: "Never forget who you are. The rest of the world won't. Wear it like an armor and it can never be used against you.",
    user_id: user_4.id
  )

  post_32 = Post.create(
    body: "Miracles only happen to those who never give up.",
    user_id: user_16.id
  )

  post_33 = Post.create(
    body: "I don't wanna live a thousand years. If I just live through today, that'll be enough.",
    user_id: user_7.id
  )

  post_34 = Post.create(
    body: "If you want to know what a man’s like, take a good look at how he treats his inferiors, not his equals.",
    user_id: user_17.id
  )

  post_35 = Post.create(
    body: "Nothing burns like the cold.",
    user_id: user_9.id
  )

  post_36 = Post.create(
    body: "There comes a time when a man has to stand and fight! That time is when his friends' dreams are being laughed at! And I won't let you laugh at that!",
    user_id: user_18.id
  )

  post_37 = Post.create(
    body: "It's not some sort of special power. He has the ability to make allies of everyone he meets. And that is the most fearsome ability on the high seas.",
    user_id: user_5.id
  )

  post_38 = Post.create(
    body: "You sort of start thinking anything’s possible if you’ve got enough nerve.",
    user_id: user_19.id
  )

  post_39 = Post.create(
    body: "Hodor? Hodor.",
    user_id: user_15.id
  )

  post_40 = Post.create(
    body: "I love my job at Bread Acquisition Inc.!",
    user_id: guest.id
  )

  cmt_1 = Comment.create(
    body: 'Congrats!',
    user_id: user_7.id,
    post_id: post_40.id
  )

  cmt_2 = Comment.create(
    body: 'Congratulations!',
    user_id: user_3.id,
    post_id: post_40.id
  )
  
  cmt_3 = Comment.create(
    body: 'Congrats!',
    user_id: user_2.id,
    post_id: post_40.id
  )
  
  cmt_4 = Comment.create(
    body: 'Congratulations!',
    user_id: user_8.id,
    post_id: post_40.id
  )

  cmt_5 = Comment.create(
    body: 'Congratulations Guest!!',
    user_id: user_9.id,
    post_id: post_40.id
  )
  
  cmt_6 = Comment.create(
    body: 'Congrats!',
    user_id: user_10.id,
    post_id: post_40.id
  )
    
  cmt_7 = Comment.create(
    body: 'Congrats!',
    user_id: user_14.id,
    post_id: post_40.id
  )

  cmt_8 = Comment.create(
    body: 'Congratulations!',
    user_id: user_16.id,
    post_id: post_40.id
  )
  
  cmt_9 = Comment.create(
    body: 'Congrats Guest!!',
    user_id: user_18.id,
    post_id: post_40.id
  )

  cmt_10 = Comment.create(
    body: 'Congratulations!',
    user_id: user_20.id,
    post_id: post_40.id
  )

  cmt_11 = Comment.create(
    body: 'Congratulations Guest! Go get that bread!!',
    user_id: user_12.id,
    post_id: post_40.id
  )

  cmt_12 = Comment.create(
    body: 'You bet I will! Thanks!',
    user_id: guest.id,
    post_id: post_40.id,
    parent_comment_id: cmt_11.id
  )
  
  Connection.create(
    connector_id: guest.id,
    connected_id: user_2.id,
    accepted: true
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_3.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_4.id,
    connected_id: guest.id,
    accepted: false
  )

  Connection.create(
    connector_id: user_5.id,
    connected_id: guest.id,
    accepted: false
  )

  Connection.create(
    connector_id: user_6.id,
    connected_id: guest.id,
    accepted: false
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_7.id,
    accepted: true
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_8.id,
    accepted: true
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_9.id,
    accepted: true
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_10.id,
    accepted: true
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_12.id,
    accepted: true
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_14.id,
    accepted: true
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_16.id,
    accepted: true
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_18.id,
    accepted: true
  )

  Connection.create(
    connector_id: guest.id,
    connected_id: user_20.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_11.id,
    connected_id: guest.id,
    accepted: false
  )

  Connection.create(
    connector_id: user_13.id,
    connected_id: guest.id,
    accepted: false
  )

  Connection.create(
    connector_id: user_15.id,
    connected_id: guest.id,
    accepted: false
  )

  Connection.create(
    connector_id: user_17.id,
    connected_id: guest.id,
    accepted: false
  )

  Connection.create(
    connector_id: user_19.id,
    connected_id: guest.id,
    accepted: false
  )

  Connection.create(
    connector_id: user_2.id,
    connected_id: user_3.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_2.id,
    connected_id: user_4.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_2.id,
    connected_id: user_5.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_2.id,
    connected_id: user_6.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_2.id,
    connected_id: user_7.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_3.id,
    connected_id: user_4.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_3.id,
    connected_id: user_5.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_3.id,
    connected_id: user_6.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_3.id,
    connected_id: user_7.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_3.id,
    connected_id: user_8.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_4.id,
    connected_id: user_5.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_4.id,
    connected_id: user_6.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_4.id,
    connected_id: user_7.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_4.id,
    connected_id: user_8.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_4.id,
    connected_id: user_9.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_5.id,
    connected_id: user_6.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_5.id,
    connected_id: user_7.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_5.id,
    connected_id: user_8.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_5.id,
    connected_id: user_9.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_5.id,
    connected_id: user_10.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_6.id,
    connected_id: user_7.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_6.id,
    connected_id: user_8.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_6.id,
    connected_id: user_9.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_6.id,
    connected_id: user_10.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_6.id,
    connected_id: user_11.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_7.id,
    connected_id: user_8.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_7.id,
    connected_id: user_9.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_7.id,
    connected_id: user_10.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_7.id,
    connected_id: user_11.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_7.id,
    connected_id: user_12.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_8.id,
    connected_id: user_9.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_8.id,
    connected_id: user_10.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_8.id,
    connected_id: user_11.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_8.id,
    connected_id: user_12.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_8.id,
    connected_id: user_13.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_9.id,
    connected_id: user_10.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_9.id,
    connected_id: user_11.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_9.id,
    connected_id: user_12.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_9.id,
    connected_id: user_13.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_9.id,
    connected_id: user_14.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_10.id,
    connected_id: user_11.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_10.id,
    connected_id: user_12.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_10.id,
    connected_id: user_13.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_10.id,
    connected_id: user_14.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_10.id,
    connected_id: user_15.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_11.id,
    connected_id: user_12.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_11.id,
    connected_id: user_13.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_11.id,
    connected_id: user_14.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_11.id,
    connected_id: user_15.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_11.id,
    connected_id: user_16.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_12.id,
    connected_id: user_13.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_12.id,
    connected_id: user_14.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_12.id,
    connected_id: user_15.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_12.id,
    connected_id: user_16.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_12.id,
    connected_id: user_17.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_13.id,
    connected_id: user_14.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_13.id,
    connected_id: user_15.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_13.id,
    connected_id: user_16.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_13.id,
    connected_id: user_17.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_13.id,
    connected_id: user_18.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_14.id,
    connected_id: user_15.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_14.id,
    connected_id: user_16.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_14.id,
    connected_id: user_17.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_14.id,
    connected_id: user_18.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_14.id,
    connected_id: user_19.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_15.id,
    connected_id: user_15.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_15.id,
    connected_id: user_17.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_15.id,
    connected_id: user_18.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_15.id,
    connected_id: user_19.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_15.id,
    connected_id: user_20.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_16.id,
    connected_id: user_17.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_16.id,
    connected_id: user_18.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_16.id,
    connected_id: user_19.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_16.id,
    connected_id: user_20.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_16.id,
    connected_id: user_2.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_17.id,
    connected_id: user_18.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_17.id,
    connected_id: user_19.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_17.id,
    connected_id: user_20.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_17.id,
    connected_id: user_2.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_17.id,
    connected_id: user_3.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_18.id,
    connected_id: user_19.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_18.id,
    connected_id: user_20.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_18.id,
    connected_id: user_2.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_18.id,
    connected_id: user_3.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_18.id,
    connected_id: user_4.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_19.id,
    connected_id: user_20.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_19.id,
    connected_id: user_5.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_19.id,
    connected_id: user_6.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_19.id,
    connected_id: user_7.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_19.id,
    connected_id: user_8.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_20.id,
    connected_id: user_10.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_20.id,
    connected_id: user_11.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_20.id,
    connected_id: user_12.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_20.id,
    connected_id: user_13.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_20.id,
    connected_id: user_14.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_6.id,
    connected_id: user_12.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_7.id,
    connected_id: user_13.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_8.id,
    connected_id: user_14.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_9.id,
    connected_id: user_15.id,
    accepted: true
  )

  Connection.create(
    connector_id: user_10.id,
    connected_id: user_16.id,
    accepted: true
  )
end