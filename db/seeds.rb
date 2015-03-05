User.destroy_all
Poll.destroy_all
Question.destroy_all
AnswerChoice.destroy_all
Response.destroy_all

dan = User.create!(user_name: "dan")
shibbi = User.create!(user_name: "shibbi")
cj = User.create!(user_name: "cj")

poll1 = Poll.create!(title: "what the questions", author_id: dan.id)

q1 = Question.create!(text: 'where did you grow up', poll_id: poll1.id)
a1 = AnswerChoice.create!(text: 'here', question_id: q1.id)
a2 = AnswerChoice.create!(text: 'not here', question_id: q1.id)
q2 = Question.create!(text: 'favorite water', poll_id: poll1.id)
a3 = AnswerChoice.create!(text: 'aquafina', question_id: q2.id)
a4 = AnswerChoice.create!(text: 'fiji', question_id: q2.id)
q3 = Question.create!(text: 'favorite island', poll_id: poll1.id)
a5 = AnswerChoice.create!(text: 'fiji', question_id: q3.id)
a6 = AnswerChoice.create!(text: 'madagascar', question_id: q3.id)

poll2 = Poll.create!(title: "favorite things", author_id: shibbi.id)

q4 = Question.create!(text: "food?", poll_id: poll2.id)
a7 = AnswerChoice.create!(text: 'tacos', question_id: q4.id)
a8 = AnswerChoice.create!(text: 'burritos', question_id: q4.id)
q5 = Question.create!(text: "animal?", poll_id: poll2.id)
a9 = AnswerChoice.create!(text: 'dog', question_id: q5.id)
a10 = AnswerChoice.create!(text: 'cat', question_id: q5.id)
q6 = Question.create!(text: "music?", poll_id: poll2.id)
a11 = AnswerChoice.create!(text: 'good', question_id: q6.id)
a12 = AnswerChoice.create!(text: 'bad', question_id: q6.id)
q7 = Question.create!(text: "drug?", poll_id: poll2.id)
a13 = AnswerChoice.create!(text: 'nyquil', question_id: q7.id)
a14 = AnswerChoice.create!(text: 'benadryl', question_id: q7.id)
a15 = AnswerChoice.create!(text: 'morphine', question_id: q7.id)

Response.create!(answer_choice_id: a8.id, respondent_id: dan.id)
Response.create!(answer_choice_id: a9.id, respondent_id: dan.id)
Response.create!(answer_choice_id: a11.id, respondent_id: dan.id)
Response.create!(answer_choice_id: a13.id, respondent_id: dan.id)

Response.create!(answer_choice_id: a2.id, respondent_id: shibbi.id)
Response.create!(answer_choice_id: a4.id, respondent_id: shibbi.id)
Response.create!(answer_choice_id: a6.id, respondent_id: shibbi.id)

Response.create!(answer_choice_id: a7.id, respondent_id: cj.id)
Response.create!(answer_choice_id: a10.id, respondent_id: cj.id)
Response.create!(answer_choice_id: a12.id, respondent_id: cj.id)
Response.create!(answer_choice_id: a14.id, respondent_id: cj.id)
Response.create!(answer_choice_id: a1.id, respondent_id: cj.id)
Response.create!(answer_choice_id: a3.id, respondent_id: cj.id)
Response.create!(answer_choice_id: a5.id, respondent_id: cj.id)
