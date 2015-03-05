# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  text       :string           not null
#  poll_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Question < ActiveRecord::Base
  validates :poll_id, :text, presence: true

  belongs_to(
    :poll,
    class_name: 'Poll',
    foreign_key: :poll_id,
    primary_key: :id
  )

  has_many(
    :answer_choices,
    class_name: 'AnswerChoice',
    foreign_key: :question_id,
    primary_key: :id
  )

  has_many :responses, through: :answer_choices, source: :responses

  def results
    results_hash = {}

    choices = answer_choices
      .select('answer_choices.*, COUNT(responses.*) AS count')
      .joins('LEFT OUTER JOIN responses
      ON answer_choices.id = responses.answer_choice_id')
      .group('answer_choices.id')

    choices.map do |choice|
      results_hash[choice.text] = choice.count
    end

    results_hash
  end

  def title
    text
  end
end
