# == Schema Information
#
# Table name: responses
#
#  id               :integer          not null, primary key
#  answer_choice_id :integer          not null
#  respondent_id    :integer          not null
#  created_at       :datetime
#  updated_at       :datetime
#

class Response < ActiveRecord::Base
  validates :answer_choice_id, :respondent_id, presence: true
  validate :respondent_has_not_already_answered_question
  validate :does_not_respond_to_own_poll

  belongs_to(
    :answer_choice,
    class_name: 'AnswerChoice',
    foreign_key: :answer_choice_id,
    primary_key: :id
  )

  belongs_to(
    :respondent,
    class_name: 'User',
    foreign_key: :respondent_id,
    primary_key: :id
  )

  has_one :question, through: :answer_choice, source: :question

  def sibling_responses
    question.responses.where(":id IS NULL OR responses.id != :id", id: id)
  end

  def respondent_has_not_already_answered_question
    if sibling_responses.where('respondent_id = :id', id: respondent_id).exists?
      errors[:can_not_respond] = "respondent has already answered"
    end
  end

  def does_not_respond_to_own_poll
    # if question.poll.author_id == respondent_id
    if Poll
    .joins(questions: :answer_choices)
    .joins('JOIN responses ON answer_choices.id = responses.answer_choice_id')
    .where('polls.author_id = ?', respondent_id)
    .exists?
      errors[:can_not_respond] = "can't answer your own poll"
    end
  end
end
