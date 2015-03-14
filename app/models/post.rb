# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  url        :string
#  content    :text
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Post < ActiveRecord::Base
  validates :title, :user_id, presence: true
  validate :has_sub?

  has_many :post_subs
  has_many :subs, through: :post_subs, source: :sub
  belongs_to :author, class_name: 'User', foreign_key: :user_id

  has_many :comments
  has_many :votes, as: :voteable

  def comments_by_parent_id
    comment_hash = Hash.new{ |h, k| h[k]  = [] }
    @all_comments = Comment.all.where(post_id: self.id).includes(:author)
    @all_comments.each do |comment|
      comment_hash[comment.parent_comment_id] << comment
    end

    comment_hash
  end

  def has_sub?
    unless self.subs.count > 0
      errors[:subs] << "must have at least one sub"
    end
  end
end
