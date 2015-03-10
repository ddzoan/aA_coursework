class Contact < ActiveRecord::Base
  validates :email, :uniqueness => { scope: :user_id }
  belongs_to :owner, class_name: 'User', primary_key: :id, foreign_key: :user_id
  has_many :contact_shares
  has_many :shared_users, through: :contact_shares, source: :user

  has_many :comments, as: :commentable
end
