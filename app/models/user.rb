class User < ActiveRecord::Base
  validates :email, :password_digest, :session_token, presence: true
  validates :email, :session_token, uniqueness: true

  after_initialize :set_session_token

  def self.generate_session_token
    token = SecureRandom::urlsafe_base64(16)
    while User.where(session_token: token).exists?
      token = SecureRandom::urlsafe_base64(16)
    end
    token
  end

  def self.find_by_credentials(email, password)
    user = User.find_by_email(email)
    if user
      return user if user.is_password?(password)
    end
    nil
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def set_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
