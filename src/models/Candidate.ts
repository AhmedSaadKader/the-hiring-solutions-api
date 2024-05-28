import { BaseModel, BaseUser } from './Base_model';
import { hashPassword } from './helpers/passwordHandler';
import { connectionSQLResult } from './helpers/sql_query';

export type Candidate = BaseUser & {
  recruiter_id?: number;
  resume: string;
  experience: number;
  password_digest?: string;
};

export class CandidateModel extends BaseModel {
  tableName = 'candidates';

  async indexCandidate(): Promise<Candidate[]> {
    // const sql =
    //   'SELECT c.*, r.name AS recruiter_name FROM candidates AS c LEFT JOIN recruiters AS r ON c.recruiter_id = r.id';
    return super.index<Candidate>(this.tableName);
  }

  async showCandidate(id: number): Promise<Candidate> {
    // const sql =
    //   'SELECT c.*, r.name AS recruiter_name FROM candidates AS c LEFT JOIN recruiters AS r ON c.recruiter_id = r.id WHERE c.id = $1';
    return super.show<Candidate>(id, this.tableName);
  }

  async create(candidate: Candidate): Promise<Candidate> {
    const { name, phone_no, email, password, resume, experience } = candidate;
    try {
      const sql =
        'INSERT INTO candidates (name, phone_no, email, password_digest, resume, experience) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
      const password_digest = hashPassword(password);

      const result = await connectionSQLResult(sql, [
        name,
        phone_no,
        email,
        password_digest,
        resume,
        experience
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create candidate ${name}. Error: ${err}`);
    }
  }

  async deleteCandidate(id: number): Promise<Candidate | null> {
    return super.delete<Candidate>(id, this.tableName);
  }

  async update(candidate: Candidate): Promise<Candidate> {
    const { id, recruiter_id, name, email, password, resume, experience } =
      candidate;
    try {
      const sql =
        'UPDATE candidates SET recruiter_id=($1), name=($2), email=($3), password_digest=($4), resume=($5), experience=($6) WHERE id=($7) RETURNING *';
      const result = await connectionSQLResult(sql, [
        recruiter_id,
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
