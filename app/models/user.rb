class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    if user
      return user if user.is_password?(password)
    end
    nil
  end

  def reset_session_token!
    token = self.class.generate_session_token
    while User.where(session_token: token).exists?
      token = self.class.generate_session_token
    end
    self.session_token = token
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

end
