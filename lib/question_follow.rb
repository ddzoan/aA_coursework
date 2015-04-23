class QuestionFollow
  TABLE_NAME = "question_follows"
  
  def self.followers_for_question(question_id)
    results = QuestionsDatabase.instance.execute(<<-SQL, question_id)
    SELECT
      users.id, users.fname, users.lname
    FROM
      question_follows
    JOIN
      users ON user_id = users.id
    WHERE
      question_id = ?
    SQL

    results.map { |result| User.new(result) }
  end

  def self.followed_questions_for_user_id(user_id)
    results = QuestionsDatabase.instance.execute(<<-SQL, user_id)
    SELECT
      questions.id, questions.title, questions.body, questions.user_id
    FROM
      question_follows
    JOIN
      questions ON question_id = questions.id
    WHERE
      question_follows.user_id = ?
    SQL

    results.map { |result| Question.new(result) }
  end

  def self.most_followed_questions(n)
    results = QuestionsDatabase.instance.execute(<<-SQL, n)
    SELECT
      questions.id, questions.title, questions.body, questions.user_id
    FROM
      question_follows
    JOIN
      questions ON questions.id = question_follows.question_id
    GROUP BY
      question_follows.question_id
    ORDER BY
      COUNT(*) DESC
    LIMIT
      ?
    SQL

    results.map { |result| Question.new(result) }
  end
end
