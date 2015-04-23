# == Schema Information
#
# Table name: votes
#
#  id            :integer          not null, primary key
#  voteable_type :string           not null
#  voteable_id   :string           not null
#  value         :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Vote < ActiveRecord::Base
  belongs_to :voteable, polymorphic: true

  validates :voteable_type, :voteable_id, :value, presence: true
  validates :value, inclusion: { in: [1, -1] }
end
