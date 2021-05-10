class User < ApplicationRecord
  validates :email, :password_digest, :session_token, :fname, :lname, :location, :headline, :industry, presence: true
  validates :email, :session_token, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  after_initialize :ensure_session_token

  attr_reader :password 

  def self.find_by_credentials(username, password) 
    user = User.find_by(username: username)
    return user if user && user.is_password?(password)
    nil 
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password 
  end

  def is_password(password)
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
