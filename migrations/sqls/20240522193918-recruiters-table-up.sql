CREATE TABLE recruiters (
  "id" SERIAL PRIMARY KEY,
  "role" user_role DEFAULT 'recruiter' CHECK (role = 'recruiter'),
  "name" varchar NOT NULL,
  "phone_no" varchar UNIQUE,
  "email" varchar UNIQUE,
  "password_digest" varchar,
  CONSTRAINT valid_email_format CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);