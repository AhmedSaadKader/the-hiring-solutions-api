CREATE TABLE candidate_skills (
  candidate_id INTEGER,
  skill_id INTEGER,
  FOREIGN KEY (candidate_id) REFERENCES candidates(id),
  FOREIGN KEY (skill_id) REFERENCES skills(id),
  PRIMARY KEY (candidate_id, skill_id)
);
