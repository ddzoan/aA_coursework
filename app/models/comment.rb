# == Schema Information
#
# Table name: comments
#
#  id                :integer          not null, primary key
#  post_id           :integer          not null
#  content           :string           not null
#  user_id           :integer          not null
#  parent_comment_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class Comment < ActiveRecord::Base
  validates :post_id, :content, :user_id, presence: true

  belongs_to :author, class_name: 'User', foreign_key: :user_id
  belongs_to :post, inverse_of: :comments

  has_many :child_comments, class_name: 'Comment', foreign_key: :parent_comment_id
end
