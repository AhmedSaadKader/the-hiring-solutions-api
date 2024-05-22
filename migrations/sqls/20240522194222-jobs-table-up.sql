CREATE TABLE "jobs" (
  "id" SERIAL PRIMARY KEY,
  "company_id" integer REFERENCES companies(id),
  "title" varchar NOT NULL,
  "description" varchar,
  "salary" integer,
  "location" varchar,
  "posted_date" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "status" job_status
);
