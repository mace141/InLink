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
  user_2_industry = Faker::Company.name
  user_2 = User.create(
    email: Faker::Internet.email,
    password: 'pass2word',
    fname: user_2_name[0],
    lname: user_2_name[1],
    location: "#{user_2_addy[1]}, #{user_2_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_2_industry}",
    industry: user_2_industry
  )

  user_3_name = Faker::FunnyName.two_word_name.split(' ')
  user_3_addy = Faker::Address.full_address.split(', ')
  user_3_industry = Faker::Company.name
  user_3 = User.create(
    email: Faker::Internet.email,
    password: 'pass3word',
    fname: user_3_name[0],
    lname: user_3_name[1],
    location: "#{user_3_addy[1]}, #{user_3_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_3_industry}",
    industry: Faker::Company.name
  )

  user_4_name = Faker::FunnyName.two_word_name.split(' ')
  user_4_addy = Faker::Address.full_address.split(', ')
  user_4_industry = Faker::Company.name
  user_4 = User.create(
    email: Faker::Internet.email,
    password: 'pass4word',
    fname: user_4_name[0],
    lname: user_4_name[1],
    location: "#{user_4_addy[1]}, #{user_4_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_4_industry}",
    industry: Faker::Company.name
  )

  user_5_name = Faker::FunnyName.two_word_name.split(' ')
  user_5_addy = Faker::Address.full_address.split(', ')
  user_5_industry = Faker::Company.name
  user_5 = User.create(
    email: Faker::Internet.email,
    password: 'pass5word',
    fname: user_5_name[0],
    lname: user_5_name[1],
    location: "#{user_5_addy[1]}, #{user_5_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_5_industry}",
    industry: Faker::Company.name
  )

  user_6_name = Faker::FunnyName.two_word_name.split(' ')
  user_6_addy = Faker::Address.full_address.split(', ')
  user_6_industry = Faker::Company.name
  user_6 = User.create(
    email: Faker::Internet.email,
    password: 'pass6word',
    fname: user_6_name[0],
    lname: user_6_name[1],
    location: "#{user_6_addy[1]}, #{user_6_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_6_industry}",
    industry: Faker::Company.name
  )

  user_7_name = Faker::FunnyName.two_word_name.split(' ')
  user_7_addy = Faker::Address.full_address.split(', ')
  user_7_industry = Faker::Company.name
  user_7 = User.create(
    email: Faker::Internet.email,
    password: 'pass7word',
    fname: user_7_name[0],
    lname: user_7_name[1],
    location: "#{user_7_addy[1]}, #{user_7_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_7_industry}",
    industry: Faker::Company.name
  )

  user_8_name = Faker::FunnyName.two_word_name.split(' ')
  user_8_addy = Faker::Address.full_address.split(', ')
  user_8_industry = Faker::Company.name
  user_8 = User.create(
    email: Faker::Internet.email,
    password: 'pass8word',
    fname: user_8_name[0],
    lname: user_8_name[1],
    location: "#{user_8_addy[1]}, #{user_8_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_8_industry}",
    industry: Faker::Company.name
  )

  user_9_name = Faker::FunnyName.two_word_name.split(' ')
  user_9_addy = Faker::Address.full_address.split(', ')
  user_9_industry = Faker::Company.name
  user_9 = User.create(
    email: Faker::Internet.email,
    password: 'pass9word',
    fname: user_9_name[0],
    lname: user_9_name[1],
    location: "#{user_9_addy[1]}, #{user_9_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_9_industry}",
    industry: Faker::Company.name
  )

  user_10_name = Faker::FunnyName.two_word_name.split(' ')
  user_10_addy = Faker::Address.full_address.split(', ')
  user_10_industry = Faker::Company.name
  user_10 = User.create(
    email: Faker::Internet.email,
    password: 'pass10word',
    fname: user_10_name[0],
    lname: user_10_name[1],
    location: "#{user_10_addy[1]}, #{user_10_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_10_industry}",
    industry: Faker::Company.name
  )

  user_11_name = Faker::FunnyName.two_word_name.split(' ')
  user_11_addy = Faker::Address.full_address.split(', ')
  user_11_industry = Faker::Company.name
  user_11 = User.create(
    email: Faker::Internet.email,
    password: 'pass11word',
    fname: user_11_name[0],
    lname: user_11_name[1],
    location: "#{user_11_addy[1]}, #{user_11_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_11_industry}",
    industry: Faker::Company.name
  )

  user_12_name = Faker::FunnyName.two_word_name.split(' ')
  user_12_addy = Faker::Address.full_address.split(', ')
  user_12_industry = Faker::Company.name
  user_12 = User.create(
    email: Faker::Internet.email,
    password: 'pass12word',
    fname: user_12_name[0],
    lname: user_12_name[1],
    location: "#{user_12_addy[1]}, #{user_12_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_12_industry}",
    industry: Faker::Company.name
  )

  user_13_name = Faker::FunnyName.two_word_name.split(' ')
  user_13_addy = Faker::Address.full_address.split(', ')
  user_13_industry = Faker::Company.name
  user_13 = User.create(
    email: Faker::Internet.email,
    password: 'pass13word',
    fname: user_13_name[0],
    lname: user_13_name[1],
    location: "#{user_13_addy[1]}, #{user_13_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_13_industry}",
    industry: Faker::Company.name
  )

  user_14_name = Faker::FunnyName.two_word_name.split(' ')
  user_14_addy = Faker::Address.full_address.split(', ')
  user_14_industry = Faker::Company.name
  user_14 = User.create(
    email: Faker::Internet.email,
    password: 'pass14word',
    fname: user_14_name[0],
    lname: user_14_name[1],
    location: "#{user_14_addy[1]}, #{user_14_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_14_industry}",
    industry: Faker::Company.name
  )

  user_15_name = Faker::FunnyName.two_word_name.split(' ')
  user_15_addy = Faker::Address.full_address.split(', ')
  user_15_industry = Faker::Company.name
  user_15 = User.create(
    email: Faker::Internet.email,
    password: 'pass15word',
    fname: user_15_name[0],
    lname: user_15_name[1],
    location: "#{user_15_addy[1]}, #{user_15_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_15_industry}",
    industry: Faker::Company.name
  )

  user_16_name = Faker::FunnyName.two_word_name.split(' ')
  user_16_addy = Faker::Address.full_address.split(', ')
  user_16_industry = Faker::Company.name
  user_16 = User.create(
    email: Faker::Internet.email,
    password: 'pass16word',
    fname: user_16_name[0],
    lname: user_16_name[1],
    location: "#{user_16_addy[1]}, #{user_16_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_16_industry}",
    industry: Faker::Company.name
  )

  user_17_name = Faker::FunnyName.two_word_name.split(' ')
  user_17_addy = Faker::Address.full_address.split(', ')
  user_17_industry = Faker::Company.name
  user_17 = User.create(
    email: Faker::Internet.email,
    password: 'pass17word',
    fname: user_17_name[0],
    lname: user_17_name[1],
    location: "#{user_17_addy[1]}, #{user_17_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_17_industry}",
    industry: Faker::Company.name
  )

  user_18_name = Faker::FunnyName.two_word_name.split(' ')
  user_18_addy = Faker::Address.full_address.split(', ')
  user_18_industry = Faker::Company.name
  user_18 = User.create(
    email: Faker::Internet.email,
    password: 'pass18word',
    fname: user_18_name[0],
    lname: user_18_name[1],
    location: "#{user_18_addy[1]}, #{user_18_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_18_industry}",
    industry: Faker::Company.name
  )

  user_19_name = Faker::FunnyName.two_word_name.split(' ')
  user_19_addy = Faker::Address.full_address.split(', ')
  user_19_industry = Faker::Company.name
  user_19 = User.create(
    email: Faker::Internet.email,
    password: 'pass19word',
    fname: user_19_name[0],
    lname: user_19_name[1],
    location: "#{user_19_addy[1]}, #{user_19_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_19_industry}",
    industry: Faker::Company.name
  )

  user_20_name = Faker::FunnyName.two_word_name.split(' ')
  user_20_addy = Faker::Address.full_address.split(', ')
  user_20_industry = Faker::Company.name
  user_20 = User.create(
    email: Faker::Internet.email,
    password: 'pass20word',
    fname: user_20_name[0],
    lname: user_20_name[1],
    location: "#{user_20_addy[1]}, #{user_20_addy[2].split[0]}, United States",
    headline: "#{Faker::Company.profession.capitalize} at #{user_20_industry}",
    industry: Faker::Company.name
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
    body: "I got a new job, I'm a Guest at GuestLand!",
    user_id: guest.id
  )
end