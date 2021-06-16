class User < ApplicationRecord
  validates :email, :password_digest, :session_token, :fname, :lname, :location, :headline, :industry, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password 

  has_many :posts, dependent: :destroy

  has_many :comments, dependent: :destroy

  has_many :likes, dependent: :destroy

  has_many :experiences, dependent: :destroy

  has_many :educations, dependent: :destroy

  has_many :out_connects,
    class_name: :Connection,
    foreign_key: :connector_id

  has_many :in_connects,
    class_name: :Connection,
    foreign_key: :connected_id

  has_one_attached :avatar, dependent: :destroy

  has_one_attached :background, dependent: :destroy

  def self.find_by_credentials(email, password) 
    user = User.find_by(email: email)
    return user if user && user.is_password?(password)
    nil 
  end

  def self.login_errors(params) 
    errors = {
      email: nil,
      password: nil
    }
    email = params[:email]
    password = params[:password]

    unless email.empty?
      emailArr = email.split('@')
      unless emailArr.length == 2 && emailArr[1] && emailArr[1].split('.').length == 2
          errors[:email] = 'Please enter a valid email' 
      end
    else
      errors[:email] = 'Please enter an email address'
    end

    unless password.empty?
      errors[:password] = 'The password you provided must have at least 6 characters' if password.length < 6
    else
      errors[:password] = 'Please enter a password'
    end

    if errors.values.all?(nil)
      if User.find_by(email: email)
        errors[:password] = 'Password is incorrect'
      else 
        errors[:email] = 'Email not found. Did you sign up?'
      end
    end
    
    errors.values
  end

  def self.search(query)
    by_name = "concat_ws(' ', users.fname, users.lname) ~* '#{query}'"
    by_education = "educations.school ~* '#{query}'"
    by_experience = "experiences.title ~* '#{query}' OR experiences.company ~* '#{query}'"

    User.joins(:educations)
        .joins(:experiences)
        .where([by_name, by_education, by_experience].join(' OR '))
        .limit(10)
        .distinct
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password 
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest) == password 
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save 
    self.session_token
  end
end
