# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  user_name  :string           not null
#  created_at :datetime
#  updated_at :datetime
#

class User < ActiveRecord::Base
  validates :user_name, presence: true, uniqueness: true

  has_many(
    :authored_polls,
    class_name: 'Poll',
    foreign_key: :author_id,
    primary_key: :id
  )

  has_many(
    :responses,
    class_name: 'Response',
    foreign_key: :respondent_id,
    primary_key: :id
  )

  def completed_polls
    Poll
      .joins(questions: :answer_choices)
      .joins("LEFT OUTER JOIN responses
              ON responses.answer_choice_id = answer_choices.id")
      .where("responses.respondent_id = ?
              OR responses.respondent_id IS NULL", id)
      .group('polls.id')
      .having("COUNT(DISTINCT questions.id) = COUNT(DISTINCT responses.id)")
  end

  def uncompleted_polls
    Poll
      .joins(questions: :answer_choices)
      .joins("LEFT OUTER JOIN responses
              ON responses.answer_choice_id = answer_choices.id")
      .where("responses.respondent_id = ?
              OR responses.respondent_id IS NULL", id)
      .group('polls.id')
      .having("COUNT(DISTINCT questions.id) != COUNT(DISTINCT responses.id)")
  end
end
