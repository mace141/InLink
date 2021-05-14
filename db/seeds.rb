# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do 
  User.destroy_all 
  Post.destroy_all
  
  guest = User.create(
    email: 'guest@user.com', 
    password: 'password',
    fname: 'Guest',
    lname: 'User',
    location: 'New York, New York, United States',
    headline: 'Guest at GuestLand',
    industry: 'GuestLand'
  )

  user_2_name = Faker::FunnyName.two_word_name.split(' ')
  user_2_addy = Faker::Address.full_address.split(', ')
  user_2 = User.create(
    email: Faker::Internet.email,
    password: 'pass2word',
    fname: user_2_name[0],
    lname: user_2_name[1],
    location: "#{user_2_addy[1]}, #{user_2_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_3_name = Faker::FunnyName.two_word_name.split(' ')
  user_3_addy = Faker::Address.full_address.split(', ')
  user_3 = User.create(
    email: Faker::Internet.email,
    password: 'pass3word',
    fname: user_3_name[0],
    lname: user_3_name[1],
    location: "#{user_3_addy[1]}, #{user_3_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_4_name = Faker::FunnyName.two_word_name.split(' ')
  user_4_addy = Faker::Address.full_address.split(', ')
  user_4 = User.create(
    email: Faker::Internet.email,
    password: 'pass4word',
    fname: user_4_name[0],
    lname: user_4_name[1],
    location: "#{user_4_addy[1]}, #{user_4_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_5_name = Faker::FunnyName.two_word_name.split(' ')
  user_5_addy = Faker::Address.full_address.split(', ')
  user_5 = User.create(
    email: Faker::Internet.email,
    password: 'pass5word',
    fname: user_5_name[0],
    lname: user_5_name[1],
    location: "#{user_5_addy[1]}, #{user_5_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_6_name = Faker::FunnyName.two_word_name.split(' ')
  user_6_addy = Faker::Address.full_address.split(', ')
  user_6 = User.create(
    email: Faker::Internet.email,
    password: 'pass6word',
    fname: user_6_name[0],
    lname: user_6_name[1],
    location: "#{user_6_addy[1]}, #{user_6_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_7_name = Faker::FunnyName.two_word_name.split(' ')
  user_7_addy = Faker::Address.full_address.split(', ')
  user_7 = User.create(
    email: Faker::Internet.email,
    password: 'pass7word',
    fname: user_7_name[0],
    lname: user_7_name[1],
    location: "#{user_7_addy[1]}, #{user_7_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_8_name = Faker::FunnyName.two_word_name.split(' ')
  user_8_addy = Faker::Address.full_address.split(', ')
  user_8 = User.create(
    email: Faker::Internet.email,
    password: 'pass8word',
    fname: user_8_name[0],
    lname: user_8_name[1],
    location: "#{user_8_addy[1]}, #{user_8_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_9_name = Faker::FunnyName.two_word_name.split(' ')
  user_9_addy = Faker::Address.full_address.split(', ')
  user_9 = User.create(
    email: Faker::Internet.email,
    password: 'pass9word',
    fname: user_9_name[0],
    lname: user_9_name[1],
    location: "#{user_9_addy[1]}, #{user_9_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_10_name = Faker::FunnyName.two_word_name.split(' ')
  user_10_addy = Faker::Address.full_address.split(', ')
  user_10 = User.create(
    email: Faker::Internet.email,
    password: 'pass10word',
    fname: user_10_name[0],
    lname: user_10_name[1],
    location: "#{user_10_addy[1]}, #{user_10_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_11_name = Faker::FunnyName.two_word_name.split(' ')
  user_11_addy = Faker::Address.full_address.split(', ')
  user_11 = User.create(
    email: Faker::Internet.email,
    password: 'pass11word',
    fname: user_11_name[0],
    lname: user_11_name[1],
    location: "#{user_11_addy[1]}, #{user_11_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_12_name = Faker::FunnyName.two_word_name.split(' ')
  user_12_addy = Faker::Address.full_address.split(', ')
  user_12 = User.create(
    email: Faker::Internet.email,
    password: 'pass12word',
    fname: user_12_name[0],
    lname: user_12_name[1],
    location: "#{user_12_addy[1]}, #{user_12_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_13_name = Faker::FunnyName.two_word_name.split(' ')
  user_13_addy = Faker::Address.full_address.split(', ')
  user_13 = User.create(
    email: Faker::Internet.email,
    password: 'pass13word',
    fname: user_13_name[0],
    lname: user_13_name[1],
    location: "#{user_13_addy[1]}, #{user_13_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_14_name = Faker::FunnyName.two_word_name.split(' ')
  user_14_addy = Faker::Address.full_address.split(', ')
  user_14 = User.create(
    email: Faker::Internet.email,
    password: 'pass14word',
    fname: user_14_name[0],
    lname: user_14_name[1],
    location: "#{user_14_addy[1]}, #{user_14_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_15_name = Faker::FunnyName.two_word_name.split(' ')
  user_15_addy = Faker::Address.full_address.split(', ')
  user_15 = User.create(
    email: Faker::Internet.email,
    password: 'pass15word',
    fname: user_15_name[0],
    lname: user_15_name[1],
    location: "#{user_15_addy[1]}, #{user_15_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_16_name = Faker::FunnyName.two_word_name.split(' ')
  user_16_addy = Faker::Address.full_address.split(', ')
  user_16 = User.create(
    email: Faker::Internet.email,
    password: 'pass16word',
    fname: user_16_name[0],
    lname: user_16_name[1],
    location: "#{user_16_addy[1]}, #{user_16_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_17_name = Faker::FunnyName.two_word_name.split(' ')
  user_17_addy = Faker::Address.full_address.split(', ')
  user_17 = User.create(
    email: Faker::Internet.email,
    password: 'pass17word',
    fname: user_17_name[0],
    lname: user_17_name[1],
    location: "#{user_17_addy[1]}, #{user_17_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_18_name = Faker::FunnyName.two_word_name.split(' ')
  user_18_addy = Faker::Address.full_address.split(', ')
  user_18 = User.create(
    email: Faker::Internet.email,
    password: 'pass18word',
    fname: user_18_name[0],
    lname: user_18_name[1],
    location: "#{user_18_addy[1]}, #{user_18_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_19_name = Faker::FunnyName.two_word_name.split(' ')
  user_19_addy = Faker::Address.full_address.split(', ')
  user_19 = User.create(
    email: Faker::Internet.email,
    password: 'pass19word',
    fname: user_19_name[0],
    lname: user_19_name[1],
    location: "#{user_19_addy[1]}, #{user_19_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )

  user_20_name = Faker::FunnyName.two_word_name.split(' ')
  user_20_addy = Faker::Address.full_address.split(', ')
  user_20 = User.create(
    email: Faker::Internet.email,
    password: 'pass20word',
    fname: user_20_name[0],
    lname: user_20_name[1],
    location: "#{user_20_addy[1]}, #{user_20_addy[2].split[0]}, United States",
    headline: Faker::Company.profession
    industry: Faker::Company.name
  )
end