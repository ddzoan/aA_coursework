class Reply < Model
  attr_accessor :id, :body, :user_id, :question_id, :parent_id

  def self.table_name
    "replies"
  end

  def self.find_by_user_id(user_id)
    find_by({"user_id" => user_id})
  end

  def self.find_by_question_id(question_id)
    find_by({"question_id" => question_id})
  end

  def initialize(params = {})
    @id = params['id']
    @body = params['body']
    @user_id = params['user_id']
    @question_id = params['question_id']
    @parent_id = params['parent_id']
  end

  def author
    User.find_by_id(@user_id)
  end

  def question
    Question.find_by_id(@question_id)
  end

  def parent_reply
    Reply.find_by_id(@parent_id)
  end

  def child_replies
    Reply.find_by({'parent_id' => @id})
  end
end
