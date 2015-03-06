SELECT
  polls.*
FROM
  polls
JOIN
  questions ON polls.id = questions.poll_id
JOIN
  answer_choices ON questions.id = answer_choices.question_id
LEFT OUTER JOIN(
  SELECT
    responses.*
  FROM
    responses
  WHERE
    responses.respondent_id = 16
  ) AS user_responses
ON
  answer_choices.id = user_responses.answer_choice_id
GROUP BY
  polls.id
HAVING
   COUNT(DISTINCT questions.*) = COUNT(user_responses.*);



   SELECT
     polls.*, responses.*
   FROM
     polls
   JOIN
     questions ON polls.id = questions.poll_id
   JOIN
     answer_choices ON questions.id = answer_choices.question_id
   LEFT OUTER JOIN
     responses
   ON
     answer_choices.id = responses.answer_choice_id
   WHERE
     responses.id IS NULL OR responses.respondent_id = 16
   GROUP BY
     polls.id
   HAVING
      COUNT(DISTINCT questions.*) = COUNT(responses.*);
