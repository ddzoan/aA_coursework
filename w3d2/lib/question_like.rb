class QuestionLike
  TABLE_NAME = "question_likes"
  
  def self.likers_for_question_id(question_id)
    results = QuestionsDatabase.instance.execute(<<-SQL, question_id)
    SELECT
      users.id, fname, lname
    FROM
      question_likes
    JOIN
      users ON users.id = question_likes.user_id
    WHERE
      question_id = ?
    SQL

    results.map { |result| User.new(result) }
  end

  def self.num_likes_for_question_id(question_id)
    results = QuestionsDatabase.instance.execute(<<-SQL, question_id)
    SELECT
      COUNT(*)
    FROM
      question_likes
    WHERE
      question_id = ?
    SQL

    results.first['COUNT(*)']
  end

  def self.liked_questions_for_user_id(user_id)
    results = QuestionsDatabase.instance.execute(<<-SQL, user_id)
    SELECT
      questions.id, title, body, questions.user_id
    FROM
      question_likes
    JOIN
      questions ON questions.id = question_likes.question_id
    WHERE
      question_likes.user_id = ?
    SQL

    results.map { |result| Question.new(result) }
  end

  def self.most_liked_questions(n)
    results = QuestionsDatabase.instance.execute(<<-SQL, n)
    SELECT
      questions.id, questions.title, questions.body, questions.user_id
    FROM
      question_likes
    JOIN
      questions ON questions.id = question_likes.question_id
    GROUP BY
      question_likes.question_id
    ORDER BY
      COUNT(*) DESC
    LIMIT
      ?
    SQL

    results.map { |result| Question.new(result) }
  end
end
