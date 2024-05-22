import { BaseModel, BaseUser } from './Base_model';

export type Candidate = BaseUser & {
  recruiter_id?: number;
  resume: string;
  experience: number;
};

export class CandidateModel extends BaseModel {
  tableName = 'candidates';

  async index<Candidate extends BaseUser>(): Promise<Candidate[]> {
    return super.index<Candidate>(this.tableName);
  }

  async show<Candidate extends BaseUser>(id: number): Promise<Candidate> {
    return super.show<Candidate>(id, this.tableName);
  }

  async create<Candidate extends BaseUser>(
    candidate: Candidate
  ): Promise<Candidate> {
    return super.create<Candidate>(candidate, this.tableName);
  }
  async authenticate<Candidate extends BaseUser>(
    email: string,
    password: string
  ) {
    return super.authenticate<Candidate>(email, password, this.tableName);
  }

  async delete<Candidate extends BaseUser>(id: number): Promise<Candidate> {
    return super.delete<Candidate>(id, this.tableName);
  }

  async update(id, name, email, password, resume, experience) {
    try {
      const sql =
        'UPDATE candidates SET name=($1), email=($2), password=($3), resume=($4), experience=($5) WHERE id=($6) RETURNING *';
      const result = await (0, sql_query_1.connectionSQLResult)(sql, [
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
