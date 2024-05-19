import { connectionSQLResult } from './helpers/sql_query';

export type Candidate = {
  id?: number;
  name: string;
  email: string;
  password: string;
  resume: string;
  experience: number;
};

export class CandidateModel {
  async index(): Promise<Candidate[]> {
    try {
      const sql = 'SELECT * FROM candidates';
      const result = await connectionSQLResult(sql, []);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find candidates. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Candidate> {
    try {
      const sql = 'SELECT * FROM candidates WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find candidate ${id}. Error: ${err}`);
    }
  }

  async create(candidate: Candidate): Promise<Candidate> {
    const { name, email, password, resume, experience } = candidate;
    try {
      const sql =
        'INSERT INTO candidates (name, email, password, resume, experience) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const result = await connectionSQLResult(sql, [
        name,
        email,
        password,
        resume,
        experience
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create candidate ${name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<undefined> {
    try {
      const sql = 'DELETE FROM candidates WHERE id=($1)';
      const result = await connectionSQLResult(sql, [id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete candidate ${id}. Error: ${err}`);
    }
  }

  async update(
    id: number,
    name: string,
    email: string,
    password: string,
    resume: string,
    experience: number
  ): Promise<Candidate> {
    try {
      const sql =
        'UPDATE candidates SET name=($1), email=($2), password=($3), resume=($4), experience=($5) WHERE id=($6) RETURNING *';
      const result = await connectionSQLResult(sql, [
        name,
        email,
        password,
        resume,
        experience,
        id
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update candidate ${id}. Error: ${err}`);
    }
  }
}
