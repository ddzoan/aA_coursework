class Question < Model
  attr_accessor :id, :title, :body, :user_id

  def self.table_name
    "questions"
  end

  def self.find_by_author_id(author_id)
    find_by({"user_id" => author_id})
  end

  def self.most_followed(n)
    QuestionFollow.most_followed_questions(n)
  end

  def self.most_liked(n)
    QuestionLike.most_liked_questions(n)
  end

  def initialize(params = {})
    @id = params['id']
    @title = params['title']
    @body = params['body']
    @user_id = params['user_id']
  end

  def author
    User.find_by_id(@user_id)
  end

  def replies
    Reply.find_by_question_id(@id)
  end

  def followers
    QuestionFollow.followers_for_question_id(@id)
  end

  def likers
    QuestionLike.likers_for_question_id(@id)
  end

  def num_likes
    QuestionLike.num_likes_for_question_id(@id)
  end
end
