CREATE TABLE "candidates" (
  "id" SERIAL PRIMARY KEY,
  "recruiter_id" integer REFERENCES recruiters(id),
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar,
  "resume" varchar,
  "experience" integer,
  CONSTRAINT valid_email_format CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);
