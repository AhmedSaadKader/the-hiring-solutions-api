CREATE TABLE "candidates" (
  "id" SERIAL PRIMARY KEY,
  "recruiter_id" integer REFERENCES recruiters(id) DEFAULT 1,
  "role" user_role DEFAULT 'candidate' CHECK (role = 'candidate'),
  "name" varchar NOT NULL,
  "phone_no" varchar UNIQUE,
  "email" varchar UNIQUE,
  "password_digest" varchar,
  "resume" varchar,
  "experience" integer,
  CONSTRAINT valid_email_format CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);
