CREATE TABLE "companies" (
  "id" SERIAL PRIMARY KEY,
  "role" user_role DEFAULT 'company' CHECK (role = 'company'),
  "name" varchar NOT NULL,
  "industry" varchar,
  "description" varchar,
  "email" varchar UNIQUE NOT NULL,
  "password_digest" varchar,
  CONSTRAINT valid_email_format CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);