CREATE TABLE job_requirements (
  job_id INTEGER,
  skill_id INTEGER,
  FOREIGN KEY (job_id) REFERENCES jobs(id),
  FOREIGN KEY (skill_id) REFERENCES skills(id),
  PRIMARY KEY (job_id, skill_id)
);