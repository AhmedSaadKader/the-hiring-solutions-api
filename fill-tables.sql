INSERT INTO admins (name, email, password_digest)
VALUES
  ('John Admin', 'john@admin.com', 'password123'),
  ('Alice Admin', 'alice@admin.com', 'qwerty456'),
  ('Bob Admin', 'bob@admin.com', 'abc123');

INSERT INTO recruiters (name, email, password_digest)
VALUES
  ('John Doe', 'john@example.com', 'password123'),
  ('Alice Smith', 'alice@example.com', 'qwerty456'),
  ('Bob Johnson', 'bob@example.com', 'abc123');

INSERT INTO companies (name, industry, description, email, password_digest)
VALUES
  ('Company A', 'Tech', 'Tech company specializing in software development', 'companyA@example.com', 'password123'),
  ('Company B', 'Finance', 'Finance company offering financial services', 'companyB@example.com', 'qwerty456'),
  ('Company C', 'Healthcare', 'Healthcare company providing medical services', 'companyC@example.com', 'abc123');

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

INSERT INTO candidates (name, email, password_digest, resume, experience)
VALUES
  ('Jane Doe', 'jane@example.com', 'password123', 'link_to_resume', 3),
  ('Michael Smith', 'michael@example.com', 'qwerty456', 'link_to_resume', 5),
  ('Emily Johnson', 'emily@example.com', 'abc123', 'link_to_resume', 2);

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
