DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS question_follows;
DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS question_likes;

CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL
);


CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE question_follows (
  id INTEGER PRIMARY KEY,
  question_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE replies (
  id INTEGER PRIMARY KEY,
  body TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  parent_id INTEGER,

  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (parent_id) REFERENCES replies(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE question_likes (
  id INTEGER PRIMARY KEY,
  question_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,

  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);


INSERT INTO
  users (fname, lname)
VALUES
  ('Steve', 'Smith'),
  ('Jason', 'bourne'),
  ('charles', 'martell'),
  ('james', 'bond'),
  ('chris', 'topher'),
  ('Stephanie', 'Jackson');

INSERT INTO
  questions (title, body, user_id)
VALUES
  ('Question 1', 'How do I do the thing?', (SELECT id FROM users WHERE fname = 'Steve')),
  ('Question 2', 'Why would I do it?', (SELECT id FROM users WHERE fname = 'Stephanie')),
  ('Question 3', 'Where do I do the thing?', (SELECT id FROM users WHERE fname = 'Steve')),
  ('Question 4', 'Whom should I do the thing to?', (SELECT id FROM users WHERE fname = 'Steve')),
  ('Question 5', 'Why should I care?', (SELECT id FROM users WHERE fname = 'Steve')),
  ('Question 6', 'What is the capital or Norway?', (SELECT id FROM users WHERE fname = 'Steve')),
  ('Question 7', 'Why am I Here?', (SELECT id FROM users WHERE fname = 'Steve')),
  ('Question 8', 'Why not?', (SELECT id FROM users WHERE fname = 'Steve'));

INSERT INTO
  question_follows (question_id, user_id)
VALUES
  ((SELECT id FROM questions WHERE title = 'Question 1'), (SELECT id FROM users WHERE fname = 'Stephanie')),
  ((SELECT id FROM questions WHERE title = 'Question 1'), (SELECT id FROM users WHERE fname = 'chris')),
  ((SELECT id FROM questions WHERE title = 'Question 1'), (SELECT id FROM users WHERE fname = 'charles')),
  ((SELECT id FROM questions WHERE title = 'Question 1'), (SELECT id FROM users WHERE fname = 'james')),
  ((SELECT id FROM questions WHERE title = 'Question 1'), (SELECT id FROM users WHERE fname = 'Jason')),
  ((SELECT id FROM questions WHERE title = 'Question 2'), (SELECT id FROM users WHERE fname = 'Steve')),
  ((SELECT id FROM questions WHERE title = 'Question 7'), (SELECT id FROM users WHERE fname = 'Steve')),
  ((SELECT id FROM questions WHERE title = 'Question 7'), (SELECT id FROM users WHERE fname = 'james'));

INSERT INTO
  replies (question_id, parent_id, user_id, body)
VALUES
  ((SELECT id FROM questions WHERE title = 'Question 1'), NULL, (SELECT id FROM users WHERE fname = 'Stephanie'), 'Very carefully.');

INSERT INTO
  replies (question_id, parent_id, user_id, body)
VALUES
  ((SELECT id FROM questions WHERE title = 'Question 1'), (SELECT id FROM replies WHERE id = 1), (SELECT id FROM users WHERE fname = 'Steve'), 'Thanks');

INSERT INTO
  question_likes (question_id, user_id)
VALUES
  ((SELECT id FROM questions WHERE title = 'Question 1'), (SELECT id FROM users WHERE fname = 'Steve'));
