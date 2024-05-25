CREATE TABLE admins (
  "id" SERIAL PRIMARY KEY,
  "role" user_role DEFAULT 'admin' CHECK (role = 'admin'),
  "name" varchar NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "password_digest" varchar,
  CONSTRAINT valid_email_format CHECK (email ~* '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
);