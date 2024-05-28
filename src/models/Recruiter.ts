import { BaseModel, BaseUser } from './Base_model';
import { Roles } from './Roles';
import { comparePassword } from './helpers/passwordHandler';
import { connectionSQLResult } from './helpers/sql_query';

export type Recruiter = BaseUser & {
  password_digest?: string;
};

export class RecruiterModel extends BaseModel {
  tableName = 'recruiters';
  async indexRecruiter(): Promise<Recruiter[]> {
    return super.index(this.tableName);
  }

  async showRecruiter(id: number): Promise<Recruiter> {
    return super.show(id, this.tableName);
  }

  async create(recruiter: Recruiter): Promise<Recruiter> {
    const { name, email, password } = recruiter;
    const role = Roles.RECRUITER;
    try {
      const sql =
        'INSERT INTO recruiters (role, name, email, password_digest) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await connectionSQLResult(sql, [
        role,
        name,
        email,
        password
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create recruiter ${name}. Error: ${err}`);
    }
  }

  async deleteRecruiter<Recruiter extends BaseUser>(
    id: number
  ): Promise<Recruiter | null> {
    return super.delete(id, this.tableName);
  }

  async update(recruiter: Recruiter) {
    const { id, name, email, password } = recruiter;
    try {
      const sql =
        'UPDATE recruiters SET name=($1), email=($2), password=($3) WHERE id=($4) RETURNING *';
      const result = await connectionSQLResult(sql, [
        name,
        email,
        password,
        id
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not update recruiter ${id}. Error: ${err}`);
    }
  }
}
