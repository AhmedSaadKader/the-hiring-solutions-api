CREATE TABLE "applications" (
  "id" SERIAL PRIMARY KEY,
  "job_id" integer REFERENCES jobs(id),
  "candidate_id" integer REFERENCES candidates(id),
  "recruiter_id" integer REFERENCES recruiters(id),
  "status" job_status,
  "applied_date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "reviewed_date" TIMESTAMP WITH TIME ZONE,
  "notes" varchar
);
