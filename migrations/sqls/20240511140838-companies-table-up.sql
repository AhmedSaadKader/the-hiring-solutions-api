CREATE TABLE "companies" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "industry" varchar,
  "description" varchar,
  "email" varchar UNIQUE NOT NULL,
  "password" varchar,
  CONSTRAINT valid_email_format CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);
