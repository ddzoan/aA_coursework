class ContactShare < ActiveRecord::Base
  validates :contact_id, uniqueness: { scope: :user_id }, presence: true
  validates :user_id, uniqueness: { scope: :contact_id }, presence: true

  belongs_to :contact
  belongs_to :user

  has_many :comments, as: :commentable
end
