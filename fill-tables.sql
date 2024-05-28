INSERT INTO admins (name, phone_no, email, password_digest)
VALUES
  ('John Admin', '01201201201', 'john@admin.com', 'password123'),
  ('Alice Admin', '01201201202', 'alice@admin.com', 'qwerty456'),
  ('Bob Admin', '01201201203', 'bob@admin.com', 'abc123');

INSERT INTO recruiters (name, phone_no, email, password_digest)
VALUES
  ('admin', '01201201220', 'admin@admin.com', 'admin'),
  ('John Doe', '01201201204', 'john@example.com', 'password123'),
  ('Alice Smith', '01201201205', 'alice@example.com', 'qwerty456'),
  ('Bob Johnson', '01201201206', 'bob@example.com', 'abc123');

INSERT INTO companies (name, industry, description, phone_no, email, password_digest)
VALUES
  ('Company A', 'Tech', 'Tech company specializing in software development', '01201201207', 'companyA@example.com', 'password123'),
  ('Company B', 'Finance', 'Finance company offering financial services', '01201201208', 'companyB@example.com', 'qwerty456'),
  ('Company C', 'Healthcare', 'Healthcare company providing medical services', '01201201209', 'companyC@example.com', 'abc123');

INSERT INTO skills (name)
VALUES
  ('Java'),
  ('Python'),
  ('JavaScript'),
  ('React'),
  ('Angular'),
  ('SQL'),
  ('HTML'),
  ('CSS'),
  ('Node.js');

INSERT INTO candidates (name, phone_no, email, password_digest, resume, experience)
VALUES
  ('Jane Doe', '01201201210', 'jane@example.com', 'password123', 'link_to_resume', 3),
  ('Michael Smith', '01201201211', 'michael@example.com', 'qwerty456', 'link_to_resume', 5),
  ('Emily Johnson', '01201201212', 'emily@example.com', 'abc123', 'link_to_resume', 2);

INSERT INTO jobs (company_id, title, description, salary, location, status)
VALUES
  (1, 'Software Engineer', 'Full-stack development', 80000, 'New York', 'open'),
  (2, 'Financial Analyst', 'Financial analysis and reporting', 70000, 'London', 'closed'),
  (3, 'Nurse', 'Patient care and medical assistance', 60000, 'Los Angeles', 'pending');

-- Assuming we have candidates, jobs, and recruiters with existing data
INSERT INTO applications (job_id, candidate_id, recruiter_id, status, notes)
VALUES
  (1, 1, 1, 'pending', 'Applied on 2024-05-12'),
  (2, 2, 2, 'pending', 'Applied on 2024-05-11'),
  (3, 3, 3, 'pending', 'Applied on 2024-05-10');
