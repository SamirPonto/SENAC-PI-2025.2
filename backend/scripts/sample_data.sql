-- TRAILS
INSERT INTO learn.trail (id, title, description, created_at) VALUES
(1, 'Python Basics', 'Learn the fundamentals of Python programming.', NOW()),
(2, 'Web Development', 'Introduction to HTML, CSS, and JavaScript.', NOW()),
(3, 'Data Science', 'Data analysis, statistics, and visualizations.', NOW());

-- MODULES
INSERT INTO learn.module (id, trail_id, title, type, content_url, module_order, created_at) VALUES
-- Trail 1: Python Basics
(1, 1, 'Introduction to Python', 'video', 'https://example.com/python/intro.mp4', 1, NOW()),
(2, 1, 'Variables and Data Types', 'text', 'https://example.com/python/variables.html', 2, NOW()),
(3, 1, 'Control Flow', 'video', 'https://example.com/python/control-flow.mp4', 3, NOW()),

-- Trail 2: Web Development
(4, 2, 'HTML Basics', 'text', 'https://example.com/web/html-basics.html', 1, NOW()),
(5, 2, 'CSS Fundamentals', 'video', 'https://example.com/web/css.mp4', 2, NOW()),
(6, 2, 'JavaScript Intro', 'video', 'https://example.com/web/js-intro.mp4', 3, NOW()),

-- Trail 3: Data Science
(7, 3, 'Introduction to Data Science', 'text', 'https://example.com/ds/intro.html', 1, NOW()),
(8, 3, 'Working With Pandas', 'video', 'https://example.com/ds/pandas.mp4', 2, NOW()),
(9, 3, 'Data Visualization', 'video', 'https://example.com/ds/visualization.mp4', 3, NOW());


-- QUIZZES
INSERT INTO quiz.quiz (id, module_id, title, created_at) VALUES
(1, 2, 'Quiz: Variables and Data Types', NOW()),
(2, 4, 'Quiz: HTML Basics', NOW()),
(3, 7, 'Quiz: Data Science Introduction', NOW());

INSERT INTO quiz.question (id, quiz_id, statement, points) VALUES
-- Quiz 1 (Variables)
(1, 1, 'Which of these is a correct Python variable name?', 1),
(2, 1, 'What is the correct type for "Hello World"?', 1),

-- Quiz 2 (HTML Basics)
(3, 2, 'What does HTML stand for?', 1),
(4, 2, 'Which tag creates a paragraph?', 1),

-- Quiz 3 (Data Science Intro)
(5, 3, 'What is data science primarily about?', 1),
(6, 3, 'Which library is used for dataframes?', 1);

INSERT INTO quiz.choice (id, question_id, text, is_correct) VALUES
-- Q1
(1, 1, 'my-variable', FALSE),
(2, 1, 'myVariable', TRUE),
(3, 1, '1variable', FALSE),

-- Q2
(4, 2, 'int', FALSE),
(5, 2, 'str', TRUE),
(6, 2, 'float', FALSE),

-- Q3
(7, 3, 'HyperText Markup Language', TRUE),
(8, 3, 'Home Tool Markup Language', FALSE),
(9, 3, 'Hyperlinks Text Marking Level', FALSE),

-- Q4
(10, 4, '<p>', TRUE),
(11, 4, '<paragraph>', FALSE),
(12, 4, '<text>', FALSE),

-- Q5
(13, 5, 'Extracting insights from data', TRUE),
(14, 5, 'Making websites', FALSE),
(15, 5, 'Drawing art', FALSE),

-- Q6
(16, 6, 'NumPy', FALSE),
(17, 6, 'Pandas', TRUE),
(18, 6, 'Matplotlib', FALSE);

