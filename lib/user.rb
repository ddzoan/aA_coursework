require 'byebug'
class User < Model
  attr_accessor :id, :fname, :lname

  def self.table_name
    "users"
  end

  def self.find_by_name(fname, lname)
    find_by({'fname' => fname, 'lname' => lname})
  end

  def initialize(params = {})
    @id = params['id']
    @fname = params['fname']
    @lname = params['lname']
  end

  def authored_questions
    Question.find_by_author_id(@id)
  end

  def authored_replies
    Reply.find_by_user_id(@id)
  end

  def followed_questions
    QuestionFollow.followed_questions_for_user_id(@id)
  end

  def liked_questions
    QuestionLike.liked_questions_for_user_id(@id)
  end

  def average_karma
    results = QuestionsDatabase.instance.execute(<<-SQL, @id)
    SELECT
      (CAST(COUNT(question_likes.id) AS FLOAT) / COUNT(DISTINCT questions.id)) AS karma
    FROM
      questions
    LEFT OUTER JOIN
      question_likes ON question_id = questions.id
    WHERE
      questions.user_id = ?
    SQL
  end
end
